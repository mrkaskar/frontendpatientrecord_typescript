import React from 'react';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';
import Button from '../iconbutton/main';
import { ReactComponent as Magnify } from './assets/magnify.svg';
import { ReactComponent as Pencil } from './assets/pencil.svg';
import { ReactComponent as Bin } from './assets/bin.svg';
import { ReactComponent as Prev } from './assets/prev.svg';
import { ReactComponent as Next } from './assets/next.svg';
import { ReactComponent as Drop } from './assets/drop.svg';
import { ReactComponent as Search } from './assets/search.svg';

import './styles/index.css';

interface ITable {
  data: {
    headers: string[],
    body: string[][]
  }
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  setDetailIndex: React.Dispatch<React.SetStateAction<number>>
}

let timeout: NodeJS.Timeout;
function Table({
  data, setDetailModal, setEditModal, setDeleteModal, setDetailIndex,
}:ITable):JSX.Element {
  const { theme } = React.useContext(ThemeContext);
  const { headers, body } = data;
  const [perPage, setPerpage] = React.useState(10);
  const [pageCount, setPageCount] = React.useState(Math.ceil(body.length / perPage));
  const [allCount, setAllcount] = React.useState(0);
  const pageRef = React.useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentItems, setCurrentItems] = React.useState(body.slice(0, perPage));
  const [drop, setDrop] = React.useState(false);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => { setAllcount(body.length); }, [body.length]);
  React.useEffect(() => {
    clearTimeout(timeout);
    if (!search) {
      const calculatedPagePair = body.slice(perPage * (currentPage - 1), currentPage * perPage);
      setCurrentItems(calculatedPagePair);
      setPageCount(Math.ceil(body.length / perPage));
      setAllcount(body.length);
      return;
    }
    timeout = setTimeout(() => {
      const found:string[][] = [];
      body.forEach((bodyData) => {
        for (let i = 0; i < bodyData.length; i += 1) {
          if (bodyData[i].toLowerCase().includes(search.toLowerCase())) {
            if (bodyData[i]) { found.push(bodyData); }
            break;
          }
        }
      });

      setCurrentPage(1);
      setDrop(false);
      setPerpage(10);
      setPageCount(Math.ceil(found.length / perPage));
      setAllcount(found.length);
      const calculatedPagePair = found.slice(perPage * (currentPage - 1), currentPage * perPage);
      setCurrentItems(calculatedPagePair);
    }, 200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  React.useLayoutEffect(() => {
    if (pageRef.current) { pageRef.current.style.marginLeft = `-${pageRef.current?.clientWidth / 2}px`; }
    setCurrentPage(1);
    setPageCount(Math.ceil(body.length / perPage));
  }, [body.length, perPage]);

  React.useEffect(() => {
    const calculatedPagePair = body.slice(perPage * (currentPage - 1), currentPage * perPage);
    setCurrentItems(calculatedPagePair);
  }, [currentPage, body, perPage]);

  return (
    <div id="thetable">
      <div id="search">
        <div
          id="searchtable"
          style={{
            backgroundColor: colors.inputback[theme],

          }}
        >
          <div id="searchicon">

            <Search
              style={{
                filter: `${theme === 'dark' && 'invert(100%) sepia(0%) saturate(8%) hue-rotate(236deg) brightness(104%) contrast(105%)'}`,
              }}
            />

          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            spellCheck={false}
            id="searchinput"
            style={{
              backgroundColor: colors.inputback[theme],
              color: colors.text[theme],
            }}
          />
        </div>
      </div>
      <div
        id="table"
        style={{
          backgroundColor: colors.level1[theme],
        }}
      >
        <div id="headback" />
        {
        headers.map((head, index) => (
          <div key={head} className={`columns ${head.replace(/\s/g, '')} ${index === 0 && 'head'}`}>
            <div className="header">
              {head}
            </div>
            <div className="bodies">
              {
              currentItems.length > 0 ? currentItems.map((c, i) => {
                if (body[i] && body[i][index] !== 'actions') {
                  return (
                    <div
                      key={`${Math.random() + Date.now()}`}
                      className="body"
                      style={{
                        color: colors.text[theme],
                      }}
                    >
                      {c[index]}
                    </div>
                  );
                }

                return (
                  <div
                    key={`${Math.random()}`}
                    className="actions body"
                  >
                    <Button
                      Icon={Magnify}
                      colorOne="#9367F1"
                      colorTwo="#BD91F5"
                      onClick={() => {
                        setDetailIndex(i);
                        setDetailModal(true);
                      }}
                    />
                    <div style={{ width: '10px' }} />
                    <Button
                      Icon={Pencil}
                      colorOne="#6785F1"
                      colorTwo="#91C5F5"
                      onClick={() => setEditModal(true)}
                    />
                    <div style={{ width: '10px' }} />
                    <Button
                      Icon={Bin}
                      colorOne="#F16767"
                      colorTwo="#F5A991"
                      onClick={() => setDeleteModal(true)}
                    />
                  </div>
                );
              }) : (
                <div
                  id="nodata"
                  style={{
                    color: colors.text[theme],
                  }}
                >
                  -
                </div>
              )
            }

            </div>

          </div>
        ))
      }
        <div id="pageP" ref={pageRef}>
          <div
            onClick={() => {
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
            }}
            style={{ display: 'inline-block' }}
            aria-hidden="true"
          >
            <Button
              Icon={Prev}
              colorOne="#4CACB2"
              colorTwo="#79E5EC"
              disabled={currentPage === 1}
            />
          </div>
          <div style={{ width: '10px' }} />
          <div
            id="pages"
            style={{ color: colors.lightText[theme], fontWeight: 'bold' }}
          >
            {
          Array.from({ length: pageCount }, (_, i) => (
            <span aria-hidden="true" onClick={() => setCurrentPage(i + 1)} className={`p ${currentPage === i + 1 && 'active'}`}>{i + 1}</span>
          ))
        }
          </div>
          <div style={{ width: '10px' }} />
          <div
            onClick={() => {
              setCurrentPage((prev) => (prev < pageCount ? prev + 1 : prev));
            }}
            style={{ display: 'inline-block' }}
            aria-hidden="true"
          >
            <Button
              Icon={Next}
              colorOne="#4CACB2"
              colorTwo="#79E5EC"
              disabled={currentPage === pageCount}
            />

          </div>
        </div>
        <div id="pageCount">
          <div
            aria-hidden="true"
            onClick={() => setDrop((prev) => !prev)}
            id="count"
            style={{
              color: colors.text[theme],
              backgroundColor: colors.inputback[theme],
            }}
          >
            <span>{perPage}</span>
          </div>
          {
          drop
        && body.length > 10 ? (
          <div id="dropdown">
            {
          Array.from({ length: Math.ceil(allCount / 10) }, (_, i) => i * 10 + 10).map((n) => {
            if (n !== perPage) {
              return (
                <div
                  aria-hidden="true"
                  onClick={() => { setPerpage(n); setDrop(false); }}
                  id="droplist"
                  style={{
                    backgroundColor: colors.inputback[theme],
                    border: `0.1px solid ${colors.level1[theme]}`,
                    color: colors.text[theme],
                  }}
                >
                  {n}
                </div>
              );
            }
            return (
              null
            );
          })

        }

          </div>
            ) : null

        }
          <div
            onClick={() => setDrop((prev) => !prev)}
            aria-hidden="true"
            id="drop"
          >
            <Drop />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Table;

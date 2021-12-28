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
  setDetailid: React.Dispatch<React.SetStateAction<string>>
}

let timeout: NodeJS.Timeout;
function Table({
  data, setDetailModal, setEditModal, setDeleteModal, setDetailid,
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
    setCurrentPage(1);
    setDrop(false);
    setPerpage(10);
    if (!search) {
      const calculatedPagePair = body.slice(0, 10);
      setCurrentItems(calculatedPagePair);
      setPageCount(Math.ceil(body.length / perPage));
      setAllcount(body.length);
      return;
    }
    timeout = setTimeout(() => {
      const found:string[][] = [];
      body.forEach((bodyData) => {
        for (let i = 0; i < bodyData.length; i += 1) {
          if (typeof bodyData[i] === 'string' && bodyData[i].toLowerCase().includes(search.toLowerCase())) {
            found.push(bodyData);
            break;
          }
        }
      });
      setPageCount(Math.ceil(found.length / perPage));
      setAllcount(found.length);
      const calculatedPagePair = found.slice(0, 10);
      setCurrentItems(calculatedPagePair);
    }, 200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  React.useLayoutEffect(() => {
    if (!search) {
      if (pageRef.current) { pageRef.current.style.marginLeft = `-${pageRef.current?.clientWidth / 2}px`; }
      setCurrentPage(1);
      setPageCount(Math.ceil(body.length / perPage));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body.length, perPage]);

  React.useLayoutEffect(() => {
    const calculatedPagePair = body.slice(perPage * (currentPage - 1), currentPage * perPage);
    setCurrentItems(calculatedPagePair);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, perPage]);

  React.useEffect(() => {
    const calculatedPagePair = body.slice(perPage * (currentPage - 1), currentPage * perPage);
    setCurrentItems(calculatedPagePair);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
                      key={`${Math.random()}`}
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
                    {
                    (data.body[0][2] === 'admin'
                    || data.body[0][2] === 'casher')
                    && (
                    <Button
                      Icon={Magnify}
                      colorOne="#9367F1"
                      colorTwo="#BD91F5"
                      onClick={() => {
                        setDetailid(c[c.length - 1]);
                        setDetailModal(true);
                      }}
                    />
                    )
                  }
                    <div style={{ width: '10px' }} />
                    <Button
                      Icon={Pencil}
                      colorOne="#6785F1"
                      colorTwo="#91C5F5"
                      onClick={() => {
                        setDetailid(c[c.length - 1]);
                        setEditModal(true);
                      }}
                    />
                    <div style={{ width: '10px' }} />
                    <Button
                      Icon={Bin}
                      colorOne="#F16767"
                      colorTwo="#F5A991"
                      onClick={() => {
                        setDetailid(c[c.length - 1]);
                        setDeleteModal(true);
                      }}
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
            <span
              key={`${Math.random()}`}
              aria-hidden="true"
              onClick={() => setCurrentPage(i + 1)}
              className={`p ${currentPage === i + 1 && 'active'}`}
            >
              {i + 1}

            </span>
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
                  key={Math.random()}
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

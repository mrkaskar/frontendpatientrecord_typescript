import React, { ReactElement } from 'react';
import './styles/index.css';
import { useQueryClient } from 'react-query';
import colors from '../global/themes/colors';
import { ThemeContext } from '../global/context/ThemeProvider';
import { ReactComponent as Refresh } from '../../assets/refresh.svg';
import { Loader } from '..';
import { baseURL } from '../../helpers/api/backend';

interface IDashcard {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  color1: string
  color2: string
  label: string
  count: number
}

function Dashcard({
  Icon, color1, color2, label, count,
}: IDashcard): ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);

  const resetRevenue = ():void => {
    setLoading(true);
    fetch(`${baseURL}/resetrevenue`).then(() => {
      queryClient.invalidateQueries('dashboard');
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  };

  return (
    <div
      className="dashcard"
      style={{
        backgroundColor: colors.level1[theme],
        position: 'relative',
      }}
    >
      <div
        className="icon-wrapper"
        style={{
          backgroundColor: color1,
          ...theme === 'dark' && { boxShadow: `0px 8px 16px -2px ${color1}35` },
        }}
      >
        <Icon className={label.split(' ')[0]} />
      </div>
      <div className="right-dash">
        <div
          className="dash-label"
          style={{
            color: colors.text[theme],
          }}
        >
          {label}
          {label === 'Revenue' && (
          <span
            style={{
              position: 'absolute',
              right: '5px',
              top: '1px',
            }}
            aria-hidden
            onClick={resetRevenue}
          >
            <Refresh
              style={{
                filter: `${theme === 'dark' ? 'invert(100%) sepia(0%) saturate(8%) hue-rotate(236deg) brightness(104%) contrast(105%)' : ''}`,
                width: '20px',
              }}
            />
          </span>
          )}
        </div>
        {
            loading ? (
              <div
                style={{
                  transform: 'scale(0.5)',
                  marginTop: '-20px',
                  marginLeft: '-63px',
                }}
              >
                <Loader />
                <Loader />
                <Loader />
              </div>
            )

              : (
                <div
                  className="dash-count"
                  style={{
                    color: color2,
                  }}
                >
                  {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {' '}
                  {label === 'Revenue' && 'MMK'}
                </div>
              )
          }
      </div>

    </div>
  );
}

export default Dashcard;

import React, { ReactElement } from 'react';
import { Modal } from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import colors from '../../../components/global/themes/colors';
import { ThemeContext } from '../../../components/global/context/ThemeProvider';
import Gallery from '../../../components/gallery';
import Drive from '../../../assets/drive.png';
import { url } from '../../../helpers/api/backend';
import { UserContext } from '../../../components/global/context/UserProvider';

interface IDetailModal {
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  userdata : {
    id: string
    folderId: string
    reg: string
    name: string
    phone: string
    age: string
    address: string
    total: number
    date: string
    pTreatment: {[key: string]:{id: string; tname: string; tcharge: string; unit: number}[]}
    // eslint-disable-next-line max-len
    pMed: {[key: string]:{id: string; mname: string; price: string; count: number ; stock: string; max: number}[]}
    remark: string;
    images: string[]
  }
}

function DetailModal({ setDetailModal, userdata }: IDetailModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const { user } = React.useContext(UserContext);
  const {
    name, phone, age, address, date, reg, pTreatment, pMed, images, total, remark,
  } = userdata;

  const [gallery, setGallery] = React.useState(false);
  const [currentGallery, setCurrentGallery] = React.useState(0);

  const [fimages, setFimages] = React.useState<string[]>([]);

  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (images) {
        setFimages(images.map((e) => `${url}/patients/images/${e}`));
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      setFimages([]);
      const imgs = document.getElementsByClassName('allimages');
      for (let i = 0; i < imgs.length; i += 1) {
        const im = imgs[i] as HTMLImageElement;
        im.src = '';
      }
    };
  },
  [images]);

  return (
    <div>
      {
        gallery && fimages.length > 0
        && (
        <Gallery
          img={fimages[currentGallery]}
          setGallery={setGallery}
          currentGallery={currentGallery}
          setCurrentGallery={setCurrentGallery}
          imgCount={fimages.length}
        />
        )
      }
      <Modal
        width={1100}
        header="Patient Detail"
        closeModal={() => setDetailModal(false)}
      >
        <div>
          <div id="detail-patient-body">
            <div id="user-photo">
              <Userphoto />
              <br />
              <br />
              {
                user.type === 'admin'
                && (
                <div>

                  <div
                    style={{
                      color: colors.lightText[theme],
                    }}
                    className="detail-label"
                  >
                    Total Cost
                  </div>
                  <div
                    className="detail-info"
                    style={{
                      color: colors.text[theme],
                      display: 'inline-block',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {
    total
      .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
                    {' '}
                    MMK

                  </div>
                </div>
                )
              }
            </div>
            <div id="user-info-1">
              <div
                style={{
                  color: colors.lightText[theme],
                }}
                className="detail-label"
              >
                Name
              </div>
              <div
                style={{
                  color: colors.text[theme],
                }}
                className="detail-info"
              >
                {name}
              </div>
              {phone
              && (
              <>
                <div
                  style={{
                    color: colors.lightText[theme],
                  }}
                  className="detail-label"
                >
                  Phone
                </div>
                <div
                  className="detail-info"
                  style={{
                    color: colors.text[theme],
                  }}
                >
                  {phone}
                </div>
              </>
              )}
              {(age || +age !== 0)
              && (
              <>
                <div
                  style={{
                    color: colors.lightText[theme],
                  }}
                  className="detail-label"
                >
                  Age
                </div>
                <div
                  className="detail-info"
                  style={{
                    color: colors.text[theme],
                  }}
                >
                  {age}
                </div>
              </>
              )}
              {
                address
                && (
                <>
                  <div
                    style={{
                      color: colors.lightText[theme],
                    }}
                    className="detail-label"
                  >
                    Address
                  </div>
                  <div
                    className="detail-info"
                    style={{
                      color: colors.text[theme],
                      width: '300px',
                      wordBreak: 'break-all',

                    }}
                  >
                    {address}
                  </div>

                </>
                )
              }
              {
                reg
                && (
                <>
                  <div
                    style={{
                      color: colors.lightText[theme],
                    }}
                    className="detail-label"
                  >
                    Registration Number
                  </div>
                  <div
                    className="detail-info"
                    style={{
                      color: colors.text[theme],
                    }}
                  >
                    {reg}
                  </div>

                </>
                )
              }
              <div
                style={{
                  color: colors.lightText[theme],
                }}
                className="detail-label"
              >
                Last Treatment Date
              </div>
              <div
                className="detail-info"
                style={{
                  color: colors.text[theme],
                }}
              >
                {new Date(date).toLocaleString().split(',')[0]}
              </div>
              {remark[0].length > 0
              && (
              <>
                <div
                  style={{
                    color: colors.lightText[theme],
                  }}
                  className="detail-label"
                >
                  Remark
                </div>
                <div
                  className="detail-info"
                  style={{
                    color: colors.text[theme],
                    textAlign: 'justify',
                    paddingRight: '10px',
                  }}
                >
                  {remark}
                </div>

              </>
              )}
            </div>
            <div id="user-info-2">
              {Object.keys(pTreatment).length > 0
                  && (
                  <div
                    style={{
                      color: colors.lightText[theme],
                    }}
                    className="detail-label"
                  >
                    Given Treatment
                  </div>
                  )}
              {
                  Object.keys(pTreatment).length > 0
                  && (
                    Object.keys(pTreatment).map((c) => (

                      <div key={c}>
                        {
                          pTreatment[c].length > 0
                          && (
                          <span
                            style={{
                              display: 'inline-block',
                              backgroundColor: 'rgb(0,161,123)',
                              backgroundImage: 'linear-gradient(32deg, rgba(0,161,123,1) 44%, rgba(2,195,150,1) 100%)',
                              padding: '1px 2px 1px 2px',
                              fontSize: '11px',
                              borderRadius: '3px',
                              color: 'white',
                            }}
                          >
                            {c}

                          </span>
                          )
                        }

                        {
                          pTreatment[c].map((cc) => (
                            <div
                              key={cc.tname}
                              className="atreatment"
                              style={{
                                position: 'relative',
                                paddingRight: '20px',
                                fontSize: '12px',
                              }}
                            >
                              <span
                                className="treatment-name"
                                style={{
                                  display: 'inline-block',
                                  width: '130px',
                                }}
                              >
                                {cc.tname}

                              </span>
                              <span
                                className="tre-unit"
                                style={{
                                  display: 'inline-block',
                                  width: '80px',
                                }}
                              >
                                {cc.unit}
                                {' '}
                                {cc.unit === 1 ? 'unit' : 'units'}
                              </span>
                              <span
                                className="treatment-cost"
                                style={{
                                  display: 'inline-block',
                                  width: '80px',
                                  textAlign: 'right',
                                  opacity: user.type === 'admin' ? '1' : '0',
                                }}
                              >
                                {cc.tcharge}
                                {' '}
                                MMK
                              </span>
                            </div>
                          ))
                        }
                        {
                          (user.type === 'admin' && pTreatment[c].length > 0)
                          && (
                          <div style={{
                            borderTop: `0.5px solid ${colors.inputback[theme]}`,
                            marginTop: '3px',
                            paddingTop: '3px',
                            width: '70%',
                            fontSize: '12px',
                            marginBottom: '10px',
                          }}
                          >
                            <span style={{
                              fontWeight: 'bold',
                            }}
                            >
                              Total

                            </span>
                            <span
                              style={{
                                fontWeight: 'bold',
                                color: '#65B790',
                                display: 'inline-block',
                                width: '283px',
                                textAlign: 'right',
                              }}
                            >
                              {
                              // eslint-disable-next-line max-len
                              pTreatment[c].reduce((prev, cur) => prev + Number(+cur.tcharge * +cur.unit), 0)
}
                              {' '}
                              MMK

                            </span>
                          </div>
                          )
                        }
                      </div>
                    ))
                  )
                }
              {
               Object.keys(pMed).length > 0
              && (
              <div
                style={{
                  color: colors.lightText[theme],
                  marginTop: '5px',
                  paddingTop: '5px',
                  width: '50%',
                }}
                className="detail-label"
              >
                Given Medicine
              </div>
              )
              }
              {
                  Object.keys(pMed).length > 0
                    && Object.keys(pMed).map((e) => (
                      <div key={e}>
                        {
                        pMed[e].length > 0
                        && (
                          (
                            <span
                              style={{
                                display: 'inline-block',
                                backgroundColor: 'rgb(0,161,123)',
                                backgroundImage: 'linear-gradient(32deg, rgba(0,161,123,1) 44%, rgba(2,195,150,1) 100%)',
                                padding: '1px 2px 1px 2px',
                                fontSize: '11px',
                                borderRadius: '3px',
                                color: 'white',
                              }}
                            >
                              {e}

                            </span>
                          )
                        )
                       }
                        {

                    pMed[e].map((m) => (
                      <div
                        className="amed"
                        style={{
                          position: 'relative',
                          paddingRight: '20px',
                          fontSize: '12px',
                        }}
                      >
                        <span
                          className="med-name"
                          style={{
                            display: 'inline-block',
                            minWidth: '100px',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {m.mname}

                        </span>
                        <span
                          className="med-unit"
                          style={{
                            display: 'inline-block',
                            width: '69px',
                          }}
                        >
                          {m.count}
                          {' '}
                          {m.count === 1 ? 'unit' : 'units'}
                        </span>
                        <span
                          className="med-cost"
                          style={{
                            display: 'inline-block',
                            width: '80px',
                            textAlign: 'right',
                            opacity: user.type === 'admin' ? '1' : '0',
                          }}
                        >
                          {+m.price * m.count}
                          {' '}
                          MMK
                        </span>
                      </div>
                    ))
                      }
                        {
                          (user.type === 'admin' && pMed[e].length > 0)
                          && (
                          <div style={{
                            borderTop: `0.5px solid ${colors.inputback[theme]}`,
                            marginTop: '3px',
                            paddingTop: '3px',
                            width: '62%',
                            fontSize: '12px',
                            marginBottom: '10px',
                          }}
                          >
                            <span style={{
                              fontWeight: 'bold',
                              marginRight: '163px',
                            }}
                            >
                              Total

                            </span>
                            <span
                              style={{
                                fontWeight: 'bold',
                                color: '#65B790',
                                display: 'inline-block',
                                width: '80px',
                                textAlign: 'right',
                              }}
                            >
                              {
                               // eslint-disable-next-line max-len
                               pMed[e].reduce((prev, cur) => prev + (Number(cur.price) * Number(cur.count)), 0)
                              }
                              {' '}
                              MMK

                            </span>
                          </div>
                          )
                        }
                      </div>
                    ))
                  }

            </div>
          </div>
          {
            images.length > 0
          && (
          <div
            id="patient-detail-images"
          >
            <div
              style={{
                color: colors.lightText[theme],
                marginLeft: '50px',
              }}
              className="detail-label"
            >
              Images
            </div>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginLeft: '50px',
              }}
            >
              {
                  fimages.length > 0 ? fimages.map((img, index) => (
                    <div
                      style={{
                        width: '450px',
                        paddingRight: '20px',
                      }}
                      aria-hidden="true"
                      onClick={() => {
                        setCurrentGallery(index);
                        setGallery((prev) => !prev);
                      }}
                      key={img}
                    >
                      <img
                        style={{ width: '100%', objectFit: 'contain' }}
                        alt="patient teeth"
                        src={img}
                        key={Math.random()}
                        loading="lazy"
                        className="allimages"
                      />
                    </div>
                  )) : (
                    <div style={{
                      width: '100%',
                      textAlign: 'center',
                      marginTop: '50px',
                    }}
                    >
                      Loading images from Drive
                      <br />
                      <br />
                      <img
                        style={{
                          width: '50px',
                        }}
                        src={Drive}
                        alt="Google Drive"
                      />
                    </div>
                  )
}
            </div>
          </div>
          )

            }
        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;

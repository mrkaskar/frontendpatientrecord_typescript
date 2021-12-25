import React, { ReactElement } from 'react';
import { Modal } from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import colors from '../../../components/global/themes/colors';
import { ThemeContext } from '../../../components/global/context/ThemeProvider';
import Gallery from '../../../components/gallery';
import Drive from '../../../assets/drive.png';
import { url } from '../../../helpers/api/backend';

interface IDetailModal {
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  userdata : {
    reg: string
    name: string
    phone: string
    age: string
    address: string
    total: number
    date: string
    takenTreatment: {tname: string, cost: number, munit?:number}[]
    medicine: {mname: string, munit: number, cost: number}[]
    images: string[]
  }
}

function DetailModal({ setDetailModal, userdata }: IDetailModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const {
    name, phone, age, address, date, reg, takenTreatment, medicine, images, total,
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
              <div
                style={{
                  color: colors.lightText[theme],
                }}
                className="detail-label"
              >
                Date
              </div>
              <div
                className="detail-info"
                style={{
                  color: colors.text[theme],
                }}
              >
                {new Date(date).toLocaleString().split(',')[0]}
              </div>
            </div>
            <div id="user-info-2">
              <div
                style={{
                  color: colors.lightText[theme],
                }}
                className="detail-label"
              >
                Taken Treatment
              </div>
              {
              takenTreatment.map((e) => (
                <div
                  className="detail-info"
                  style={{
                    color: colors.text[theme],
                  }}
                >
                  <span className="tname">
                    {e.tname}
                  </span>
                  <span className="tcost">
                    {e.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    {' '}
                    MMK
                  </span>
                </div>
              ))
            }

              <div
                style={{
                  color: colors.lightText[theme],
                }}
                className="detail-label"
              >
                Medicine
              </div>
              {
              medicine.map((e) => (
                <div
                  className="detail-info"
                  style={{
                    color: colors.text[theme],
                  }}
                >
                  <span className="mname">
                    {e.mname}
                  </span>
                  <span className="munit">
                    {e.munit}
                    {' '}
                    {+e.munit > 1 ? 'units' : 'unit'}
                  </span>
                  <span className="mcost">
                    {(e.cost * +e.munit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    {' '}
                    MMK
                  </span>
                </div>
              ))
            }
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
                    fontWeight: 'bold',
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

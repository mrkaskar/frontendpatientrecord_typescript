import React, { ReactElement } from 'react';
import { Modal } from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import colors from '../../../components/global/themes/colors';
import { ThemeContext } from '../../../components/global/context/ThemeProvider';
import Gallery from '../../../components/gallery';

interface IDetailModal {
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  userdata : {
    name: string
    phone: string
    age: string
    address: string
    reg: string
    takenTreatment: {tname: string, cost: number}[]
    medicine: {mname: string, munit: number, cost: number}[]
    images: string[]
  }
}

function DetailModal({ setDetailModal, userdata }: IDetailModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const {
    name, phone, age, address, reg, takenTreatment, medicine, images,
  } = userdata;

  const [gallery, setGallery] = React.useState(false);
  const [currentGallery, setCurrentGallery] = React.useState(0);

  return (
    <div>
      {
        gallery && images.length > 0
        && (
        <Gallery
          img={images[currentGallery]}
          setGallery={setGallery}
          currentGallery={currentGallery}
          setCurrentGallery={setCurrentGallery}
          imgCount={images.length}
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
                  width: '200px',
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
                    units
                  </span>
                  <span className="mcost">
                    {e.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                  [...takenTreatment, ...medicine]
                    .reduce((p, n) => p + n.cost, 0)
                    .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                  {' '}
                  MMK

                </div>
              </div>
            </div>
          </div>

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
                  images.map((img, index) => (
                    <div
                      style={{
                        width: '450px',
                      }}
                      aria-hidden="true"
                      onClick={() => {
                        setCurrentGallery(index);
                        setGallery((prev) => !prev);
                      }}
                    >
                      <img
                        style={{ width: '100%', objectFit: 'contain' }}
                        alt="patient teeth"
                        src={img}
                      />
                    </div>
                  ))
                }
            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;

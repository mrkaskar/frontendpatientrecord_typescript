import React, { ReactElement } from 'react';
import { Modal } from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import colors from '../../../components/global/themes/colors';
import { ThemeContext } from '../../../components/global/context/ThemeProvider';

interface IDetailModal {
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  userdata : {
    name: string
    phone: string
    age: number
    address: string
    reg: string
    takenTreatment: {tname: string, cost: number}[]
    medicine: {mname: string, munit: number, cost: number}[]
  }
}

function DetailModal({ setDetailModal, userdata }: IDetailModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const {
    name, phone, age, address, reg, takenTreatment, medicine,
  } = userdata;

  return (
    <div>
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

          </div>

        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;

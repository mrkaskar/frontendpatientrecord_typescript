import React, { ReactElement } from 'react';
import {
  Button, Dropdown, Modal, TextBox,
} from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import { ReactComponent as Save } from '../../../assets/save.svg';
import Imageupload from '../../../components/imageupload';
import colors from '../../../components/global/themes/colors';
import { ThemeContext } from '../../../components/global/context/ThemeProvider';

interface ICreateModal {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}
function CreateModal({ modal, setModal }:ICreateModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div>
      {
      modal
      && (
      <Modal
        width={1100}
        header="Create a patient"
        closeModal={() => { setModal(false); }}
      >
        <div id="create-patient-body">
          <div id="patient-cost">
            <div id="user-info">
              <Userphoto />
              <div id="total-cost">
                Total Cost
              </div>
              <div id="cost">
                8,000 MMK
              </div>
            </div>
          </div>
          <div id="patient-form">
            <div id="patient-name" className="text-form">
              <TextBox
                label="Name"
                width={212}
              />
            </div>

            <div id="patient-phone" className="text-form">
              <TextBox
                label="Phone Number"
                width={212}
              />
            </div>
            <div id="patient-age" className="text-form">
              <TextBox
                label="Age"
              />
            </div>
            <div style={{ width: '100%' }}>
              <div id="patient-address" className="text-form">
                <TextBox
                  label="Address"
                  width={541}
                />
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <div id="patient-reg" className="text-form">
                <TextBox
                  label="Registration Number"
                  width={212}
                />
              </div>
            </div>
            <div id="treatment-area" style={{ width: '100%' }}>
              <div id="treatment-type">
                <div className="label">
                  Treatment Type
                </div>
                <Dropdown
                  label="Choose Treatment and Cost"
                  list={[
                    { label: 'Matal brace Orthodontic treatment hello hello hello hello hello hello testing testing', checked: false },
                    { label: 'Matal brace Orthodontic treatment hello hello hello hello hello hello testing testing', checked: true },
                  ]}
                  width={400}
                />
              </div>
              <div className="chosen-treatment">
                <div className="label" style={{ textDecoration: 'underline' }}>
                  Chosen Treatment and Cost
                </div>
                <div className="treatments">
                  <div className="atreatment">
                    <span className="treatment-name">Acrylic teeth</span>
                    <span className="treatment-cost">5000 MMK</span>
                  </div>
                  <div className="atreatment">
                    <span className="treatment-name">Acrylic teeth</span>
                    <span className="treatment-cost">5000 MMK</span>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div id="med-area" style={{ width: '100%' }}>
              <div id="med-type">
                <div className="label">
                  Medication
                </div>
                <Dropdown
                  label="Choose Medication"
                  list={[
                    { label: 'Matal brace Orthodontic treatment hello hello hello hello hello hello testing testing', checked: false },
                    { label: 'Matal brace Orthodontic treatment hello hello hello hello hello hello testing testing', checked: true },
                  ]}
                  width={400}
                />
              </div>
              <div className="chosen-med">
                <div className="label" style={{ textDecoration: 'underline' }}>
                  Chosen Medication and Cost
                </div>
                <div className="meds">
                  <div className="amed">
                    <span className="med-name">Acrylic teeth</span>
                    <span className="med-unit">
                      <input
                        type="number"
                        min={1}
                        value={1}
                        className="med-unit-count"
                        style={{
                          backgroundColor: colors.inputback[theme],
                          color: colors.text[theme],
                        }}
                      />
                    </span>
                    <span className="med-cost">5000 MMK</span>
                  </div>
                  <div className="amed">
                    <span className="med-name">Acrylic teeth</span>
                    <input
                      type="number"
                      min={1}
                      value={1}
                      className="med-unit-count"
                      style={{
                        backgroundColor: colors.inputback[theme],
                        color: colors.text[theme],
                      }}
                    />
                    <span className="med-cost">5000 MMK</span>
                  </div>
                  <div className="amed">
                    <span className="med-name">Acrylic teeth</span>
                    <span className="med-unit">
                      <input
                        type="number"
                        min={1}
                        value={1}
                        className="med-unit-count"
                        style={{
                          backgroundColor: colors.inputback[theme],
                          color: colors.text[theme],

                        }}
                      />
                    </span>
                    <span className="med-cost">5000 MMK</span>
                  </div>
                  <div className="amed">
                    <span className="med-name">Acrylic teeth</span>
                    <input
                      type="number"
                      min={1}
                      value={1}
                      className="med-unit-count"
                      style={{
                        backgroundColor: colors.inputback[theme],
                        color: colors.text[theme],

                      }}
                    />
                    <span className="med-cost">5000 MMK</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="img-area" style={{ width: '100%' }}>
              <div className="label">
                Patient Images
              </div>
              <div>
                <Imageupload />
              </div>
              <div
                style={{
                  height: '20px',
                }}
              />
              <Button
                onClick={() => alert('save')}
                Icon={Save}
                color1="#53BB85"
                color2="#61F2A7"
                label="Save"
              />
            </div>
          </div>
        </div>
      </Modal>
      )
    }
    </div>
  );
}

export default CreateModal;

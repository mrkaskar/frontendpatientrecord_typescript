/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-len */
import React, {
  forwardRef, LegacyRef, ReactElement,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DatePicker from 'react-datepicker';
import { ImageListType } from 'react-images-uploading';
import {
  Button, Dropdown, Loader, Modal, TextBox,
} from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import { ReactComponent as Save } from '../../../assets/save.svg';
import Imageupload from '../../../components/imageupload';
import colors from '../../../components/global/themes/colors';
import { ThemeContext } from '../../../components/global/context/ThemeProvider';
import { getAllTreatment } from '../../treatment/api/apiFunctions';
import { getAllMed } from '../../medication/api/apiFunctions';
import './datepicker.css';
import useForm from '../../../hooks/useForm';
import { createPatient, IUploadPatient, updatePatient } from '../api/apiFunctions';
import { url } from '../../../helpers/api/backend';

interface ICreateModal {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  patientdata?: {
    id: string
    folderId: string
    reg: string
    name: string
    phone: string
    age: string
    address: string
    total: number
    date: string
    takenTreatment: {id: string, tname: string, cost: number}[]
    medicine: {id: string, mname: string, munit: number, cost: number, stock: string}[]
    medCount: number[]
    images: string[]
  }
}
function CreateModal({ modal, setModal, patientdata }:ICreateModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const patient = {
    reg: '',
    name: '',
    phone: '',
    age: '',
    address: '',
  };
  const [form, updateForm, setForm] = useForm(patient);
  const [valid, setValid] = React.useState(false);

  const alltreatment = useQuery('treatment', getAllTreatment);
  const [startDate, setStartDate] = React.useState<Date | [Date | null, Date | null] | null>(new Date());
  const allmed = useQuery('medicine', getAllMed);
  const [treatmentlist, setTreatmentlist] = React.useState<
  {
  [key:string]:
  {id: string; label: string; checked: boolean, charge: string} []}
  >({});

  const [localDate, setLocalDate] = React.useState(
    () => (startDate instanceof Date ? startDate.toLocaleDateString() : ''),
  );
  // eslint-disable-next-line max-len
  const [chosenTreatment, setChosenTreatment] = React.useState<{
  [key: string]:
  {id: string;tname: string; tcharge: string}[]}>({ });
  const [medlist, setMedlist] = React.useState<{
    [key:string]:{id: string; label: string; checked: boolean, price: string; count:number; stock: number;
    }[]}
  >({});
  const [chosenMed, setChosenMed] = React.useState<{
    [key: string]:
    {id: string; mname: string; price: string; count: number; stock: string, max: number
  }[]}>({ });

  const [totalCost, setTotalCost] = React.useState(0);
  const [localStock, setLocalStock] = React.useState<
    {id: string; stock: number}[]
  >([]);

  const [images, setImages] = React.useState<ImageListType>([]);

  const fetchedTreatment = React.useRef(false);
  const fetchedMed = React.useRef(false);

  // React.useEffect(() => {
  //   if (!Object.values(form).includes('') && chosenTreatment.length > 0) {
  //     setValid(true);
  //   }
  // }, [chosenTreatment.length, form]);

  // React.useEffect(() => {
  //   const totalTreatmentCost = chosenTreatment.reduce((prev, cur) => prev + Number(cur.tcharge), 0);
  //   const totalMedCost = chosenMed.reduce((prev, cur) => prev + (Number(cur.price) * Number(cur.count)), 0);
  //   setTotalCost(totalTreatmentCost + totalMedCost);
  // }, [chosenMed, chosenTreatment]);
  React.useEffect(() => {
    if (startDate instanceof Date) {
      setLocalDate(startDate.toLocaleDateString());
      const dateString = startDate.toLocaleDateString();
      if (alltreatment.data) {
        setTreatmentlist({
          [dateString]: alltreatment.data.map((t) => ({
            id: t.id,
            label: t.name,
            checked: (function checkTreatment() {
              if (chosenTreatment[dateString]) {
                let checked = false;
                chosenTreatment[dateString].forEach((e) => {
                  if (e.id === t.id) checked = true;
                });
                return checked;
              }
              return false;
            }()),
            charge: t.charge,
          })),
        });
      }
      if (allmed.data) {
        setMedlist({
          [dateString]: allmed.data.map((t) => ({
            id: t.id,
            label: t.name,
            checked:
            (function checkMed() {
              if (chosenMed[dateString]) {
                let checked = false;
                chosenMed[dateString].forEach((e) => {
                  if (e.id === t.id) checked = true;
                });
                return checked;
              }
              return false;
            }()),
            price: t.price,
            count: 0,
            stock: (function checkStock() {
              const find = localStock.find((e) => e.id === t.id);
              if (find) return find.stock;
              return 0;
            }()),
            max: +t.stock,
          })),
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  React.useEffect(() => {
    if (alltreatment.data && !fetchedTreatment.current) {
      fetchedTreatment.current = true;
      setTreatmentlist({
        [localDate]: alltreatment.data.map((t) => ({
          id: t.id, label: t.name, checked: false, charge: t.charge,
        })),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alltreatment.data]);

  React.useEffect(() => {
    if (allmed.data && !fetchedMed.current) {
      fetchedMed.current = true;
      setMedlist({
        [localDate]: allmed.data.map((t) => ({
          id: t.id, label: t.name, checked: false, price: t.price, count: 0, stock: +t.stock, max: +t.stock,
        })),
      });
      setLocalStock(allmed.data.map((m) => ({ id: m.id, stock: +m.stock })));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allmed.data]);

  const setTreat = (id: string, action: boolean, date: string):void => {
    setTreatmentlist({
      [localDate]:
      treatmentlist[localDate]?.map((l) => {
        // eslint-disable-next-line no-param-reassign
        if (l.id === id) l.checked = action;

        return l;
      }),
    });

    const toTakeAction = alltreatment.data?.find((e) => e.id === id);
    if (action && toTakeAction) {
      // add treatment
      setChosenTreatment((prev) => {
        const existing = prev[localDate];
        if (existing) {
          return {
            ...prev,
            [localDate]: [...existing, {
              id: toTakeAction.id,
              tname: toTakeAction.name,
              tcharge: toTakeAction.charge,
            }],
          };
        }
        return {
          ...prev,
          [localDate]: [{
            id: toTakeAction.id,
            tname: toTakeAction.name,
            tcharge: toTakeAction.charge,
          }],
        };
      });
    } else if (!action && toTakeAction) {
      setChosenTreatment(
        (prev) => ({ ...prev, [date]: prev[date].filter((e) => e.id !== toTakeAction.id) }),
      );
    }
  };

  const setMed = (id: string, action: boolean, date: string):void => {
    setMedlist({
      [localDate]:
      medlist[localDate]?.map((l) => {
        // eslint-disable-next-line no-param-reassign
        if (l.id === id) l.checked = action;

        return l;
      }),
    });

    const toTakeAction = allmed.data?.find((e) => e.id === id);
    if (action && toTakeAction) {
      setLocalStock((prev) => prev.map((e) => {
        if (e.id === toTakeAction.id) {
          e.stock -= 1;
        }
        return e;
      }));
      // add treatment
      setChosenMed((prev) => {
        const existing = prev[localDate];
        if (existing) {
          return {
            ...prev,
            [localDate]: [...existing, {
              id: toTakeAction.id,
              mname: toTakeAction.name,
              count: 1,
              price: toTakeAction.price,
              stock: toTakeAction.stock,
              max: +toTakeAction.stock,
            }],
          };
        }
        return {
          ...prev,
          [localDate]: [{
            id: toTakeAction.id,
            mname: toTakeAction.name,
            count: 1,
            price: toTakeAction.price,
            stock: toTakeAction.stock,
            max: +toTakeAction.stock,
          }],
        };
      });
    } else if (!action && toTakeAction) {
      setChosenMed(
        (prev) => ({ ...prev, [date]: prev[date].filter((e) => e.id !== toTakeAction.id) }),
      );
    }
  };

  const calculateMax = (id: string, count: number):number => {
    const findLs = localStock.find((e) => e.id === id);
    if (findLs) return findLs.stock + count;
    return 10;
  };

  const DateInput:React.ReactNode = forwardRef(({ value, onClick }:{value: Date, onClick: ()=>void}, ref:LegacyRef<HTMLButtonElement> | undefined) => (
    <button
      type="button"
      style={{
        marginTop: '3px',
        height: '28px',
        border: 'none',
        padding: '5px 10px 5px 10px',
        borderRadius: '5px',
      }}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const queryClient = useQueryClient();
  const saveP = useMutation((data:IUploadPatient) => createPatient(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('patients');
      queryClient.invalidateQueries('medicine');
      setModal(false);
    },
  });
  const updateP = useMutation((data:IUploadPatient) => updatePatient(data), {
    onSuccess: () => {
      queryClient.refetchQueries('patients');
      queryClient.refetchQueries('medicine');
      setModal(false);
    },
  });
  const uploadData = (type:string):void => {
    const toUpload = {
      name: '', phone: '', age: '', address: '', regNum: '', treatments: '', total: 0, medicine: '', images: '', date: startDate, oldTotal: 0, folderId: '', id: '', oldStock: '',
    };
    toUpload.name = form.name;
    toUpload.phone = form.phone;
    toUpload.age = form.age;
    toUpload.address = form.address;
    toUpload.regNum = form.reg;
    // toUpload.treatments = JSON.stringify(chosenTreatment.map((e) => e.id));
    // toUpload.medicine = JSON.stringify(chosenMed.map((e) => ({ id: e.id, count: e.count })));
    toUpload.total = totalCost;
    toUpload.date = startDate;
    toUpload.images = JSON.stringify(images);

    if (type === 'create') { saveP.mutate(toUpload); } else if (patientdata?.name) {
      toUpload.oldTotal = patientdata.total;
      toUpload.folderId = patientdata.folderId;
      toUpload.oldStock = JSON.stringify(patientdata.medicine.map((ee, index) => ({
        id: ee.id,
        count: patientdata.medCount[index],
      })));
      toUpload.id = patientdata.id;
      updateP.mutate(toUpload);
    }
  };
  React.useEffect(() => {
    if (patientdata?.name) {
      setForm({
        reg: patientdata.reg,
        name: patientdata.name,
        phone: patientdata.phone,
        age: patientdata.age,
        address: patientdata.address,
      });
      setStartDate(new Date(patientdata.date));
      const chosenTreatmentIds:string[] = [];

      // patientdata.takenTreatment.map((e) => {
      //   chosenTreatmentIds.push(e.id);
      //   const toAdd = {
      //     id: e.id,
      //     tname: e.tname,
      //     tcharge: e.cost.toString(),
      //   };
      //   return toAdd;
      // }
      setChosenTreatment({ ...chosenTreatment, [localDate]: [] });

      // if (alltreatment.data) {
      //   setTreatmentlist(alltreatment.data.map((t) => ({
      //     id: t.id, label: t.name, checked: chosenTreatmentIds.includes(t.id), charge: t.charge,
      //   })));
      // }
      const medIds: string[] = [];
      // setChosenMed(patientdata.medicine.map((e) => {
      //   medIds.push(e.id);
      //   return {
      //     id: e.id,
      //     mname: e.mname,
      //     price: e.cost.toString(),
      //     count: e.munit,
      //     stock: e.stock,
      //     max: +e.stock + +e.munit,
      //   };
      // }));
      setChosenMed({ ...chosenMed, localDate: [] });
      // if (allmed.data) {
      //   setMedlist(allmed.data.map((t) => ({
      //     id: t.id, label: t.name, checked: medIds.includes(t.id), price: t.price, count: 0, stock: +t.stock, max: +t.stock,
      //   })));
      // }
      setImages(patientdata.images.map((e) => ({ dataURL: `${url}/patients/images/${e}` })));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientdata, alltreatment.data, allmed.data]);
  return (
    <div>
      {
      modal
      && (
      <Modal
        width={1100}
        header={patientdata?.name ? 'Edit Patient' : 'Create Patient'}
        closeModal={() => { setModal(false); }}
      >
        {
          saveP.isLoading || updateP.isLoading
            ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '100px',
                marginBottom: '150px',
              }}
              >
                <Loader />
                <br />
                <span>Saving Patient Data...</span>
              </div>
            )
            : (
              <div id="create-patient-body">
                <div id="patient-cost">
                  <div id="user-info">
                    <Userphoto />
                    <div id="total-cost">
                      Total Cost
                    </div>
                    <div id="cost">
                      {totalCost}
                      {' '}
                      MMK
                    </div>
                  </div>
                </div>
                <div id="patient-form">
                  <div id="patient-name" className="text-form">
                    <TextBox
                      label="Name"
                      width={212}
                      onInput={(text: string) => { updateForm('name', text); }}
                      value={form.name}
                    />
                  </div>

                  <div id="patient-phone" className="text-form">
                    <TextBox
                      label="Phone Number"
                      width={212}
                      onInput={(text: string) => { updateForm('phone', text); }}
                      value={form.phone}
                    />
                  </div>
                  <div id="patient-age" className="text-form">
                    <TextBox
                      label="Age"
                      onInput={(text: string) => { updateForm('age', text); }}
                      value={form.age}
                    />
                  </div>
                  <div style={{ width: '100%' }}>
                    <div id="patient-address" className="text-form">
                      <TextBox
                        label="Address"
                        width={541}
                        onInput={(text: string) => { updateForm('address', text); }}
                        value={form.address}
                      />
                    </div>
                  </div>
                  <div style={{ width: '100%', display: 'flex' }}>
                    <div id="patient-reg" className="text-form">
                      <TextBox
                        label="Registration Number"
                        width={212}
                        onInput={(text: string) => { updateForm('reg', text); }}
                        value={form.reg}
                      />
                    </div>
                    <div
                      className="label"
                      style={{ marginLeft: '10px' }}
                    >
                      Date
                      {' '}
                      <br />
                      <DatePicker
                  // @ts-ignore
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                  // @ts-ignore
                        customInput={<DateInput />}
                      />
                    </div>
                  </div>
                  <div id="treatment-area" style={{ width: '100%' }}>
                    <div id="treatment-type">
                      <div className="label">
                        Treatment Type
                      </div>
                      {
                  treatmentlist
                && (
                <Dropdown
                  label="Choose Treatment"
                  list={treatmentlist[localDate]}
                  width={400}
                  dateKey={localDate}
                  setAction={setTreat}
                />
                )
                }
                    </div>
                    <div className="chosen-treatment">
                      <div className="label" style={{ textDecoration: 'underline' }}>
                        Chosen Treatment and Cost
                      </div>
                      <div className="treatments">
                        {
                  Object.keys(chosenTreatment).length > 0
                  && (
                    Object.keys(chosenTreatment).map((c) => (

                      <div key={c}>
                        {
                          chosenTreatment[c].length > 0
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
                              marginTop: '10px',
                            }}
                          >
                            {c}

                          </span>
                          )
                        }

                        {
                          chosenTreatment[c].map((cc) => (
                            <div
                              key={cc.tname}
                              className="atreatment"
                              style={{
                                position: 'relative',
                                paddingRight: '20px',
                              }}
                            >
                              <span
                                className="treatment-name"
                                style={{
                                  display: 'inline-block',
                                  minWidth: '150px',
                                }}
                              >
                                {cc.tname}

                              </span>
                              <span className="treatment-cost">
                                {cc.tcharge}
                                {' '}
                                MMK
                              </span>
                              <span
                                aria-hidden="true"
                                onClick={() => {
                                  setTreat(cc.id, false, c);
                                }}
                                style={{
                                  position: 'absolute',
                                  right: '0',
                                  top: '-1px',
                                }}
                              >
                                x

                              </span>
                            </div>
                          ))
                        }
                      </div>
                    ))
                  )
                }
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div id="med-area" style={{ width: '100%' }}>
                    <div id="med-type">
                      <div className="label">
                        Medication
                      </div>
                      {medlist
                && (
                <Dropdown
                  label="Choose Medication"
                  list={medlist[localDate]}
                  width={400}
                  dateKey={localDate}
                  setAction={setMed}
                />
                )}
                    </div>
                    <div className="chosen-med">
                      <div className="label" style={{ textDecoration: 'underline' }}>
                        Chosen Medication and Cost
                      </div>
                      <div className="meds">
                        {
                  Object.keys(chosenMed).length > 0
                    && Object.keys(chosenMed).map((e) => (
                      <div key={e}>
                        {
                        chosenMed[e].length > 0
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
                                marginTop: '10px',
                              }}
                            >
                              {e}

                            </span>
                          )
                        )
                       }
                        {

                    chosenMed[e].map((m) => (
                      <div
                        className="amed"
                        style={{
                          position: 'relative',
                          paddingRight: '20px',
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
                            width: '300px',
                          }}
                        >
                          <input
                            type="number"
                            min={1}
                            max={calculateMax(m.id, m.count)}
                            value={m.count === 0 ? 1 : m.count}
                            className="med-unit-count"
                            onKeyDown={(evt) => {
                              if (evt.key === 'Backspace') {
                                // eslint-disable-next-line no-param-reassign

                                setMed(m.id, false, e);
                              }
                            }}
                            onChange={(evt) => {
                              if (m.count < +evt.target.value) {
                                setLocalStock((prev) => prev.map((eee) => {
                                  // eslint-disable-next-line no-param-reassign
                                  if (eee.id === m.id) eee.stock -= 1;
                                  return eee;
                                }));
                              } else {
                                setLocalStock((prev) => prev.map((eee) => {
                                  // eslint-disable-next-line no-param-reassign
                                  if (eee.id === m.id) eee.stock += 1;
                                  return eee;
                                }));
                                setMedlist({
                                  [localDate]:
                                  medlist[localDate]?.map((l) => {
                                    // eslint-disable-next-line no-param-reassign
                                    if (l.id === m.id) l.stock = localStock.find((eee) => eee.id === m.id)?.stock ?? 1;

                                    return l;
                                  }),
                                });
                              }
                              setChosenMed({
                                ...chosenMed,
                                [e]: chosenMed[e].map((ee) => {
                                  if (ee.id === m.id) {
                                    // eslint-disable-next-line no-param-reassign
                                    ee.count = +evt.target.value;
                                  }
                                  return ee;
                                }),
                              });
                            }}
                            style={{
                              backgroundColor: colors.inputback[theme],
                              color: colors.text[theme],
                            }}
                          />
                        </span>
                        <span className="med-cost">
                          {+m.price * m.count}
                          {' '}
                          MMK
                        </span>
                        <span
                          aria-hidden="true"
                          onClick={() => {
                            setMed(m.id, false, e);
                          }}
                          style={{
                            position: 'absolute',
                            right: '0',
                            top: '2px',
                          }}
                        >
                          x

                        </span>
                      </div>
                    ))
                      }
                      </div>
                    ))
                  }

                      </div>
                    </div>
                  </div>
                  <div id="img-area" style={{ width: '100%' }}>
                    <div className="label">
                      Patient Images
                    </div>
                    <div>
                      <Imageupload
                        images={images}
                        setImages={setImages}
                      />
                    </div>
                    <div
                      style={{
                        height: '20px',
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (valid) {
                          if (patientdata?.name) {
                            uploadData('edit');
                          } else {
                            uploadData('create');
                          }
                        }
                      }}
                      Icon={Save}
                      color1={valid ? '#53BB85' : '#757575'}
                      color2={valid ? '#53BB85' : '#969696'}
                      label="Save"
                    />
                  </div>
                </div>
              </div>
            )
}
      </Modal>
      )
    }
    </div>
  );
}

CreateModal.defaultProps = {
  patientdata: {

  },
};

export default CreateModal;

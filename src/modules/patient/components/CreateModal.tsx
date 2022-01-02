/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-len */
import React, {
  forwardRef, LegacyRef, ReactElement,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DatePicker from 'react-datepicker';
import { ImageListType } from 'react-images-uploading';
import {
  Button, Dropdown, InputNumber, Loader, Modal, TextBox,
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
import { UserContext } from '../../../components/global/context/UserProvider';

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
    pTreatment: {[key: string]:{id: string; tname: string; tcharge: string, unit: number}[]}
    // eslint-disable-next-line max-len
    pMed: {[key: string]:{id: string; mname: string; price: string; count: number ; stock: string; max: number}[]}
    tDates: string[]
    mDates: string[]
    remark: string
    images: string[]
  }
}
function CreateModal({ modal, setModal, patientdata }:ICreateModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const { user } = React.useContext(UserContext);
  const patient = {
    reg: '',
    name: '',
    phone: '',
    age: '',
    address: '',
    remark: '',
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
  {id: string;tname: string; tcharge: string, unit: number}[]}>({ });
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

  React.useEffect(() => {
    if (form.name.length > 0) {
      setValid(true);
    }
  }, [chosenTreatment, chosenTreatment.length, form]);

  function flatten<T>(obj:T):T[] {
    let arr:T[] = [];
    Object.values(obj).forEach((o) => { arr = [...arr, ...o]; });
    return arr;
  }

  React.useEffect(() => {
    const totalTreatmentCost = flatten(chosenTreatment).reduce((prev, cur) => prev + Number(+cur.tcharge * +cur.unit), 0);
    const totalMedCost = flatten(chosenMed).reduce((prev, cur) => prev + (Number(cur.price) * Number(cur.count)), 0);
    setTotalCost(totalTreatmentCost + totalMedCost);
  }, [chosenMed, chosenTreatment]);

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
      ...treatmentlist,
      [date]:
      treatmentlist[date]?.map((l) => {
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
              unit: 1,
            }],
          };
        }
        return {
          ...prev,
          [localDate]: [{
            id: toTakeAction.id,
            tname: toTakeAction.name,
            tcharge: toTakeAction.charge,
            unit: 1,
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
      ...medlist,
      [date]:
      medlist[date]?.map((l) => {
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
      const retrievedStock = chosenMed[date].find((e) => e.id === toTakeAction.id)?.count;
      if (retrievedStock && retrievedStock >= 1) {
        setLocalStock((prev) => prev.map((e) => {
          if (e.id === toTakeAction.id) {
            e.stock += retrievedStock;
          }
          return e;
        }));
      }
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
      name: '', phone: '', age: '', address: '', regNum: '', treatments: '', total: 0, medicine: '', images: '', date: startDate, oldTotal: 0, folderId: '', id: '', oldTreatment: '', oldMedicine: '', remark: '',
    };
    toUpload.name = form.name;
    toUpload.phone = form.phone;
    toUpload.age = form.age;
    toUpload.address = form.address;
    toUpload.regNum = form.reg;
    toUpload.treatments = JSON.stringify(chosenTreatment);
    toUpload.medicine = JSON.stringify(chosenMed);
    toUpload.total = totalCost;
    toUpload.date = startDate;
    toUpload.remark = form.remark;
    toUpload.images = JSON.stringify(images);

    if (type === 'create') { saveP.mutate(toUpload); } else if (patientdata?.name) {
      toUpload.oldTotal = patientdata.total;
      toUpload.folderId = patientdata.folderId;
      toUpload.id = patientdata.id;
      updateP.mutate(toUpload);
    }
  };
  React.useEffect(() => {
    if (patientdata?.name) {
      const stringAge = patientdata.age.toString();
      setForm({
        reg: patientdata.reg,
        name: patientdata.name,
        phone: patientdata.phone,
        age: stringAge === '0' ? '' : stringAge,
        address: patientdata.address,
        remark: patientdata.remark,
      });
      setStartDate(new Date());

      setChosenTreatment(patientdata.pTreatment);

      patientdata.tDates.forEach((tdate) => {
        if (alltreatment.data) {
          setTreatmentlist({
            [tdate]: alltreatment.data.map((t) => ({
              id: t.id,
              label: t.name,
              checked: (function checkTreatment() {
                if (chosenTreatment[tdate]) {
                  let checked = false;
                  chosenTreatment[tdate].forEach((e) => {
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
      });

      setChosenMed(patientdata.pMed);
      patientdata.mDates.forEach((mdate) => {
        if (allmed.data) {
          setMedlist({
            [mdate]: allmed.data.map((t) => ({
              id: t.id,
              label: t.name,
              checked:
          (function checkMed() {
            if (chosenMed[mdate]) {
              let checked = false;
              chosenMed[mdate].forEach((e) => {
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
      });

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
                    <div
                      style={{
                        opacity: user.type === 'admin' ? '1' : '0',
                      }}
                    >
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
                      value={form.age === '0' ? '' : form.age}
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
                  width={250}
                  dateKey={localDate}
                  setAction={setTreat}
                />
                )
                }
                    </div>
                    <div className="chosen-treatment">
                      {Object.keys(chosenTreatment).length > 0
                      && (
                      <div className="label">
                        Treatment and Cost
                      </div>
                      )}
                      <div
                        className="treatments"
                      >
                        {
                  Object.keys(chosenTreatment).length > 0
                  && (
                    Object.keys(chosenTreatment).map((c) => (

                      <div
                        key={c}
                      >
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
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '7px',
                              }}
                            >
                              <span
                                className="treatment-name"
                                style={{
                                  display: 'inline-block',
                                  width: '140px',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {cc.tname}

                              </span>
                              <span
                                className="treatment-unit"
                                style={{
                                  display: 'inline-block',
                                  width: '100px',
                                }}
                              >
                                <InputNumber
                                  value={cc.unit}
                                  onIncrease={() => {
                                    setChosenTreatment({
                                      ...chosenTreatment,
                                      [c]: chosenTreatment[c].map((e) => {
                                        if (e.id === cc.id) {
                                          e.unit = cc.unit + 1;
                                        }
                                        return e;
                                      }),
                                    });
                                  }}
                                  onDecrease={() => {
                                    if (cc.unit - 1 > 0) {
                                      setChosenTreatment({
                                        ...chosenTreatment,
                                        [c]: chosenTreatment[c].map((e) => {
                                          if (e.id === cc.id) {
                                            e.unit = cc.unit - 1;
                                          }
                                          return e;
                                        }),
                                      });
                                    }
                                  }}
                                />
                              </span>
                              <span
                                className="treatment-cost"
                                style={{
                                  display: 'inline-block',
                                  textAlign: 'right',
                                  width: '100px',
                                  opacity: user.type === 'admin' ? '1' : '0',
                                }}
                              >
                                {+cc.tcharge * +cc.unit}
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
                                  top: '1px',
                                }}
                              >
                                x

                              </span>
                            </div>
                          ))
                        }
                        {
                          chosenTreatment[c].length > 0
                          && (
                          <div style={{
                            borderTop: `0.5px solid ${colors.inputback[theme]}`,
                            marginTop: '3px',
                            paddingTop: '3px',
                            opacity: user.type === 'admin' ? '1' : '0',
                          }}
                          >
                            <span style={{
                              display: 'inline-block',
                              fontWeight: 'bold',
                            }}
                            >
                              Total

                            </span>
                            <span
                              style={{
                                fontWeight: 'bold',
                                color: `${theme === 'dark' ? '#70CF9A' : '#06A17B'}`,
                                display: 'inline-block',
                                width: '333.5px',
                                textAlign: 'right',
                              }}
                            >
                              {chosenTreatment[c].reduce((prev, cur) => prev + Number(+cur.tcharge * cur.unit), 0)}
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
                  width={250}
                  dateKey={localDate}
                  setAction={setMed}
                />
                )}
                    </div>
                    <div className="chosen-med">
                      {Object.keys(chosenMed).length > 0
                      && (
                      <div className="label">
                        Medication and Cost
                      </div>
                      )}
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
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '7px',
                        }}
                      >
                        <span
                          className="med-name"
                          style={{
                            display: 'inline-block',
                            width: '140px',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {m.mname}

                        </span>
                        <span
                          className="med-unit"
                          style={{
                            display: 'inline-block',
                            width: '100px',
                          }}
                        >
                          <InputNumber
                            value={m.count}
                            onIncrease={() => {
                              if (m.count + 1 <= calculateMax(m.id, m.count)) {
                                setLocalStock((prev) => prev.map((eee) => {
                                // eslint-disable-next-line no-param-reassign
                                  if (eee.id === m.id) eee.stock -= 1;
                                  return eee;
                                }));
                                setChosenMed({
                                  ...chosenMed,
                                  [e]: chosenMed[e].map((ee) => {
                                    if (ee.id === m.id) {
                                    // eslint-disable-next-line no-param-reassign
                                      ee.count = m.count + 1;
                                    }
                                    return ee;
                                  }),
                                });
                              }
                            }}
                            onDecrease={() => {
                              if (m.count - 1 > 0) {
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
                                setChosenMed({
                                  ...chosenMed,
                                  [e]: chosenMed[e].map((ee) => {
                                    if (ee.id === m.id) {
                                    // eslint-disable-next-line no-param-reassign
                                      ee.count = m.count - 1;
                                    }
                                    return ee;
                                  }),
                                });
                              }
                            }}
                          />

                        </span>
                        <span
                          className="med-cost"
                          style={{
                            display: 'inline-block',
                            width: '100px',
                            textAlign: 'right',
                            opacity: user.type === 'admin' ? '1' : '0',
                          }}
                        >
                          {+m.price * m.count }
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
                            top: '1px',
                          }}
                        >
                          x

                        </span>
                      </div>
                    ))
                      }
                        {
                          chosenMed[e].length > 0
                          && (
                          <div style={{
                            borderTop: `0.5px solid ${colors.inputback[theme]}`,
                            marginTop: '3px',
                            paddingTop: '3px',
                            opacity: user.type === 'admin' ? '1' : '0',
                          }}
                          >
                            <span style={{
                              fontWeight: 'bold',
                              display: 'inline-block',
                            }}
                            >
                              Total

                            </span>
                            <span
                              style={{
                                fontWeight: 'bold',
                                color: `${theme === 'dark' ? '#70CF9A' : '#06A17B'}`,
                                display: 'inline-block',
                                width: '333.5px',
                                textAlign: 'right',
                              }}
                            >
                              {
                               chosenMed[e].reduce((prev, cur) => prev + (Number(cur.price) * Number(cur.count)), 0)
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
                  </div>
                  <div>
                    <div
                      className="label"
                      style={{ marginTop: '30px' }}
                    >
                      Remark
                    </div>
                    <div>
                      <textarea
                        id="remark"
                        style={{
                          backgroundColor: colors.inputback[theme],
                          color: colors.text[theme],
                        }}
                        spellCheck={false}
                        value={form.remark}
                        onChange={(evt) => updateForm('remark', evt.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    id="img-area"
                    style={{
                      width: '100%',
                      marginTop: '5px',
                    }}
                  >
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

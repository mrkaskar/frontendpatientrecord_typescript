import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Loader, Table } from '../../../components';
import DetailModal from './DetailModal';
import { deletePatient, getAllPatient } from '../api/apiFunctions';
import CreateModal from './CreateModal';
import DeleteModal from '../../global/DeleteModal';

function PatientTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const allpatient = useQuery('patients', getAllPatient);
  const [detailid, setDetailid] = React.useState('initial');
  const [data, setData] = React.useState<{headers:string[], body:string[][]}>({
    headers: ['Registration', 'Name', 'Phone', 'Age', 'Address', 'Actions'],
    body: [[]],
  });
  const [chosen, setChosen] = React.useState<
  {
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
  >();
  React.useEffect(() => {
    if (allpatient.data) {
      const patients:string[][] = [];
      allpatient.data.forEach((patient) => {
        patients.push([
          patient.reg,
          patient.name,
          patient.phone,
          patient.age,
          patient.address,
          'actions',
          patient.id,
        ]);
      });
      setData({ ...data, body: patients });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allpatient.data, detailid]);

  React.useEffect(() => {
    if (detailid.length >= 10 && data.body.length > 0 && allpatient.data) {
      const patient = allpatient.data.find((e) => e.id === detailid);
      if (patient) {
        const { treatment } = patient;
        const chosenP = {
          id: patient.id,
          folderId: patient.folderId,
          reg: patient.reg,
          name: patient.name,
          phone: patient.phone,
          age: patient.age,
          address: patient.address,
          total: patient.total,
          date: patient.date,
          // eslint-disable-next-line no-underscore-dangle
          takenTreatment: treatment.map((ee) => ({ id: ee._id, tname: ee.name, cost: +ee.charge })),
          // eslint-disable-next-line max-len
          medicine: patient.medicine.map((ee, index) => ({
          // eslint-disable-next-line no-underscore-dangle
            id: ee._id,
            mname: ee.name,
            munit: patient.medCount[index],
            cost: +ee.price,
            stock: ee.stock,
          })),
          medCount: patient.medCount,
          images: patient.images,
        };
        setChosen(chosenP);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.body, detailid]);

  const queryClient = useQueryClient();

  // eslint-disable-next-line max-len
  const deleteP = useMutation((dataid:{id: string, folderId: string}) => deletePatient(dataid), {
    onSuccess: () => {
      setDeleteModal(false);
    },
  });
  const todelete = ():void => {
    if (chosen) {
      setTimeout(() => {
        setData({ ...data, body: data.body.filter((e) => e[6] !== chosen.id) });
      }, 100);
      setTimeout(() => {
        queryClient.removeQueries('patients');
      }, 100);
      deleteP.mutate({ id: chosen.id, folderId: chosen.folderId });
    }
  };
  return (
    <div>

      {
      detailModal && chosen && (
      <DetailModal
        userdata={chosen}
        setDetailModal={setDetailModal}
      />
      )
    }
      {
      editModal && chosen && (
        <CreateModal
          modal={editModal}
          setModal={setEditModal}
          patientdata={chosen}
        />
      )
    }
      {
        // eslint-disable-next-line no-nested-ternary
        deleteModal && !deleteP.isLoading ? (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            confirm={todelete}
          />
        ) : 1 < 2
          ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 99,
                background: 'black',
                opacity: '0.5',
              }}
            >
              <Loader />
            </div>
          )
          : null
      }
      <div style={{ width: '900px' }}>
        {
      allpatient.isLoading
        ? (
          <div
            style={{
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader />
          </div>
        )
        : (
          <Table
            setDetailModal={setDetailModal}
            setEditModal={setEditModal}
            setDeleteModal={setDeleteModal}
            setDetailid={setDetailid}
            data={data}

          />
        )
    }
      </div>
    </div>
  );
}

export default PatientTable;

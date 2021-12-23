import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Loader, Table } from '../../../components';
import DetailModal from './DetailModal';
import { getAllPatient } from '../api/apiFunctions';

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
    reg: string
    name: string
    phone: string
    age: string
    address: string
    date: string
    takenTreatment: {tname: string, cost: number}[]
    medicine: {mname: string, munit: number, cost: number}[]
    images: string[]
  }
  >();
  const fetched = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (allpatient.data && data.body.length === 1 && !fetched.current) {
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
      fetched.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allpatient.data, detailid]);

  React.useEffect(() => {
    if (detailid.length >= 10 && data.body.length > 0 && allpatient.data) {
      const patient = allpatient.data.find((e) => e.id === detailid);
      if (patient) {
        const chosenP = {
          reg: patient.reg,
          name: patient.name,
          phone: patient.phone,
          age: patient.age,
          address: patient.address,
          date: patient.date,
          takenTreatment: patient.treatment.map((ee) => ({ tname: ee.name, cost: +ee.charge })),
          // eslint-disable-next-line max-len
          medicine: patient.medicine.map((ee, index) => ({ mname: ee.name, munit: patient.medCount[index], cost: +ee.price })),
          images: patient.images,
        };

        setChosen(chosenP);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.body, detailid]);

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
            setDeleteModal={setDetailModal}
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

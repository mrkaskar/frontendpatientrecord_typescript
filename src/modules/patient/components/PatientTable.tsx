import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Loader, Table } from '../../../components';
import DetailModal from './DetailModal';
import { getAllPatient } from '../api/apiFunctions';

function PatientTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editModal, setEditModal] = React.useState(false);
  // const [deleteModal, setDeleteModal] = React.useState(false);
  const allpatient = useQuery('patients', getAllPatient);
  const [detailIndex, setDetailIndex] = React.useState(-1);
  const [data, setData] = React.useState<{headers:string[], body:string[][]}>({
    headers: ['Registration', 'Name', 'Phone', 'Age', 'Address', 'Actions'],
    body: [[]],
  });
  const [chosen, setChosen] = React.useState<
  {
    name: string
    phone: string
    age: string
    address: string
    reg: string
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
        ]);
      });
      setData({ ...data, body: patients });
      fetched.current = true;
    }
  }, [allpatient.data, data, detailIndex]);

  React.useEffect(() => {
    if (detailIndex >= 0) {
      const patient = data.body[detailIndex];
      setChosen(
        {
          name: patient[1],
          phone: patient[2],
          age: patient[3],
          address: patient[4],
          reg: patient[0],
          takenTreatment: [
            { tname: 'Metal brace Orthodontic', cost: 10000 },
            { tname: 'Recementation', cost: 5000 }],
          medicine: [
            { mname: 'Amoxicillin', munit: 3, cost: 3000 },
            { mname: 'Penciclovir', munit: 5, cost: 5000 }],
          images: ['https://somersetdental.com.au/wp-content/uploads/2016/12/Do-I-Need-A-Tooth-Extraction.jpg',
            'https://somersetdental.com.au/wp-content/uploads/2016/12/Do-I-Need-A-Tooth-Extraction.jpg',
          ],
        },

      );
    }
  }, [data.body, detailIndex]);

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
            setDetailIndex={setDetailIndex}
            data={data}

          />
        )
    }
      </div>
    </div>
  );
}

export default PatientTable;

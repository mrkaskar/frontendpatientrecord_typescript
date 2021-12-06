import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { pathToFileURL } from 'url';
import { Loader, Modal, Table } from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import DetailModal from './DetailModal';
import { getAllPatient } from '../api/apiFunctions';

function PatientTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
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

  React.useEffect(() => {
    if (allpatient.data && data.body.length === 1) {
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
    }
  }, [allpatient.data, data, detailIndex]);

  React.useEffect(() => {
    if (detailIndex >= 0) {
      const patient = data.body[detailIndex];
      console.log(`Set chosen index ${detailIndex}`);
      setChosen(
        {
          name: patient[1],
          phone: patient[2],
          age: patient[3],
          address: patient[4],
          reg: patient[5],
          takenTreatment: [
            { tname: 'Acylic teeth', cost: 10000 },
            { tname: 'Cad Cam PFZ', cost: 5000 }],
          medicine: [
            { mname: 'Acylic teeth', munit: 3, cost: 3000 },
            { mname: 'Cad Cam PFZ', munit: 5, cost: 5000 }],
          images: ['https://www.kanelov.com/wp-content/uploads/2019/06/1Print-1-24.jpg',
            'https://thumbs.dreamstime.com/b/amazing-misty-autumn-scenery-lake-sorapis-dolomites-italy-beautiful-mountains-colorful-yellow-larches-shore-193683774.jpg',
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
  );
}

export default PatientTable;

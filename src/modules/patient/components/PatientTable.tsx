import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Modal, Table } from '../../../components';
import { ReactComponent as Userphoto } from '../../../assets/userphoto.svg';
import DetailModal from './DetailModal';
import { getAllPatient } from '../api/apiFunctions';

function PatientTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const allpatient = useQuery('patients', getAllPatient);
  const [chosenUser, setChosenUser] = React.useState({
    name: 'John Doe',
    phone: '092233121',
    age: 21,
    address: 'No.222, Mingalar Road, Yangon',
    reg: '0111212',
    takenTreatment: [
      { tname: 'Acylic teeth', cost: 3000 },
      { tname: 'Cad Cam PFZ', cost: 5000 }],
    medicine: [
      { mname: 'Acylic teeth', munit: 3, cost: 3000 },
      { mname: 'Cad Cam PFZ', munit: 5, cost: 5000 }],
  });
  return (
    <div>
      <h1>Testing</h1>
      {JSON.stringify(allpatient.data)}
      {
      detailModal && (
      <DetailModal
        userdata={chosenUser}
        setDetailModal={setDetailModal}
      />
      )
    }
      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDetailModal}
        data={{
          headers: ['Registration', 'Name', 'Phone', 'Age', 'Address', 'Actions'],
          body: [
            [
              '01001', 'John Doe John Doe John Doe lay', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01002', 'John Doe 2', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01003', 'John Doe 3', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01004', 'John Doe 4', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01005', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01001', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01002', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01003', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01004', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01005', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01001', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01002', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01003', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01004', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01005', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01001', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01002', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01003', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01004', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01005', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01006', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01007', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01008', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '01009', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010010', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
            [
              '010011', 'John Doe', '09998888', '21', 'No,222, Mingalar Street, Yangon', 'actions',
            ],
          ],

        }}
      />

    </div>
  );
}

export default PatientTable;

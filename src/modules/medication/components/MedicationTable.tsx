import React, { ReactElement } from 'react';
import { Table } from '../../../components';
import DetailModal from '../../patient/components/DetailModal';
import { getAllMed } from '../api/apiFunctions';

function MedicationTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [detailIndex, setDetailIndex] = React.useState(0);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [chosenMed, setChosenMed] = React.useState<{
        medcode: string;
        naem: string;
        price: string;
        stock: string;
 }>();
  const [data, setData] = React.useState<{headers:string[], body:string[][]}>({
    headers: ['Medicine Code', 'Medicine Name', 'In Stock', 'Price per unit', 'Actions'],
    body: [[]],
  });
  return (
    <div>
      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDetailModal}
        setDetailIndex={setDetailIndex}
        data={{
          headers: ['Medicine Code', 'Medicine Name', 'In Stock', 'Price per unit', 'Actions'],
          body: [
            ['M025', 'Paracetamol', '5 units', '1000', 'actions'],
            ['M026', 'Some Medicine', '1 unit', '2000', 'actions'],
            ['M027', 'Something', '10 units', '5000', 'actions'],
          ],

        }}
      />

    </div>
  );
}

export default MedicationTable;

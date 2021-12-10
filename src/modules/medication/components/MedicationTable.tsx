import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Table } from '../../../components';
import DetailModal from './DetailModal';
import { getAllMed } from '../api/apiFunctions';

function MedicationTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editModal, setEditModal] = React.useState(false);
  const [detailIndex, setDetailIndex] = React.useState(0);
  // const [deleteModal, setDeleteModal] = React.useState(false);
  const allmed = useQuery('medicine', getAllMed);
  const [chosenMed, setChosenMed] = React.useState<{
        medcode: string;
        name: string;
        price: string;
        stock: string;
 }>();
  const [data, setData] = React.useState<{headers:string[], body:string[][]}>({
    headers: ['Medicine Code', 'Medicine Name', 'Price Per Unit', 'In Stock', 'Actions'],
    body: [[]],
  });

  React.useEffect(() => {
    if (allmed.data && data.body.length === 1) {
      const treatments:string[][] = [];
      allmed.data.forEach((med) => {
        treatments.push([
          med.medcode,
          med.name,
          `${med.price} MMK`,
          med.stock,
          'actions',
        ]);
      });
      setData({ ...data, body: treatments });
    }
  }, [allmed.data, data, detailIndex]);

  React.useEffect(() => {
    if (detailIndex >= 0) {
      const meds = data.body[detailIndex];
      setChosenMed(
        {
          medcode: meds[0],
          name: meds[1],
          price: meds[2],
          stock: meds[2],
        },

      );
    }
  }, [data.body, detailIndex]);

  return (
    <div>
      {
      detailModal && chosenMed && (
      <DetailModal
        med={chosenMed}
        setDetailModal={setDetailModal}
      />
      )
    }

      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDetailModal}
        setDetailIndex={setDetailIndex}
        data={
          data
      }
      />

    </div>
  );
}

export default MedicationTable;

import React, { ReactElement } from 'react';
import { Table } from '../../../components';
import DetailModal from '../../patient/components/DetailModal';

function TreatmentTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [detailIndex, setDetailIndex] = React.useState(0);
  const [chosenTreatment, setChosenTreatment] = React.useState({

  });
  return (
    <div>
      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDetailModal}
        setDetailIndex={setDetailIndex}
        data={{
          headers: ['Treatment Code', 'Treatment Name', 'Charge Amount', 'Actions'],
          body: [
            ['T025', 'Metal brace Orthodontic Treatment Metal brace Orthodontic Treatment', '150000', 'actions'],
            ['T026', 'Recementation', '30000', 'actions'],
            ['T027', 'Periapical X Ray', '50000', 'actions'],
          ],

        }}
      />

    </div>
  );
}

export default TreatmentTable;

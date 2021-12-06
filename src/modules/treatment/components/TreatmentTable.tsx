import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Table } from '../../../components';
import { getAllTreatment } from '../api/apiFunctions';
import DetailModal from './DetailModal';

function TreatmentTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [detailIndex, setDetailIndex] = React.useState(0);
  const alltreatment = useQuery('treatment', getAllTreatment);
  const [chosenTreatment, setChosenTreatment] = React.useState<
  {
    trecode: string;
    name: string;
    charge: string;
  }>();

  const [data, setData] = React.useState<{headers:string[], body:string[][]}>({
    headers: ['Treatment Code', 'Treatment Name', 'Charge Amount', 'Actions'],
    body: [[]],
  });

  React.useEffect(() => {
    if (alltreatment.data && data.body.length === 1) {
      const treatments:string[][] = [];
      alltreatment.data.forEach((treatment) => {
        treatments.push([
          treatment.trecode,
          treatment.name,
          treatment.charge,
          'actions',
        ]);
      });
      setData({ ...data, body: treatments });
    }
  }, [alltreatment.data, data, detailIndex]);

  React.useEffect(() => {
    if (detailIndex >= 0) {
      const treatment = data.body[detailIndex];
      console.log(`Set chosen index ${detailIndex}`);
      setChosenTreatment(
        {
          trecode: treatment[1],
          name: treatment[2],
          charge: treatment[3],
        },

      );
    }
  }, [data.body, detailIndex]);

  return (
    <div>
      {
      detailModal && chosenTreatment && (
      <DetailModal
        treatmentdata={chosenTreatment}
        setDetailModal={setDetailModal}
      />
      )
    }
      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDetailModal}
        setDetailIndex={setDetailIndex}
        data={data}
      />

    </div>
  );
}

export default TreatmentTable;

import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Loader, Table } from '../../../components';
import DeleteModal from '../../global/DeleteModal';
import { getAllTreatment, deleteTreatment } from '../api/apiFunctions';
import CreateModal from './CreateModal';
import DetailModal from './DetailModal';

function TreatmentTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [detailid, setDetailid] = React.useState('initial');
  const alltreatment = useQuery('treatment', getAllTreatment);
  const [chosenTreatment, setChosenTreatment] = React.useState<
  {
    trecode: string;
    name: string;
    charge: string;
    id: string;
  }>();

  const [data, setData] = React.useState<{headers:string[], body:string[][]}>({
    headers: ['Treatment Code', 'Treatment Name', 'Charge Amount', 'Actions'],
    body: [],
  });

  const deleteTreat = useMutation((id:{id: string}) => deleteTreatment(id), {
    onSuccess: () => {
      setDeleteModal(false);
    },
  });

  React.useEffect(() => {
    if (alltreatment.data) {
      const treatments:string[][] = [];
      alltreatment.data.forEach((treatment) => {
        treatments.push([
          treatment.trecode,
          treatment.name,
          `${treatment.charge} MMK`,
          'actions',
          treatment.id,
        ]);
      });
      setData({ ...data, body: treatments });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alltreatment.data, detailid]);

  React.useEffect(() => {
    if (detailid.length >= 10 && data.body.length > 0) {
      const treatment = data.body.find((e) => e[4] === detailid);
      if (treatment) {
        setChosenTreatment(
          {
            trecode: treatment[0],
            name: treatment[1],
            charge: treatment[2],
            id: treatment[4],
          },

        );
      }
    }
  }, [data.body, detailid]);

  const queryClient = useQueryClient();

  const todelete = ():void => {
    if (chosenTreatment) {
      setTimeout(() => {
        setData({ ...data, body: data.body.filter((e) => e[4] !== chosenTreatment.id) });
      }, 100);
      setTimeout(() => {
        queryClient.removeQueries('treatment');
      }, 100);
      deleteTreat.mutate({ id: chosenTreatment.id });
    }
  };
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
      {
      editModal && chosenTreatment && (
        <CreateModal
          modal={editModal}
          setModal={setEditModal}
          treatmentdata={chosenTreatment}
        />
      )
      }

      {
        deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            confirm={todelete}
          />
        )
      }
      <div style={{ width: '900px' }}>
        {
      alltreatment.isLoading
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

export default TreatmentTable;

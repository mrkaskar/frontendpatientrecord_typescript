import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Loader, Table } from '../../../components';
import DetailModal from './DetailModal';
import { deleteMedicine, getAllMed } from '../api/apiFunctions';
import CreateModal from './CreateModal';
import DeleteModal from '../../global/DeleteModal';

function MedicationTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [detailid, setDetailid] = React.useState('initial');
  const allmed = useQuery('medicine', getAllMed);
  const [chosenMed, setChosenMed] = React.useState<{
        medcode: string;
        name: string;
        price: string;
        stock: string;
        id: string;
 }>();
  const [data, setData] = React.useState<{headers:string[], body:string[][]}>({
    headers: ['Medicine Code', 'Medicine Name', 'Price Per Unit', 'In Stock', 'Actions'],
    body: [],
  });

  const deleteMed = useMutation((id: {id: string}) => deleteMedicine(id), {
    onSuccess: () => {
      setDeleteModal(false);
    },
  });

  React.useEffect(() => {
    if (allmed.data) {
      const treatments:string[][] = [];
      allmed.data.forEach((med) => {
        treatments.push([
          med.medcode,
          med.name,
          `${med.price} MMK`,
          med.stock,
          'actions',
          med.id,
        ]);
      });
      setData({ ...data, body: treatments });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allmed.data, detailid]);

  React.useEffect(() => {
    if (detailid.length >= 10 && data.body.length > 0) {
      const meds = data.body.find((e) => e[5] === detailid);
      if (meds) {
        setChosenMed(
          {
            medcode: meds[0],
            name: meds[1],
            price: meds[2],
            stock: meds[3],
            id: meds[5],
          },

        );
      }
    }
  }, [data.body, detailid]);

  const queryClient = useQueryClient();
  const todelete = ():void => {
    if (chosenMed) {
      setTimeout(() => {
        setData({ ...data, body: data.body.filter((e) => e[5] !== chosenMed.id) });
      }, 100);
      setTimeout(() => {
        queryClient.removeQueries('medicine');
      }, 100);
      deleteMed.mutate({ id: chosenMed.id });
    }
  };
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
      {
      editModal && chosenMed && (
        <CreateModal
          modal={editModal}
          setModal={setEditModal}
          meddata={chosenMed}
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
        ) : deleteP.isLoading
          ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '200px',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 99,
                background: 'black',
                opacity: '0.8',
              }}
            >
              <Loader />
              <br />
              <span
                style={{
                  color: 'white',
                  opacity: '1',
                }}
              >
                Deleting Data

              </span>
            </div>
          )
          : null
      }

      <div style={{ width: '900px' }}>
        {
          allmed.isLoading
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
                data={
          data
      }
              />
            )
        }

      </div>

    </div>
  );
}

export default MedicationTable;

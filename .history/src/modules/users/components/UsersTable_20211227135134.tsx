/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Loader, Table } from '../../../components';
import DeleteModal from '../../global/DeleteModal';
import { deleteUser, getAllUsers } from '../api/apiFunctions';
import CreateModal from './CreateModal';
import DetailModal from './DetailModal';

function UsersTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [detailid, setDetailid] = React.useState('initial');
  const [chosenUser, setChosenUser] = React.useState<{
    email: string;
    name: string;
    type: string;
    id: string;
  }>();
  const [data, setData] = React.useState<{headers:string[], body:string[][]}>({
    headers: ['Email', 'Username', 'Type', 'Actions'],
    body: [],
  });
  const allusers = useQuery('users', getAllUsers);

  React.useEffect(() => {
    if (allusers.data) {
      const users: string[][] = [];
      allusers.data.forEach((user) => {
        users.push([
          user.email,
          user.name,
          user.type,
          'actions',
          user.id,
        ]);
      });
      setData({ ...data, body: users });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allusers.data, detailid]);

  React.useEffect(() => {
    if (detailid.length >= 10 && data.body.length > 0) {
      const user = data.body.find((e) => e[4] === detailid);
      if (user) {
        setChosenUser(
          {
            email: user[0],
            name: user[1],
            type: user[2],
            id: user[4],
          },

        );
      }
    }
  }, [data.body, detailid]);

  const deleteU = useMutation((id:{id: string}) => deleteUser(id), {
    onSuccess: () => {
      setDeleteModal(false);
    },
  });

  const queryClient = useQueryClient();
  const todelete = ():void => {
    if (chosenUser) {
      setTimeout(() => {
        setData({ ...data, body: data.body.filter((e) => e[4] !== deleteUser.id) });
      }, 100);
      setTimeout(() => {
        queryClient.removeQueries('treatment');
      }, 100);
      deleteU.mutate({ id: chosenUser.id });
    }
  };
  return (
    <div>
      {
      detailModal && chosenUser && (
      <DetailModal
        userdata={chosenUser}
        setDetailModal={setDetailModal}
      />
      )
    }
      {
      editModal && chosenUser && (
        <CreateModal
          modal={editModal}
          setModal={setEditModal}
          userdata={chosenUser}
        />
      )
      }

      {
        // eslint-disable-next-line no-nested-ternary
        deleteModal && !deleteU.isLoading ? (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            confirm={todelete}
          />
        ) : deleteU.isLoading
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
      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
        setDetailid={setDetailid}
        data={data}
      />

    </div>
  );
}

export default UsersTable;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Table } from '../../../components';
import { getAllUsers } from '../api/apiFunctions';
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

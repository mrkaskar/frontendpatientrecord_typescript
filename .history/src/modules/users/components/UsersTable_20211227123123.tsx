/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Table } from '../../../components';
import { getAllUsers } from '../api/apiFunctions';

function UsersTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [detailid, setDetailid] = React.useState('initial');
  const [chosenTreatment, setChosenTreatment] = React.useState<{
    email: string;
    name: string;
    type: string;
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
        ]);
      });
      setData({ ...data, body: users });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allusers.data, detailid]);
  return (
    <div>
      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDetailModal}
        setDetailid={setDetailid}
        data={data}
      />

    </div>
  );
}

export default UsersTable;

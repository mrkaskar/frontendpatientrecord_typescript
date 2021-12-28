/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Table } from '../../../components';
import { getAllUsers } from '../api/apiFunctions';
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

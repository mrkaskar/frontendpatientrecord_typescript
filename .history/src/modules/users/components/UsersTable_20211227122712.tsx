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
  const allusers = useQuery('users', getAllUsers);
  return (
    <div>
      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDetailModal}
        setDetailid={setDetailid}
        data={{
          headers: ['Email', 'Username', 'Type', 'Actions'],
          body: [
            ['kaskar@gmail.com', 'kaskar', 'admin', 'actions'],
            ['kaskar@gmail.com', 'kaskar', 'casher', 'actions'],
            ['kaskar@gmail.com', 'kaskar', 'casher', 'actions'],
            ['kaskar@gmail.com', 'kaskar', 'admin', 'actions'],
          ],

        }}
      />

    </div>
  );
}

export default UsersTable;

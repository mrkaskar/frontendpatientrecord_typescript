import React, { ReactElement } from 'react';
import { Table } from '../../../components';
import DetailModal from '../../patient/components/DetailModal';

function UsersTable():ReactElement {
  const [detailModal, setDetailModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [chosenTreatment, setChosenTreatment] = React.useState({

  });
  return (
    <div>
      <Table
        setDetailModal={setDetailModal}
        setEditModal={setEditModal}
        setDeleteModal={setDetailModal}
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

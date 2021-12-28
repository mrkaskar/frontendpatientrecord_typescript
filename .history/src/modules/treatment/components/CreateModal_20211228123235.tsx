import React, { ReactElement } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button, Loader, Modal,
} from '../../../components';
import { ReactComponent as Save } from '../../../assets/save.svg';
import Textbox from '../../../components/textbox';
import useForm from '../../../hooks/useForm';
import { updateTreatment, createTreatment, ITreatment } from '../api/apiFunctions';

interface ICreateModal {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  treatmentdata?: ITreatment
}
function CreateModal({ modal, setModal, treatmentdata }:ICreateModal):ReactElement {
  const treat = {
    trecode: '', name: '', charge: '', id: '',
  };
  const [form, updateForm, setForm] = useForm<ITreatment>(treat);
  const [valid, setValid] = React.useState(false);

  const queryClient = useQueryClient();

  const saveTreat = useMutation((data:ITreatment) => createTreatment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('treatment');
      setModal(false);
    },
  });

  const updateTreat = useMutation((data:ITreatment) => updateTreatment(data), {
    onSuccess: () => {
      queryClient.refetchQueries('treatment');
      setModal(false);
    },
  });

  React.useLayoutEffect(() => {
    if (treatmentdata) {
      setForm({
        trecode: treatmentdata.trecode,
        name: treatmentdata.name,
        charge: treatmentdata.charge.split(' ')[0],
        id: treatmentdata.id,
      });
    }
  }, [treatmentdata]);

  React.useEffect(() => {
    if (form.trecode && form.name && form.charge) {
      setValid(true);
    }
  }, [form]);
  return (
    <div>
      {
      modal
      && (
      <Modal
        width={700}
        header={treatmentdata?.trecode ? 'Edit Treatment' : 'Create Treatment'}
        closeModal={() => { setModal(false); }}
      >
        <div id="create-treament-body">
          {
      saveTreat.isLoading || updateTreat.isLoading
        ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '100px',
          }}
          >
            <Loader />
          </div>
        )
        : (
          <div>
            <div>
              <Textbox
                label="Treatment Name"
                width={550}
                onInput={(text: string) => { updateForm('name', text); }}
                value={form.name}
              />
              <div
                style={{
                  height: '10px',
                }}
              />
              <Textbox
                label="Treatment Cost"
                width={80}
                onInput={(text: string) => { updateForm('charge', text); }}
                value={form.charge.split(' ')[0]}
              />
              <div
                style={{
                  height: '10px',
                }}
              />
              <Textbox
                label="Treatment Code"
                width={120}
                onInput={(text: string) => { updateForm('trecode', text); }}
                value={form.trecode}
              />
            </div>
            <div
              style={{
                marginTop: '30px',
              }}
            >
              <Button
                onClick={() => {
                  if (valid) {
                    if (
                      treatmentdata?.trecode
                    ) { updateTreat.mutate(form); } else { saveTreat.mutate(form); }
                  }
                }}
                Icon={Save}
                color1={valid ? '#53BB85' : '#757575'}
                color2={valid ? '#53BB85' : '#969696'}
                label="Save"
              />
            </div>
          </div>
        )
        }
        </div>
      </Modal>
      )
    }
    </div>
  );
}

CreateModal.defaultProps = {
  treatmentdata: {
    trecode: '',
    name: '',
    charge: '',
    id: '',
  },
};
export default CreateModal;

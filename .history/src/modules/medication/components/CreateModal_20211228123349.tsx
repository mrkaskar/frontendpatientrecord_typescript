import React, { ReactElement } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button, Loader, Modal,
} from '../../../components';
import { ReactComponent as Save } from '../../../assets/save.svg';
import Textbox from '../../../components/textbox';
import { createMed, IMed, updateMed } from '../api/apiFunctions';
import useForm from '../../../hooks/useForm';

interface ICreateModal {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  meddata?: IMed
}
function CreateModal({ modal, setModal, meddata }:ICreateModal):ReactElement {
  const med = {
    id: '', medcode: '', name: '', price: '', stock: '',
  };
  const [form, updateForm, setForm] = useForm<IMed>(med);
  const [valid, setValid] = React.useState(false);

  const queryClient = useQueryClient();

  const saveMed = useMutation((data:IMed) => createMed(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('medicine');
      setModal(false);
    },
  });

  const updateMedicine = useMutation((data:IMed) => updateMed(data), {
    onSuccess: () => {
      queryClient.refetchQueries('medicine');
      setModal(false);
    },
  });
  React.useLayoutEffect(() => {
    if (meddata) {
      setForm({
        id: meddata.id,
        medcode: meddata.medcode,
        name: meddata.name,
        price: meddata.price.split(' ')[0],
        stock: meddata.stock,
      });
    }
  }, [meddata]);

  React.useEffect(() => {
    if (form.medcode && form.name && form.price && form.stock) {
      if (+form.stock > 0
      && +form.price > 0) { setValid(true); }
    }
  }, [form]);
  return (
    <div>
      {
      modal
      && (
      <Modal
        width={700}
        header="Create Treatment"
        closeModal={() => { setModal(false); }}
      >
        <div id="create-medicine-body">
          {
          saveMed.isLoading || updateMedicine.isLoading
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
                    label="Medicine Name"
                    width={550}
                    onInput={(text:string) => { updateForm('name', text); }}
                    value={form.name}
                  />
                  <div
                    style={{
                      height: '10px',
                    }}
                  />
                  <Textbox
                    label="In Stock"
                    width={80}
                    onInput={(text:string) => { updateForm('stock', text); }}
                    value={form.stock}
                  />
                  <div
                    style={{
                      height: '10px',
                    }}
                  />
                  <Textbox
                    label="Price per unit"
                    width={120}
                    onInput={(text:string) => { updateForm('price', text); }}
                    value={form.price.split(' ')[0]}
                  />
                  <div
                    style={{
                      height: '10px',
                    }}
                  />
                  <Textbox
                    label="Medicine Code"
                    width={120}
                    onInput={(text:string) => { updateForm('medcode', text); }}
                    value={form.medcode}
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
                        if (meddata?.medcode || meddata?.name) {
                          updateMedicine.mutate(form);
                        } else {
                          saveMed.mutate(form);
                        }
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
  meddata: {
    id: '',
    medcode: '',
    name: '',
    price: '',
    stock: '',
  },
};

export default CreateModal;

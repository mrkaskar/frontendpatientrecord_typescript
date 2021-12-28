import React, { ReactElement } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button, Modal,
} from '../../../components';
import { ReactComponent as Save } from '../../../assets/save.svg';
import colors from '../../../components/global/themes/colors';
import { ThemeContext } from '../../../components/global/context/ThemeProvider';
import Textbox from '../../../components/textbox';
import { createUser, IUser } from '../api/apiFunctions';
import useForm from '../../../hooks/useForm';

interface ICreateModal {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  userdata?: IUser
}
function CreateModal({ modal, setModal, userdata }:ICreateModal):ReactElement {
  const { theme } = React.useContext(ThemeContext);
  const [user, setUser] = React.useState({
    email: '',
    name: '',
    type: 'admin',
  });
  const [form, updateForm] = useForm<IUser>(user);
  const [valid, setValid] = React.useState(false);

  const queryClient = useQueryClient();
  const saveUser = useMutation((data: IUser) => createUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setModal(false);
    },
  });

  React.useEffect(() => {
    if (form.email && form.name && form.type) {
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
        header="Create Treatment"
        closeModal={() => { setModal(false); }}
      >
        <div id="create-user-body">
          {
          saveUser.isLoading
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
                    label="User Email"
                    width={300}
                    onInput={(text: string) => { updateForm('email', text); }}
                    value={form.email}
                  />
                  <div
                    style={{
                      height: '10px',
                    }}
                  />
                  <Textbox
                    label="User Name"
                    width={300}
                    onInput={(text: string) => { updateForm('name', text); }}
                    value={form.name}
                  />
                  <div
                    style={{
                      height: '10px',
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: '10px',
                  }}
                />
                <select
                  style={{
                    backgroundColor: colors.inputback[theme],
                    color: colors.text[theme],
                  }}
                  onSelect={(e) => updateForm('type', (e.target as HTMLInputElement).value)}
                >
                  <option value="admin" selected={form.type === 'admin'}>Admin</option>
                  <option value="casher" selected={form.type === 'casher'}>Casher</option>
                </select>
                <div
                  style={{
                    marginTop: '30px',
                  }}
                >
                  <Button
                    onClick={() => {
                      saveUser.mutate(form);
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
  userdata: {
    email: '',
    name: '',
    type: '',
  },
};

export default CreateModal;

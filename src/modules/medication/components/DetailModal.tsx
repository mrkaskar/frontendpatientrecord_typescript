import React, { ReactElement } from 'react';
import { Modal } from '../../../components';
import { UserContext } from '../../../components/global/context/UserProvider';

interface IDetailModal {
  setDetailModal: React.Dispatch<React.SetStateAction<boolean>>
  med : {
    medcode: string;
    name: string;
    price: string;
    stock: string;
  }
}

function DetailModal({ setDetailModal, med }: IDetailModal):ReactElement {
  const { user } = React.useContext(UserContext);
  const {
    medcode, name, price, stock,
  } = med;

  return (
    <div>
      <Modal
        width={1100}
        header="Treatment Detail"
        closeModal={() => setDetailModal(false)}
      >
        <div>
          <div
            id="detail-treatment-body"
            style={{
              paddingLeft: '100px',
            }}
          >
            <h4 style={{
              textDecoration: 'underline',
            }}
            >
              Medicine Code

            </h4>
            <p>{medcode}</p>
            <h4 style={{
              textDecoration: 'underline',
            }}
            >
              Medicine Name
            </h4>
            <p>{name}</p>
            {
              user.type === 'admin'
              && (
              <>
                <h4 style={{
                  textDecoration: 'underline',
                }}
                >
                  Medicine Price
                </h4>
                <p>{price}</p>
              </>
              )
            }

            <h4 style={{
              textDecoration: 'underline',
            }}
            >
              Medicine In Stock
            </h4>
            <p>{stock}</p>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;

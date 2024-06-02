import { FC, ReactNode } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    color: '#000',
  },
};

type MyModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export const MyModal: FC<MyModalProps> = ({
  modalIsOpen,
  closeModal,
  children,
}) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={modalStyles}
  >
    {children}
    <button onClick={closeModal}>close</button>
  </Modal>
);
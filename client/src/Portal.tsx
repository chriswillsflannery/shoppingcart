import { useState } from 'react';
import { MyModal} from './MyModal';
import './Portal.css';

export const Portal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <main className="portal">
      <MyModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      >
        modalContent
      </MyModal>
    </main>
  )
}
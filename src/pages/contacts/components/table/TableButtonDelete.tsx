import React, { useState } from "react";
import { Modal } from "antd"; 
import FeatherIcon from "feather-icons-react";

import { Button } from "../../../../components/buttons/buttons";

interface ITableButtonDeleteProps {
  contactId: string;
  handleDeleteFunction: (contactId: string) => Promise<void>;
}

export function TableButtonDelete({ contactId, handleDeleteFunction }: ITableButtonDeleteProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  async function handleDelete() {
    setIsLoading(true);
    await handleDeleteFunction(contactId);
    handleCloseModal();
    setIsLoading(false);
  }

  return (
    <>
      <Button 
        className="btn-icon" 
        type="danger" 
        shape="circle" 
        onClick={handleOpenModal}
      >
        <FeatherIcon icon="trash-2" size={16} />
      </Button>

      <Modal
        title="Deletar"
        visible={modalIsOpen}
        onOk={handleDelete}
        onCancel={handleCloseModal}
        okText="Confirmar"
        okType="danger"
        confirmLoading={isLoading}
      >
        <p>Deseja mesmo deletar esse contato?</p>
      </Modal>
    </>
  );
}

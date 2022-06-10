import React, { useState } from "react";
// import { Modal } from "antd"; 
import FeatherIcon from "feather-icons-react";

import { Button } from "../../../../components/buttons/buttons";
import { Modal } from "antd";
import { Form } from "../ContactForm";
import { useFetch } from "../../../../hooks/useFetch";

interface ITableButtonEditProps {
  contactId: string;
  refetch: () => void;
  data: IFetchProps;
}

interface IFetchProps {
  email: string;
  name: string;
  segmentId: number;
}

export function TableButtonEdit({ contactId, refetch, data }: ITableButtonEditProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Button 
        className="btn-icon" 
        type="info" 
        onClick={() => setModalIsOpen(true)} 
        to="#" 
        shape="circle"
        >
        <FeatherIcon icon="edit" size={16} />
      </Button>

      <Modal
        title="Editar contato"
        visible={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        confirmLoading={true}
        footer={null}
        maskClosable={false}
        width={600}
        style={{marginTop: -60}}
        bodyStyle={{padding: 0}}
      > 
        <Form 
          formType="put"
          contactId={contactId}
          initialFields={{
            name: data.name,
            email: data.email,
            segmentId: String(data.segmentId),
            tag: String(data.segmentId)
          }}
          setModalIsOpen={setModalIsOpen} 
          refetch={refetch} 
        />
      </Modal>
    </>
  );
}
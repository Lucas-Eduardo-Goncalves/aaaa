import React, { useRef, useState } from "react";

import { Button, Input, Form as AntdForm } from "antd";
import { CardWrapper, FormWrapper } from "../styles";
import { api } from "../../../services/api";
import { Select } from "../../../components/Select";
import { UploadComponent } from "../../../components/UploadComponent";
import { IHandleSubmitProps } from "../types";
import { UploadFile } from "antd/lib/upload/interface";
import toast from "react-hot-toast";
import { MultiSelect } from "../../../components/MultiSelect";

interface IFormInitialFields {
  name: string;
  email: string;
  segmentId: string; 
  tag: string;
}

interface IFormComponent {
  formType: "put" | "post",
  initialFields?: IFormInitialFields;
  refetch: () => void;
  contactId?: string;
  setModalIsOpen: (event: boolean) => void;
}

export function Form({ 
  formType,
  setModalIsOpen, 
  refetch, 
  contactId,
  initialFields = { email: "", name: "", segmentId: "", tag: "" } 
}: IFormComponent) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([] as UploadFile[])

  const formRef = useRef<any>(null);

  function clearFieldsAndCloseModal() {
    setModalIsOpen(false);
  }

  async function handleSubmit(data: IHandleSubmitProps) {
    setIsLoading(true);

    if(fileList.length <= 0) {
      toast.error("É necessário indexar um arquivo");
      setIsLoading(false);
      return;
    }

    const formData = {
      ...data,
      url: fileList[0].response.filename,
    }

    try {
      if(formType === "post") {
        await api.post("/contacts", formData);
      } else {
        if(contactId) await api.put(`/contacts/${contactId}`, formData);
      }

      setModalIsOpen(false);

      formRef.current.resetFields()
      setFileList([]);
    } catch(err) {
      console.log(err)
    }
    
    setIsLoading(false);
    refetch();
  }

  return (
    <FormWrapper>
      <AntdForm 
        name="basic" 
        onFinish={handleSubmit} 
        style={{ padding: "30px" }}
        layout="vertical"
        initialValues={initialFields}
        ref={formRef}
      >
        <CardWrapper type="inner" title="Informações Gerais">
          <AntdForm.Item 
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Nome obrigatório" }]}
          >
            <Input placeholder="Nome Completo" />
          </AntdForm.Item>

          <AntdForm.Item 
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "E-mail obrigatório" }]}
          >
            <Input placeholder="seuemail@gmai.com" />
          </AntdForm.Item>

          <Select
            name="segmentId"
            title="Selecione um segmento"
            postUrl="segments"
            fetchUrl="segments"
          />

          <Select
            name="tag"
            title="Selecione uma tag"
            postUrl="segments"
            fetchUrl="segments"
          />

          <MultiSelect
            name="multi"
            title="Selecione varias tags"
            postUrl="segments"
            fetchUrl="segments"
          />

          <UploadComponent
            maxCount={1}
            fileList={fileList}
            setFileList={setFileList}
          />
        </CardWrapper>
        
        <footer style={{ padding: "20px 30px", borderTop: "1px solid #f0f0f0" }}>
          <Button type="default" htmlType="button" onClick={clearFieldsAndCloseModal}>
            Voltar
          </Button>

          <Button type="primary" htmlType="submit"  loading={isLoading}>
            Salvar
          </Button>
        </footer>
      </AntdForm>
    </FormWrapper>
  );
}

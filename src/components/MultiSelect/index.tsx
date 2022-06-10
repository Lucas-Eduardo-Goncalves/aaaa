import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Select, Form as AntdForm, Input, Button, Modal, SelectProps } from "antd";

import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import { ISelectSegmentoComponent, IFetchProps } from "./types";

export function MultiSelect({ 
  title, 
  postUrl = "", 
  fetchUrl,
  name,
}: ISelectSegmentoComponent) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataInputModal, setDataInputModal] = useState("");

  const { dataFetch, refetch, setSearch } = useFetch<IFetchProps[]>({ baseUrl: fetchUrl });
  const [options, setOptions] = useState<{label: string; value: string}[]>([]);

  async function handleNewSelect() {
    if(!dataInputModal) {
      toast.error("O campo não pode estar em branco");
      return;
    }

    await api.post(postUrl, { name: dataInputModal });

    setModalIsOpen(false);
    refetch()
  }

  useEffect(() => {
    const res = dataFetch?.map(item => {
      return {
        label: String(item.name),
        value: String(item.id),
      }
    })

    if(res) setOptions(res);
  }, [dataFetch])


  let timer: NodeJS.Timeout;
  function debounce(event: string) {
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      setSearch(event);
    }, 1000)
  }


  const selectProps: SelectProps = {
    mode: "multiple",
    options,
    showSearch: true,
    filterOption: false,
    onSearch: e => debounce(e),
    onChange: (newValue) => {
      console.log(newValue)
    },
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <AntdForm.Item 
          label={title} 
          name={name}
          style={{ width: "100%" }}
          rules={[{ required: true, message: `Select de ${name} obrigatório` }]}
        >
          <Select  {...selectProps} />
        </AntdForm.Item>
        
        {postUrl && (
          <Button 
            onClick={() => setModalIsOpen(true)}
            style={{ marginTop: "2.20rem", height: "2.3rem" }}
          >
            +
          </Button>
        )}
      </div>

      <Modal
        title="Adicionar item ao select"
        visible={!postUrl ? false : modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        footer={null}
        maskClosable={false}
        width={500}
      >
        <AntdForm.Item label="Nome do item">
          <Input
            placeholder="nome"
            value={dataInputModal}
            onChange={e => setDataInputModal(e.target.value)}
          />
        </AntdForm.Item>

        <Button onClick={handleNewSelect}>Adicionar</Button>
      </Modal>
    </>
  );
}

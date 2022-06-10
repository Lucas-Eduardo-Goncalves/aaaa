import React, { useState } from "react";
import { Table as AntdTable } from "antd";
import toast from "react-hot-toast";

import { IContactProps, IFetchPropsContacts } from "../../types";
import { api } from "../../../../services/api";
import { TableColumnController } from "./tableColumnController";
import { TableRowSelection } from "antd/lib/table/interface";

interface ITableComponentProps {
  dataFetch?: IFetchPropsContacts;
  isLoading: boolean;
  refetch: () => void;
  currentPage: number;
  itensPerPage: number;
  setCurrentPage: (event: number) => void;
  setColumnOrdenation: (event: string) => void;
  setItensPerPage: (event: number) => void;
  totalItens: number;
}

export function TableComponent({ 
  refetch, 
  dataFetch, 
  totalItens,
  isLoading, 
  itensPerPage, 
  currentPage,
  setCurrentPage,
  setColumnOrdenation,
  setItensPerPage
}: ITableComponentProps) {
  const pageSizeOptions = ["10", "20", "30"]

  const [selectDataKeys, setSelectDataKeys] = useState<any>({ keys: [], data: []})

  const rowSelection: TableRowSelection<IContactProps> = {
    selectedRowKeys: selectDataKeys.keys,
    onChange: (keys, data) => {
      setSelectDataKeys({ keys: keys as string[], data })
    },
    selections: [
      {
        key: 'odd',
        text: 'Apagar Selecionados',
        onSelect: () => {
          console.log(selectDataKeys)
        },
      },
    ]
  };

  function onChange(pagination: any, filters: any, sorter: any) {
    setCurrentPage(pagination.current);
    setItensPerPage(pagination.pageSize);

    if (sorter.order === "descend") {
      setColumnOrdenation(`${sorter.field}:DESC`)
    } else if (sorter.order === "ascend") {
      setColumnOrdenation(`${sorter.field}:ASC`)
    } else {
      setColumnOrdenation(``)
    }
  }

  async function handleDeleteFunction(contactId: string) {
    try {
      await api.delete(`/contacts/${contactId}`);
      toast.success("Deletado com sucesso");
    } catch(err) {
      toast.error("Não foi possivel deletar");
      console.log(err)
    }
    refetch();
  }

  const { columns, data } = TableColumnController({ 
    handleDeleteFunction, 
    refetch, 
    dataList: dataFetch 
  });

  return (
    <AntdTable
      loading={isLoading}
      showSorterTooltip={false}
      rowSelection={rowSelection}
      onChange={onChange}
      dataSource={data}
      columns={columns}
      pagination={{ 
        current: currentPage, 
        pageSize: itensPerPage, 
        pageSizeOptions,
        total: totalItens,
        showSizeChanger: true
      }}
    />
  );
}

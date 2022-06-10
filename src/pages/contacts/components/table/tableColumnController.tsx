import React from "react";
import moment from "moment";
import { ColumnsType } from "antd/lib/table";

import { IContactProps } from "../../types";
import { TableButtonDelete } from "./TableButtonDelete";
import { TableButtonEdit } from "./TableButtonEdit";

interface ITableColumnControllerProps {
  handleDeleteFunction: (contactId: string) => Promise<void>;
  refetch: () => void;
  dataList?: IContactProps[];
}

export function TableColumnController({ 
  handleDeleteFunction, 
  refetch, 
  dataList 
}: ITableColumnControllerProps) {
  
  const columns: ColumnsType<IContactProps> = [
    {
      title: "Nome",
      dataIndex: "name",
      sorter: true,
    },

    {
      title: "E-mail",
      dataIndex: "email",
      sorter: true,
    },

    {
      title: "Data de criação",
      dataIndex: "createdAt",
      sorter: true,
    },

    {
      title: "Ações",
      dataIndex: "actions",
      render:  (_, item) => {
        return (
          <div className="table-actions">
            <TableButtonEdit 
              contactId={String(item.id)} 
              refetch={refetch}
              data={item}
            />
  
            <TableButtonDelete 
              handleDeleteFunction={handleDeleteFunction} 
              contactId={String(item.id)} 
            />
          </div>
        )
      }
    },
  ];

  const data: any[] = [];

  dataList?.forEach((item) => {
    data.push({
      key: item.id,
      id: item.id,
      name: item.name,
      email: item.email,
      createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
    })
  })
  
  return { columns, data }
}

import React, { useState, useEffect } from 'react';
import { notification, Tag } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table/interface';
import moment from 'moment';
import 'moment/locale/pt-br';
import * as api from '../integration';
import { IRowData, IParams, ISelectedData, IPaginationResult, IFormData, IFilters, IDependences } from '../types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useModal } from '../../../../hooks/useModal';
import { defaultColumnProps, defaultFilters, defaultPaginationParams } from '../empty-data';
import { Button } from '../../../../components/buttons/buttons';

const MaxWidthColumn: React.FC<{ width: number }> = ({ width, children }) => (
  <div style={{ maxWidth: width, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{children}</div>
);

export const useTable = () => {
  const [data, setData] = useState<IRowData[]>([]);
  const [selectedData, setSelectedData] = useState<ISelectedData>({ keys: [], data: [] });
  const { path } = useRouteMatch();
  const [dependences, setDependences] = useState<IDependences>({ cidades: [], escolagraus: [], escolaesferas: [] });

  const [updateTable, setUpdateTable] = useState(false);
  const forceUpdate = () => setUpdateTable(prev => !prev);

  const filtersModal = useModal();
  const confirmDeleteModal = useModal<ISelectedData>();
  const confirmDeleteOneModal = useModal<IRowData>();
  const confirmRestoreOneModal = useModal<IRowData>();
  const newDataModal = useModal();
  const dataToEditModal = useModal<IRowData>();

  const [listLoading, setListLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(false);
  const [statusSelected, setStatusSelected] = useState('Ativos');
  
  const [params, setParams] = useState<IParams>({
    pagination: {
      ...defaultPaginationParams,
    },
    sort: {
      field: '',
      order: 'descend',
    },
    filters: {
      ...defaultFilters,
    },
  });

  const filterKey = ['Ativos', 'Inativos'];

  const [paginationResult, setPaginationResult] = useState<IPaginationResult>({
    total: 0,
  });

  
  const handleChangeForFilter = (e: any) => {
    setStatusSelected(e.target.value);

  };

  const columns: ColumnsType<IRowData> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      render: (_, row: IRowData) => <MaxWidthColumn width={180}>{row.name}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      render: (_, row: IRowData) => <MaxWidthColumn width={180}>{row.cnpj}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
    {
      title: 'Razão Social',
      dataIndex: 'corporateName',
      render: (_, row: IRowData) => <MaxWidthColumn width={180}>{row.corporateName}</MaxWidthColumn>,
      ...defaultColumnProps,
    },
    
    
  
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, row: IRowData) => (
          <span style={{
            color: row.isActive === 1 ? '#20C9A5' : '#faad14',
            background: row.isActive === 1 ? '#E2F4F0' : '#fffbe6',
            border: `0px solid ${row.isActive === 1 ? '#b7eb8f' : '#ffe58f'}`,
            padding: '3px 10px',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems:'center',
            textAlign:'center',
            boxSizing: 'border-box',
            fontVariant: 'tabular-nums',
            listStyle: 'none',
            fontFeatureSettings: 'tnum',
            display: 'inline-block',
            height: 'auto',
            fontSize: '12px',
            lineHeight: '20px',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s',
            
          }}>
            {row.isActive === 1 ? 'Ativo' : 'Inativo'}
          </span>
        ),
      ...defaultColumnProps,
    },

  
  
    {
      title: 'Ações',
      key: 'action',
      render: (_, row) => (
        <div className="table-actions">
          {statusSelected === 'Inativos' ? (
            <Button className="btn-icon" type="info" onClick={() => confirmRestoreOneModal.open(row)} to="#" shape="circle">
              <FeatherIcon icon="refresh-ccw" size={16} />
            </Button>
          ):(
            <>
              <Button className="btn-icon" type="info" onClick={() => dataToEditModal.open(row)} to="#" shape="circle">
                <FeatherIcon icon="edit" size={16} />
              </Button>

              
              <Button className="btn-icon" type="danger" onClick={() => confirmDeleteOneModal.open(row)} to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    setListLoading(true); 
    api
      .getData(params, statusSelected)
      .then(response => {
        setData(response.data);
        setPaginationResult({ total: response.size });
      })
      .finally(() => setListLoading(false));
  }, [params, updateTable, statusSelected]);

  useEffect(() => {
    setListLoading(true);
    api
      .getDependences()
      .then(setDependences)
      .finally(() => setListLoading(false));
  }, []);

  function handleCreate(dataToInsert: IFormData) {
    setActionLoading(true);
    api
      .createData(dataToInsert)
      .then(() => {
        newDataModal.close();
        forceUpdate();
        notification.open({
          message: 'Dados inseridos com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao salvar os dados',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  }

  function handleUpdate(key: string, updatedData: IFormData) {
    setActionLoading(true);
    api
      .updateData(key, updatedData)
      .then(() => {
        dataToEditModal.close();
        forceUpdate();
        notification.open({
          message: 'Dados atualizados com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao atualizar os dados',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  }

   function handleDeleteOne(key:string) {
    setActionLoading(true);
    api
      .deleteDataOne(key)
      .then(() => {
        confirmDeleteOneModal.close();
        forceUpdate();
        notification.open({
          message: 'Dados deletados com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao deletar este item',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  } 

  function handleRestoreOne(key:string) {
    setActionLoading(true);
    api
      .restoreDataOne(key)
      .then(() => {
        confirmRestoreOneModal.close();
        forceUpdate();
        notification.open({
          message: 'Registro restaurado com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao restaurar este item',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  } 



  function handleDelete() {
    setActionLoading(true);
    api
      .deleteData(selectedData)
      .then(() => {
        confirmDeleteModal.close();
        setSelectedData({ keys: [], data: [] });
        forceUpdate();
        notification.open({
          message: 'Dados deletados com sucesso',
          type: 'success',
        });
      })
      .catch(() =>
        notification.open({
          message: 'Erro ao deletar dados',
          type: 'error',
        }),
      )
      .finally(() => setActionLoading(false));
  }

  function handleChangeParams(pagination: TablePaginationConfig, _filters: any, sorter: any) {
    setParams(prev => ({
      ...prev,
      pagination: {
        current: pagination.current || defaultPaginationParams.current,
        pageSize: pagination.pageSize || defaultPaginationParams.pageSize,
      },
      sort: {
        field: typeof sorter.field === 'string' ? sorter.field : '',
        order: sorter.order,
      },
    }));
  }

  function handleUpdateFilters(filters: IFilters) {
    setParams(prev => ({ ...prev, filters }));
    setShowFilterButton(true);
    filtersModal.close();
  }

  function handleClearFilters() {
    setParams(prev => ({ ...prev, filters: { ...defaultFilters } }));
    setShowFilterButton(false);
    filtersModal.close();
  }

  function handleSearch(search: string) {
    setParams(prev => ({ ...prev, filters: { ...prev.filters, search } }));
  }

  return {
    data,
    dependences,
    selectedData,
    setSelectedData,
    showFilterButton,
    columns,
    params,
    paginationResult,
    statusSelected,
    filterKey,

    listLoading,
    actionLoading,

    handleCreate,
    handleUpdate,
    handleDelete,
    handleDeleteOne,
    handleRestoreOne,
    handleChangeParams,
    handleClearFilters,
    handleUpdateFilters,
    handleChangeForFilter,
    handleSearch,

    filtersModal,
    confirmDeleteModal,
    confirmDeleteOneModal,
    confirmRestoreOneModal,
    newDataModal,
    dataToEditModal,
  };
};

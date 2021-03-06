import React, { useEffect, useState } from 'react';
import { Col, Table, ConfigProvider, Modal, Drawer, Row, Radio, Button as FilterButton } from 'antd';
import { PlusOutlined, FilterOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from '../../components/buttons/buttons';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import ptBR from 'antd/es/locale/pt_BR';

import { PageHeader } from '../../components/page-headers/page-headers';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, TableWrapper } from '../../container/styled';

import Filters from './components/Filters';
import Form from './components/Form';
import { useTable } from './hooks/useTable';

import { pageSizeOptions } from './empty-data';
import { TopToolBox } from '../../container/ecommerce/Style';
import { ThemeLayout } from '../../layout/themeLayout';
import axios from 'axios';

const Instances = () => {
  const {
    data,
    selectedData,
    setSelectedData,
    statusSelected,
    showFilterButton,
    columns,
    params,
    paginationResult,
    dependences,
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

    userQRInstanseID,
    isOpenModalQRCode,
    handleCloseModalQRCode,
  } = useTable();

  const [state, setState]:any = useState({
    //notData: searchData,
    item: data,
    selectedRowKeys: [],
  });

  const {  selectedRowKeys } = state;

  useEffect(() => {
    if (data) {
      setState({
        item: data,
        selectedRowKeys,
      });
    }
  }, [data, selectedRowKeys]);

  async function getQRCode(id: string) {
    const res = await axios.get(`https://api.api2zap.com/rest/instance/qrcode_base64/${id}`);
    return res;
  }

  async function deleteQRCode(id: string) {
    const res = await axios.delete(`https://api.api2zap.com/rest/instance/${id}/delete`);
    return res.data;
  }

  async function getInstance(id: string) {
    const { data } = await axios.get(`https://api.api2zap.com/rest/instance/${id}`);
    return data;
  }

  async function createInstance(id: string) {
    const res = await axios.post(`https://api.api2zap.com/rest/instance/init?instance_key=${id}`);
    return res;
  }

  async function getUserInstance(id: string) {
    try {
      const res = await getInstance(id);
      return res;
    } catch(err) {
      const res = await createInstance(id);
      return res;
    }
  }

  const [instanceExists, setInstanceExists] = useState(false);
  const [QRCodeState, setQRCodeState] = useState("");

  useEffect(() => {
    if(userQRInstanseID !== "" && isOpenModalQRCode) {
      getUserInstance(userQRInstanseID)
        .then(response => {
          if(!response?.instance?.user) {
            setQRCodeState("");
            createInstance(userQRInstanseID)
              .then(() => {
                setTimeout(() => {
                  getQRCode(userQRInstanseID)
                    .then(response => {
                      setInstanceExists(false);
                      setQRCodeState(response.data.qrcode)
                    })
                }, 1000)
              })
          } else {
            setInstanceExists(true)
          }
        });
    }
  }, [userQRInstanseID, isOpenModalQRCode]);

  useEffect(() => {
    if(userQRInstanseID !== "" && isOpenModalQRCode) {
      const interval = setInterval(() => {
        console.log("atualizando qrcode")
        getUserInstance(userQRInstanseID)
          .then(response => {
            if(!response?.instance?.user) {
              deleteQRCode(userQRInstanseID)
                .then(() => {
                  createInstance(userQRInstanseID)
                    .then(() => {
                      setTimeout(() => {
                        getQRCode(userQRInstanseID)
                          .then(response => {
                            setInstanceExists(false);
                            setQRCodeState(response.data.qrcode)
                          })
                      }, 2000)
                    })
                })
            } else {
              setInstanceExists(true)
            }
          });
      }, 30000)
  
      if(instanceExists) {
        clearInterval(interval);
      }
    }
  }, [instanceExists, userQRInstanseID, isOpenModalQRCode]);

  useEffect(() => {
    if(userQRInstanseID !== "" && isOpenModalQRCode && !instanceExists) {
      const interval = setInterval(() => {
        console.log("vendo se instancia existe")
        getUserInstance(userQRInstanseID)
          .then(response => {
            if(response?.instance?.user) {
              setInstanceExists(true);
              clearInterval(interval);
            }
          })
      }, 5000);
    }
  }, [instanceExists, userQRInstanseID, isOpenModalQRCode]);

  return (
    <ThemeLayout>
      <ConfigProvider locale={ptBR}>
        <PageHeader 
          ghost 
          title="Inst??ncias" 
          buttons={[
            <div key="1" className="page-header-actions">
              <ExportButtonPageHeader key="1" />
              {showFilterButton && (
                <FilterButton danger size="small" key="2" type="default" onClick={handleClearFilters}>
                  <CloseOutlined size={10} />
                  Limpar Filtro
                </FilterButton>
              )}
              <Button size="small" key="3" type="primary" onClick={filtersModal.open}>
                <FilterOutlined size={10} />
                Filtrar
              </Button>
            </div>,
          ]}
        />
        <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center" >
                    <Col lg={6}  xs={24}>
                      <div className="table-search-box" >
                        <AutoComplete placeholder="Pesquisar..." onSearch={handleSearch}  width="100%" patterns />
                      </div>
                    </Col>
                    <Col  lg={14}  xs={24}>
                      <div className="table-toolbox-menu" >
                        <span className="toolbox-menu-title"> Status:</span>
                        <Radio.Group onChange={handleChangeForFilter} defaultValue={statusSelected}>
                         {/*  <Radio.Button value="Todos">Todos</Radio.Button> */}
                          {filterKey &&
                            filterKey.map(value => {
                              return (
                                <Radio.Button key={value} value={value}>
                                  {value}
                                </Radio.Button>
                              );
                            })}
                        </Radio.Group>
                      </div>
                    </Col>
                    <Col  lg={4}  xs={24}>
                      <div className="table-toolbox-actions" >
                        <Button size="small" type="primary" onClick={newDataModal.open}>
                          <PlusOutlined size={12} /> Adicionar
                        </Button>
                      </div>
                    </Col>
                  </Row>
              </TopToolBox>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                <Table
                  loading={listLoading}
                  showSorterTooltip={false}
                  rowSelection={{
                    selectedRowKeys: selectedData.keys,
                    onChange: (keys, data) => setSelectedData({ keys: keys as string[], data }),
                    selections: [
                      {
                        key: 'odd', 
                        text: 'Excluir Selecionados',
                        onSelect: changableRowKeys => {
                          let newSelectedRowKeys:any = [];
                          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            let indexes: any = [];
                            let idx: any = selectedData.keys.indexOf(String(key));
                            while(idx !== -1) {
                              indexes.push(idx);
                              idx = selectedData.keys.indexOf(String(key), idx + 1);
                              return true;
                            }
                            return false;
                          });
                          console.log(newSelectedRowKeys);
                          confirmDeleteModal.open(newSelectedRowKeys);
                          
                        },
                      },        
                    ],
                  }}
                  onChange={handleChangeParams}
                  dataSource={data}
                  columns={columns}
                  pagination={{ ...params.pagination, ...paginationResult, pageSizeOptions, showSizeChanger: true }}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
          {/* <Col xs={24}> */}
            {/* <CardWrapper>
              <header>
                <div className="left-header">
                  {!!selectedData.keys.length && (
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item danger onClick={() => confirmDeleteModal.open(selectedData)}>
                            Deletar items
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Button type="dashed" shape="circle" icon={<MoreOutlined />} />
                    </Dropdown>
                  )}

                  <Input.Search
                    placeholder="Filtrar dados da tabela"
                    onSearch={handleSearch}
                    enterButton="Buscar"
                    style={{ width: 400 }}
                    loading={listLoading}
                  />
                </div>

                <div className="actions">
                  <Button type="primary" icon={<FilterOutlined />} onClick={filtersModal.open} />
                  <Button type="primary" icon={<PlusOutlined />} onClick={newDataModal.open}>
                    Adicionar
                  </Button>
                </div>
              </header>
              <TableWrapper className="table-data-view table-responsive">
                <Table
                  pagination={{ ...params.pagination, ...paginationResult, pageSizeOptions, showSizeChanger: true }}
                  columns={columns}
                  dataSource={data}
                  onChange={handleChangeParams}
                  loading={listLoading}
                  showSorterTooltip={false}
                  rowSelection={{
                    selectedRowKeys: selectedData.keys,
                    onChange: (keys, data) => setSelectedData({ keys: keys as string[], data }),
                  }}
                />
              </TableWrapper>
            </CardWrapper> */}
          {/* </Col> */}

          {filtersModal.isOpen && (
            <Drawer title="Filtros" width={400} onClose={filtersModal.close} visible>
              <Filters
                initialFilters={params.filters}
                updateFilters={handleUpdateFilters}
                clearFilters={handleClearFilters}
                showButton={showFilterButton}
                dependences={dependences}
              />
            </Drawer>
          )}

          {newDataModal.isOpen && (
            <Modal
              title="Adicionar Escola"
              visible
              onCancel={newDataModal.close}
              confirmLoading={true}
              footer={null}
              maskClosable={false}
              width={1200}
              style={{marginTop: -60}}
              bodyStyle={{padding: 0}}
            >
              <Form
                handleSubmit={handleCreate}
                onCancel={newDataModal.close}
                loading={actionLoading}
                dependences={dependences}
              />
            </Modal>
          )}

          {isOpenModalQRCode && (
            <Modal
              title="Ler QR Code"
              visible
              onCancel={handleCloseModalQRCode}
              confirmLoading={true}
              footer={null}
              maskClosable={false}
              width={1200}
              style={{marginTop: -60}}
              bodyStyle={{padding: 0}}
            >
              {instanceExists && <p>J?? existe uma instancia</p>}
              {!instanceExists && <img src={QRCodeState} alt=""/>} 
            </Modal>
          )}

          {dataToEditModal.isOpen && (
            <Modal
              title="Atualizar Escola"
              visible
              onCancel={dataToEditModal.close}
              footer={null}
              maskClosable={false}
              width={1200}
            >
              <Form
                initialData={dataToEditModal.params}
                handleSubmit={form => handleUpdate(dataToEditModal.params.key, form)}
                onCancel={dataToEditModal.close}
                loading={actionLoading}
                dependences={dependences}
              />
            </Modal>
          )}

          {confirmDeleteModal.isOpen && (
            
            <Modal
              title={'Aten????o!'}
              visible
              onOk={handleDelete}
              onCancel={confirmDeleteModal.close}
              okText="Confirmar"
              okType="danger"
              confirmLoading={actionLoading}
            >
              
                <h2 >Deseja mesmo excluir esses dados?</h2>
              
            </Modal>
          )}

           {confirmDeleteOneModal.isOpen && (
            <Modal
              title={'Deseja mesmo excluir esse item?'
              }
              visible
              onOk={ () => handleDeleteOne(confirmDeleteOneModal.params.key) }
              
              onCancel={confirmDeleteOneModal.close}
              okText="Confirmar"
              okType="danger"
              confirmLoading={actionLoading}
            >
              
                <p >{confirmDeleteOneModal.params.name}</p>
              
            </Modal>
          )} 

          {confirmRestoreOneModal.isOpen && (
            <Modal
              title={'Deseja mesmo restaurar esse item?'
              }
              visible
              onOk={ () => handleRestoreOne(confirmRestoreOneModal.params.key) }
              
              onCancel={confirmRestoreOneModal.close}
              okText="Confirmar"
              okType="danger"
              confirmLoading={actionLoading}
            >
              
                <p >{confirmRestoreOneModal.params.name}</p>
              
            </Modal>
          )} 
        </Main>
      </ConfigProvider>
    </ThemeLayout>
  );
};

export default Instances;

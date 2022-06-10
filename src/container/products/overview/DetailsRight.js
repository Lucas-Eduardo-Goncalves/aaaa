import React, { useState, useEffect } from 'react';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Col, Spin, Card, Table } from 'antd';
import Heading from '~/components/heading/heading';
import { Cards } from '~/components/cards/frame/cards-frame';
import EmptyMessage from '~/components/emptyMessage';
import { Sidebar, SidebarSingle } from '../Style';
import { INVENTORY_DETAILS_URL, PENDING_ENTRIES_URL } from '~/utility/useLinks';
import axios from 'axios';

const DetailsRight = ({ product }) => {
  const [inventoryDetails, setInventoryDetais] = useState(null);
  const [pendingEntries, setPendingEntries] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoader(true);
      const detailsResponse = await axios.post(INVENTORY_DETAILS_URL, {
        CODPROD: product.id,
      });
      const pendingResponse = await axios.post(PENDING_ENTRIES_URL, {
        CODPROD: product.id,
      });
      const detailsBody = detailsResponse.data.responseBody;
      const inventory = detailsBody.produto.estoques;
      if (inventory?.estoque) {
        const estoque = [];
        if (Array.isArray(inventory?.estoque)) {
          inventory.estoque.forEach((element, index) => {
            estoque.push({
              key: index,
              disponivel: element.DISPONIVEL.$,
              local: element.DESCRLOCAL.$,
            });
          });
        } else {
          estoque.push({
            key: 1,
            disponivel: inventory.estoque.DISPONIVEL.$,
            local: inventory.estoque.DESCRLOCAL.$,
          });
        }
        setInventoryDetais(estoque);
      }
      const pendingBody = pendingResponse.data.responseBody;
      const entries = pendingBody.entradasPendentes;
      if (entries.length !== 0) {
        const pending = [];
        if (Array.isArray(pending)) {
          entries.entradaPendente.forEach((element, index) => {
            pending.push({
              key: index,
              numnota: element.NUMNOTA.$,
              qtd: element.QTD.$,
            });
          });
        } else {
          pending.push({
            key: 1,
            numnota: entries.entradaPendente.NUMNOTA.$,
            qtd: entries.entradaPendente.QTD.$,
          });
        }
        setPendingEntries(pending);
      }
      setIsLoader(false);
    }
    if (product) {
      fetchData();
    }
  }, [product]);

  const inventoryColumns = [
    {
      title: 'Disponível',
      dataIndex: 'disponivel',
      key: 'disponivel',
    },
    {
      title: 'Nome local',
      dataIndex: 'local',
      key: 'local',
    },
  ];

  const pendingColumns = [
    {
      title: 'Nro. Nota',
      dataIndex: 'numnota',
      key: 'numnota',
    },
    {
      title: 'Quantidade',
      dataIndex: 'qtd',
      key: 'qtd',
    },
  ];

  return (
    <Sidebar>
      <Cards
        title={
          <span>
            <FeatherIcon icon="info" size={14} />
            <span ellipsis="true">{product?.name ? product.name : 'Detalhes'}</span>
          </span>
        }
      >
        {isLoader ? (
          <div className="spin d-flex align-center-v">
            <Spin />
          </div>
        ) : (
          <>
            {inventoryDetails || pendingEntries ? (
              <>
                <SidebarSingle style={{ marginBottom: 32 }}>
                  <Heading as="h5">Detalhes de estoque</Heading>
                  {inventoryDetails ? (
                    <Table dataSource={inventoryDetails} columns={inventoryColumns} pagination={false} />
                  ) : (
                    <Col xs={24} style={{ padding: 10 }}>
                      <Card style={{ width: '100%' }}>
                        <div className="spin" style={{ height: 100 }}>
                          <EmptyMessage text="Nenhuma informação" iconSize={40} textSize={15} />
                        </div>
                      </Card>
                    </Col>
                  )}
                </SidebarSingle>
                <SidebarSingle style={{ marginBottom: 32 }}>
                  <Heading as="h5">Entradas pendentes</Heading>
                  {pendingEntries ? (
                    <Table dataSource={pendingEntries} columns={pendingColumns} pagination={false} />
                  ) : (
                    <Col xs={24}>
                      <Card bordered style={{ width: '100%' }}>
                        <div className="spin" style={{ height: 100 }}>
                          <EmptyMessage text="Nenhuma informação" iconSize={40} textSize={15} />
                        </div>
                      </Card>
                    </Col>
                  )}
                </SidebarSingle>
              </>
            ) : (
              <Col xs={24}>
                <div className="spin">
                  <EmptyMessage text="Nenhuma informação" iconSize={40} textSize={15} />
                </div>
              </Col>
            )}
          </>
        )}
      </Cards>
    </Sidebar>
  );
};

DetailsRight.propTypes = {
  product: PropTypes.object,
};

export default DetailsRight;

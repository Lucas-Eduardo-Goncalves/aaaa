import React, { useState, Suspense, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { Switch } from 'react-router-dom';
import { SyncOutlined } from '@ant-design/icons';
import { PageHeader } from '~/components/page-headers/page-headers';
import { Button } from '~/components/buttons/buttons';
import { Main } from '~/container/styled';
import EmptyMessage from '~/components/emptyMessage';
import List from './overview/List';
import { CONFERENCE_QUEUE_URL } from '~/utility/useLinks';
import axios from 'axios';

function Conference() {
  const [isLoader, setIsLoader] = useState(false);
  const [conferenceData, setConferenceData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoader(true);
      const response = await axios.post(CONFERENCE_QUEUE_URL);
      if (response.data) {
        const responseBody = response.data.responseBody;
        setConferenceData(responseBody.result);
      }
      setIsLoader(false);
    }

    fetchData();
  }, []);

  async function updateList() {
    setIsLoader(true);
    const response = await axios.post(CONFERENCE_QUEUE_URL);
    if (response.data) {
      const responseBody = response.data.responseBody;
      setConferenceData(responseBody.result);
    }
    setIsLoader(false);
  }

  return (
    <>
      <PageHeader
        ghost
        title="Fila de Conferência"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button
              size="small"
              key="2"
              type="primary"
              onClick={() => {
                updateList();
              }}
            >
              <SyncOutlined size={12} />
              Atualizar
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={5}>
          <Col flex={1} className="product-content-col" xxl={24} lg={24} md={14} xs={24}>
            {isLoader ? (
              <div className="spin d-flex align-center-v">
                <Spin />
              </div>
            ) : (
              <>
                {!conferenceData ? (
                  <Col xs={24}>
                    <div className="spin">
                      <EmptyMessage text="Nenhuma informação" iconSize={70} textSize={20} />
                    </div>
                  </Col>
                ) : (
                  <Switch>
                    <Suspense
                      fallback={
                        <div className="spin d-flex align-center-v">
                          <Spin />
                        </div>
                      }
                    >
                      <List data={conferenceData} />
                    </Suspense>
                  </Switch>
                )}
              </>
            )}
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Conference;

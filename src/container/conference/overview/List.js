import React, { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import ProductCardList from './ProductCardList';
import Heading from '~/components/heading/heading';
import { PaginationWrapper } from '../Style';

const List = ({ data }) => {
  const [state, setState] = useState({
    current: 0,
    pageSize: 0,
  });

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  return (
    <Row gutter={15}>
      {data.length ? (
        data.map((item, index) => {
          return (
            <Col xs={24} key={index}>
              <ProductCardList product={item} />
            </Col>
          );
        })
      ) : (
        <Col xs={24}>
          <Heading as="h1">Nenhuma informação</Heading>
        </Col>
      )}
      <Col xs={24} className="pb-30">
        {data.length ? (
          <PaginationWrapper style={{ marginTop: 20 }}>
            <Pagination
              onChange={onHandleChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSize={10}
              defaultCurrent={1}
              total={40}
            />
          </PaginationWrapper>
        ) : null}
      </Col>
    </Row>
  );
};

export default List;

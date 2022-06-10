// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import ProductCards from './ProductCards';
import Heading from '~/components/heading/heading';
import { PaginationWrapper, NotFoundWrapper } from '../Style';

const Grid = ({ data, action }) => {
  const [state, setState] = useState({
    current: 0,
    pageSize: 0,
  });

  function handleClick(data) {
    return action(data);
  }

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  return (
    <Row gutter={30}>
      {data ? (
        data.map((item, index) => {
          return (
            <Col xxl={8} lg={12} xs={24} key={index}>
              <ProductCards product={item} action={handleClick} />
            </Col>
          );
        })
      ) : (
        <Col md={24}>
          <NotFoundWrapper>
            <Heading as="h1">Data Not Found</Heading>
          </NotFoundWrapper>
        </Col>
      )}
      <Col xs={24} className="pb-30">
        <PaginationWrapper style={{ marginTop: 10 }}>
          {data ? (
            <Pagination
              onChange={onHandleChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSize={10}
              defaultCurrent={1}
              total={40}
            />
          ) : null}
        </PaginationWrapper>
      </Col>
    </Row>
  );
};

export default Grid;

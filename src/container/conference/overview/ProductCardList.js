import React from 'react';
import { Row, Col, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ExclamationCircleOutlined, SyncOutlined } from '@ant-design/icons';
import Heading from '~/components/heading/heading';
import { Button } from '~/components/buttons/buttons';
import { ProductCard } from '../Style';

const ProductCardList = ({ product }) => {
  return (
    <ProductCard className="list-view" style={{ marginBottom: 20 }}>
      <div className="product-list">
        <Row gutter={15}>
          <Col md={19} xs={24}>
            <div className="product-single-description">
              <Heading className="product-single-title" as="h5">
                {product[1]}
              </Heading>
              <p>{product[9]}</p>
            </div>
          </Col>
          <Col md={5} xs={6}>
            <Row>
              <Col md={5} xs={24}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    paddingRight: 5,
                  }}
                >
                  <div>
                    <Tag
                      icon={product[22] === 'A' ? <SyncOutlined spin /> : <ExclamationCircleOutlined />}
                      color={product[22] === 'A' ? 'success' : 'warning'}
                      style={{ padding: '8px 10px', fontSize: 13 }}
                    >
                      {product[22] === 'A' ? 'Em Andamento' : 'Aguardando Conferência'}
                    </Tag>
                    <div className="product-single-action">
                      <NavLink to={`conferenceDetails/${product[2]}`}>
                        <Button size="small" type="primary">
                          Acessar Conferência
                        </Button>
                      </NavLink>
                    </div>
                  </div>

                  {/* <div className="product-single-action" style={{ marginRight: 2, marginBottom: 5 }}>
                <Button size="small" type="primary">
                  Conferir
                </Button>
              </div> */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </ProductCard>
  );
};

ProductCardList.propTypes = {
  product: PropTypes.array,
};

export default ProductCardList;

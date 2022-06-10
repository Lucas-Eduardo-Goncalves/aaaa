import React, { useState, Suspense } from 'react';
import { Row, Col, Radio, Spin, Input, Affix } from 'antd';
import { Switch } from 'react-router-dom';
import { PageHeader } from '~/components/page-headers/page-headers';
import { Main } from '~/container/styled';
import { TopToolBox } from './Style';
import EmptyMessage from '~/components/emptyMessage';
import Grid from './overview/Grid';
import DetailsRight from './overview/DetailsRight';
import { SEARCH_PRODUCTS_URL } from '~/utility/useLinks';
import axios from 'axios';

const { Search } = Input;

function Products() {
  const [isLoader, setIsLoader] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);

  async function handleSearch(searchText) {
    if (searchText) {
      setIsLoader(true);
      const response = await axios.post(SEARCH_PRODUCTS_URL, {
        termo: searchText,
      });
      const responseBody = response.data.responseBody;
      const products = responseBody.produtos.produto;
      setSearchData(products);
      setIsLoader(false);
    }
  }

  const onSorting = e => {
    //dispatch(sorting(e.target.value));
  };

  return (
    <>
      <PageHeader ghost title="Consulta de Produtos" />
      <Main>
        <Row gutter={5}>
          <Col flex={1} className="product-content-col" xxl={14} lg={17} md={14} xs={24}>
            <TopToolBox>
              <Row gutter={[0, 15]} xs={24} justify="space-between">
                <Col xxl={10} lg={12} xs={24}>
                  <Search
                    placeholder="Digite o nome do produto"
                    size="default"
                    onSearch={text => handleSearch(text)}
                    style={{ width: '100%' }}
                  />
                </Col>
                {/* <Col xxl={10} xs={24}>
                  <div className="product-list-action d-flex justify-content-between align-items-center">
                    <div className="product-list-action__tab">
                      <span className="toolbox-menu-title"> Status:</span>
                      <Radio.Group onChange={onSorting} defaultValue="rate">
                        <Radio.Button value="rate">Top Rated</Radio.Button>
                        <Radio.Button value="popular">Popular</Radio.Button>
                        <Radio.Button value="time">Newest</Radio.Button>
                        <Radio.Button value="price">Price</Radio.Button>
                      </Radio.Group>
                    </div>
                  </div>
                </Col> */}
              </Row>
            </TopToolBox>

            {isLoader ? (
              <div className="spin d-flex align-center-v">
                <Spin />
              </div>
            ) : (
              <>
                {!searchData ? (
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
                      <Grid data={searchData} action={data => setItemSelected(data)} />
                    </Suspense>
                  </Switch>
                )}
              </>
            )}
          </Col>
          <Col className="product-sidebar-col" xxl={10} xl={7} lg={7} md={10} xs={24} style={{ paddingLeft: 25 }}>
            <div>
              <Affix offsetTop={100} style={{ width: '100%' }} target={() => window}>
                <DetailsRight product={itemSelected} />
              </Affix>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Products;

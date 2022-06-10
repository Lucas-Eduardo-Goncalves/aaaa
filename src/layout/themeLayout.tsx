import React, {  useState } from 'react';
import { Layout, Button, Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink, Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { ThemeProvider } from 'styled-components';
import {  useSelector } from 'react-redux';
import MenueItems from './MenueItems';
import TopMenu from './TopMenu';
import { Div, TopMenuSearch } from './style';
import HeaderSearch from '../components/header-search/header-search';
import AuthInfo from '../components/utilities/auth-info/info';

const { darkTheme } = require('../config/theme/themeVariables');

const { Header, Footer, Sider, Content } = Layout;

interface ThemeLayoutProps {
  children: React.ReactNode;
}

export function ThemeLayout({ children }: ThemeLayoutProps) {
  const { rtl, topMenu, darkMode } = useSelector((state: any) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });

  const [collapsed, setCollapsed] = useState(() => {
    if(window.innerWidth >= 1150) return false
    else return true 
  });

  const [activeSearch, setActiveSearch] = useState(false);
  const left = !rtl ? 'left' : 'right';

  function toggleCollapsed() {
    setCollapsed(state => !state);
  };

  function toggleSearch() {
    setActiveSearch(state => !state);
  };

  function toggleCollapsedMobile() {
    if (window.innerWidth <= 990) {
      setCollapsed(state => !state);
    }
  };

  const footerStyle = {
    padding: '20px 30px 18px',
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: '14px',
    background: 'rgba(255, 255, 255, .90)',
    width: '100%',
    boxShadow: '0 -5px 10px rgba(146,153,184, 0.05)',
  };

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  const renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
      [left]: '2px',
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };

  const renderTrackVertical = () => {
    return (
      <div style={{
        position: 'absolute',
        width: '6px',
        transition: 'opacity 200ms ease 0s',
        opacity: 0,
        [rtl ? 'left' : 'right']: '2px',
        bottom: '2px',
        top: '2px',
        borderRadius: '3px',
      }} 
      />
    );
  };

  const renderThumbHorizontal = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };
  
  return (
    <Div>
      <Layout className="layout">
        <Header
          style={{
            position: 'fixed',
            width: '100%',
            top: 0,
            [!rtl ? 'left' : 'right']: 0,
          }}
        >
          <Row>
            <Col lg={!topMenu ? 4 : 3} sm={6} xs={12} className="align-center-v navbar-brand">
              {!topMenu || window.innerWidth <= 991 ? (
                <Button type="link" onClick={toggleCollapsed}>
                  <img src={require(`../static/img/icon/${collapsed ? 'right.svg' : 'left.svg'}`)} alt="menu" />
                </Button>
              ) : null}
              <Link
                className={topMenu && window.innerWidth > 991 ? 'striking-logo top-menu' : 'striking-logo'}
                to="/admin"
              >
                <img
                  src={require(`../static/img/logocia.png`)}
                  alt=""
                />
              </Link>
            </Col>

            <Col lg={!topMenu ? 14 : 15} md={8} sm={0} xs={0}>
              {topMenu && window.innerWidth > 991 ? <TopMenu /> : <HeaderSearch darkMode={darkMode} />}
            </Col>

            <Col lg={6} md={10} sm={0} xs={0}>
              {topMenu && window.innerWidth > 991 ? (
                <TopMenuSearch>
                  <div className="top-right-wrap d-flex">
                    <Link
                      className={`${activeSearch ? 'search-toggle active' : 'search-toggle'}`}
                      onClick={() => {
                        toggleSearch();
                      }}
                      to="#"
                    >
                      <FeatherIcon icon="search" />
                      <FeatherIcon icon="x" />
                    </Link>
                    <div className={`${activeSearch ? 'topMenu-search-form show' : 'topMenu-search-form'}`}>
                      <form action="">
                        <span className="search-icon">
                          <FeatherIcon icon="search" />
                        </span>
                        <input type="text" name="search" />
                      </form>
                    </div>
                    <AuthInfo />
                  </div>
                </TopMenuSearch>
              ) : (
                <AuthInfo />
              )}
            </Col>

            <Col md={0} sm={18} xs={12}>
              <>
                <div className="mobile-action">
                  {/* <Link className="btn-search" onClick={handleSearchHide} to="#">
                    {searchHide ? <FeatherIcon icon="search" /> : <FeatherIcon icon="x" />}
                  </Link>
                  <Link className="btn-auth" onClick={onShowHide} to="#">
                    <FeatherIcon icon="more-vertical" />
                  </Link> */}
                  <AuthInfo />
                </div>
              </>
            </Col>
          </Row>
        </Header>
        {/* <div className="header-more"> */}
          {/* <Row> */}
            {/* <Col md={0} sm={24} xs={24}> */}
              {/* <div className="small-screen-headerRight"> */}
                {/* <SmallScreenSearch>
                  <HeaderSearch />
                </SmallScreenSearch> */}
                {/* <SmallScreenAuthInfo> */}
                  {/* <AuthInfo />s */}
                {/* </SmallScreenAuthInfo> */}
              {/* </div> */}
            {/* </Col> */}
          {/* </Row> */}
        {/* </div> */}
        <Layout>
          {!topMenu || window.innerWidth <= 991 ? (
            <ThemeProvider theme={darkTheme}>
              <Sider width={280} style={{
                    margin: '63px 0 0 0',
                    padding: '15px 15px 55px 15px',
                    overflowY: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    [left]: 0,
                    zIndex: 998,
              }} collapsed={collapsed} theme={!darkMode ? 'light' : 'dark'}>
                <Scrollbars
                  className="custom-scrollbar"
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                  renderThumbHorizontal={renderThumbHorizontal}
                  renderThumbVertical={renderThumbVertical}
                  renderView={renderView}
                  renderTrackVertical={renderTrackVertical}
                >
                  
                  <MenueItems
                    topMenu={topMenu}
                    toggleCollapsed={toggleCollapsedMobile}
                    darkMode={darkMode}
                  />
                </Scrollbars>
              </Sider>
            </ThemeProvider>
          ) : null}
          <Layout className="atbd-main-layout">
            <Content>
              {children}
              <Footer className="admin-footer" style={footerStyle}>
                <Row>
                  <Col md={12} xs={24}>
                    <span className="admin-footer__copyright">2021 © SovWare</span>
                  </Col>
                  <Col md={12} xs={24}>
                    <div className="admin-footer__links">
                      <NavLink to="#">About</NavLink>
                      <NavLink to="#">Team</NavLink>
                      <NavLink to="#">Contact</NavLink>
                    </div>
                  </Col>
                </Row>
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Div>
  )
}
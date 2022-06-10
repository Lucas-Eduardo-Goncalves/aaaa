import React from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';
import Heading from '../../heading/heading';
import { useAuth } from '../../../hooks/useAuth';
import { useLenguage } from '../../../hooks/useLenguage';

const AuthInfo = () => {
  const { signOut } = useAuth();
  const { lenguageState, setLenguageState } = useLenguage();

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <figcaption>
            <Heading as="h5">Bem-Vindo(a)</Heading>
            <p></p>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={signOut} to="#">
          <FeatherIcon icon="log-out" /> Sair
        </Link>
      </div>
    </UserDropDwon>
  );

  const country = (
    <NavAuth>
      <Link onClick={() => setLenguageState('en')} to="#">
        <img className='img-pais' src={require('../../../static/img/flag/en.png')} alt="" />
        <span>English</span>
      </Link>
      <Link onClick={() => setLenguageState('pt-br')} to="#">
        <img className='img-pais' src={require('../../../static/img/flag/pt-br.png')} alt="" />
        <span>Português</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWraper>
      {/* <Message />
      <Notification />

      <Settings />
      <Support /> */}
      <div className="nav-author">
        <Dropdown placement="bottomRight" content={country}>
          <Link to="#" className="head-example">
            <img className='img-pais' src={require(`../../../static/img/flag/${lenguageState}.png`)} alt="" />
          </Link>
        </Dropdown>
      </div>

      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;

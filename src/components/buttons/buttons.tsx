import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonStyledGroup, ButtonStyled } from './styled';

// @Todo props spreading
const defaultProps = {
  type: 'default',
};

const propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
    'dark',
    'light',
    'white',
    'dashed',
    'error',
    'default',
  ]),
  shape: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.any,
  to: PropTypes.any,
  icon: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  outlined: PropTypes.bool,
  transparented: PropTypes.bool,
  danger: PropTypes.bool,
  raised: PropTypes.bool,
  squared: PropTypes.bool,
  social: PropTypes.bool,
  load: PropTypes.bool,
  ghost: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

type ButtonProps = PropTypes.InferProps<typeof propTypes>;

const Button:React.FC<ButtonProps> = (props: any) => {
  const {
    type,
    shape,
    icon,
    size,
    outlined,
    ghost,
    transparented,
    raised,
    danger,
    squared,
    color,
    social,
    load,
    children,
    ...rest
  } = props;
  const [state, setState] = useState({
    loading: false,
  });

  const enterLoading = () => {
    setState({ loading: true });
  };

  return (
    <ButtonStyled
      squared={squared}
      outlined={outlined ? 1 : 0}
      ghost={ghost}
      transparent={transparented ? 1 : 0}
      raised={raised ? 1 : 0}
      data={type}
      size={size}
      shape={shape}
      danger={danger}
      type={type}
      icon={icon}
      color={color}
      social={social}
      onClick={load && enterLoading}
      loading={state.loading}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
};



const BtnGroup = ({ children }) => {
  return <ButtonStyledGroup>{children}</ButtonStyledGroup>;
};

BtnGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export { Button, BtnGroup };

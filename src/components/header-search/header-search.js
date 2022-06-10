import React from 'react';
import PropTypes from 'prop-types';
import { Div } from './header-search-style';

const HeaderSearch = ({ darkMode }) => {
  return (
    <Div 
      className="certain-category-search-wrapper" 
      style={{ width: '100%' }} 
      darkMode={darkMode}
    />
  );
};

HeaderSearch.propTypes = {
  darkMode: PropTypes.bool,
};

export default HeaderSearch;

import React from "react";
import { Col } from "antd";
import { AutoComplete } from '../../../components/autoComplete/autoComplete';

interface ISearchInputComponent {
  handleSearch: (event: string) => void;
}

export function SearchInput({ handleSearch }: ISearchInputComponent) {
  let timer: NodeJS.Timeout;
  
  function debounce(event: string) {
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      handleSearch(event);
    }, 1000)
  }

  return (
    <Col lg={6}  xs={24}>
      <div className="table-search-box">
        <AutoComplete 
          placeholder="Pesquisar..." 
          onSearch={debounce}  
          width="100%" 
          patterns 
        />
      </div>
    </Col>
  );
}
import React from "react";
import { Row } from "antd";

import { ClearFilterButton } from "./components/ClearFilterButton";
import { FilterButton } from "./components/FilterButton";
import { SearchInput } from "./components/SearchInput";
import { TableComponent } from "./components/table";
import { ButtonAdd } from "./components/table/TableButtonAdd";
import { StatusRadioGroup } from "./components/StatusRadioGroup";

import { ThemeLayout } from "../../layout/themeLayout";
import { Main, TableWrapper } from '../../container/styled';
import { TopToolBox } from "../../container/ecommerce/Style";
import { ExportButtonPageHeader } from "../../components/buttons/export-button/export-button";

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from "../../components/cards/frame/cards-frame";

import { useFetch } from "../../hooks/useFetch";
import { IFetchPropsContacts } from "./types";

export function Contacts() {
  const {
    isFetching, 
    dataFetch, 
    setSearch, 
    filters,
    handleAddFilters,
    clearFilters,
    refetch,
    currentPage,
    itensPerPage,
    setCurrentPage,
    setColumnOrdenation,
    setItensPerPage,
    totalItens,
    ApplyFilters
  } = useFetch<IFetchPropsContacts>({ baseUrl: "contacts" });

  return (
    <ThemeLayout>
      <PageHeader ghost title="Contatos" 
        buttons={[
          <div key="1" className="page-header-actions">
            <ExportButtonPageHeader key="1" />
            
            {filters.length !== 0 && <ClearFilterButton clearFilter={clearFilters} />}
            <FilterButton 
              filters={filters} 
              handleAddFilters={handleAddFilters} 
              clearFilters={clearFilters}
              ApplyFilters={ApplyFilters}
            />
          </div>
        ]}
      />

      <Main>
        <Cards headless>
          <TopToolBox>
            <Row gutter={15} className="justify-content-center">
              <SearchInput handleSearch={setSearch} />
              <StatusRadioGroup handleAddFilters={handleAddFilters}/>
              <ButtonAdd refetch={refetch} />
            </Row>
          </TopToolBox>

          <TableWrapper className="table-order table-responsive">
            <TableComponent 
              setCurrentPage={setCurrentPage}
              setColumnOrdenation={setColumnOrdenation}
              currentPage={currentPage} 
              refetch={refetch} 
              isLoading={isFetching} 
              dataFetch={dataFetch} 
              totalItens={totalItens}
              itensPerPage={itensPerPage}
              setItensPerPage={setItensPerPage}
            />
          </TableWrapper>
        </Cards>
      </Main>
    </ThemeLayout>
  );
}

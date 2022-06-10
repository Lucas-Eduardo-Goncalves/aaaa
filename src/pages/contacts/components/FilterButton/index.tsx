import React, { useState } from "react";
import { FilterOutlined } from '@ant-design/icons';

import { Button } from '../../../../components/buttons/buttons';
import { FilterDrawer } from "./FilterDrawer";
import { Drawer } from "antd";

type ITypeFilter = {
  content: string, 
  key: string;
}

interface IFilterButtonComponent {
  filters: ITypeFilter[];
  clearFilters: () => void;
  handleAddFilters: (event: ITypeFilter) => void;
  ApplyFilters: () => void;
}

export function FilterButton({ clearFilters, filters, handleAddFilters, ApplyFilters }: IFilterButtonComponent) {
  const [state, setState] = useState(false);

  function handleApplyFilters() {
    setState(false);
    ApplyFilters();
  }

  function handleClearFilters() {
    setState(false);
    clearFilters();
  }

  return (
    <>
      <Button 
        size="small" 
        type="primary" 
        onClick={() => setState(true)}
        >
        <FilterOutlined size={10} />
        Filtrar
      </Button>

      <Drawer title="Filtros" width={400} style={{ zIndex: 1000 }} onClose={() => setState(false)} visible={state}>
        <FilterDrawer 
          handleAddFilters={handleAddFilters} 
          clearFilters={handleClearFilters} 
          filters={filters} 
          handleApplyFilters={handleApplyFilters}
        />
      </Drawer>
    </>
  );
}
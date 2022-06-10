import React from "react";
import { Button } from "antd";
import { CloseOutlined } from '@ant-design/icons';

interface IClearFilterButtonComponent {
  clearFilter: () => void;
}

export function ClearFilterButton({ clearFilter }: IClearFilterButtonComponent) {
  return (
    <Button 
      danger 
      size="small" 
      type="default" 
      onClick={clearFilter}
    >
      <CloseOutlined size={10} />
      Limpar Filtro
    </Button>
  );
}
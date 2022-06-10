import React, { useState } from 'react';
import { Button, Select, DatePicker, Form, Checkbox } from 'antd';

import { FiltersWrapper } from '../style';
import { IDependences, IFilters } from '../types';

type FiltersProps = {
  initialFilters: IFilters;
  updateFilters: (filters: IFilters) => void;
  clearFilters: () => void;
  showButton: boolean;
  dependences: IDependences;
};

const Filters: React.FC<FiltersProps> = ({ initialFilters, updateFilters, clearFilters, showButton, dependences }) => {
  const [filters, setFilters] = useState(initialFilters);

  function handleChange(key: keyof IFilters, value: any) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  return (
    <FiltersWrapper>
      <Form layout="vertical">
        <Form.Item label="Data criação">
          <DatePicker.RangePicker
            format="DD/MM/YYYY"
            value={filters.createdAt}
            onChange={dates => handleChange('createdAt', dates)}
          />
        </Form.Item>

        <Form.Item label="Cidade">
          <Select
            placeholder="Filtrar por cidade"
            value={filters.idCidade}
            onChange={value => handleChange('idCidade', value)}
          >
            {dependences.cidades.map(c => (
              <Select.Option value={c.value}>{c.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ativo">
          <Checkbox checked={filters.status} onChange={e => handleChange('status', e.target.checked)}>
            Produto está ativo
          </Checkbox>
        </Form.Item>
      </Form>

      <footer>
        <Button type="primary" size="large" onClick={() => updateFilters(filters)}>
          Aplicar filtros
        </Button>

        {showButton && (
          <Button type="primary" danger size="large" onClick={() => clearFilters()}>
            Limpar filtros
          </Button>
        )}
      </footer>
    </FiltersWrapper>
  );
};

export default Filters;

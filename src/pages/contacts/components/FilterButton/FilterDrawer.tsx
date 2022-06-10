import React from 'react';
import { Button, DatePicker, Form } from 'antd';

import { FiltersWrapper } from '../../styles';
import moment from 'moment';
import { Select } from '../../../../components/Select';

type ITypeFilter = {
  content: string, 
  key: string;
}

type FiltersProps = {
  filters: ITypeFilter[];
  clearFilters: () => void;
  handleAddFilters: (event: {key: string; content: string;}) => void;
  handleApplyFilters: () => void;
};

export function FilterDrawer ({ handleAddFilters, clearFilters, filters, handleApplyFilters }: FiltersProps) {
  function handleChangeFilters([date1, date2]: any) {
    const format = (date?: moment.Moment) => (date ? date.format('YYYY-MM-DD') : '');
    handleAddFilters({ key:"&filter.createdAt=$btw:", content:`${format(date1)},${format(date2)}` })
  }

  function handleFilterSegment(event: string) {
    handleAddFilters({ key:"&filter.segmentId=$btw:", content:event })
  }

  function handleFilterTag(event: string) {
    handleAddFilters({ key:"&filter.tagId=$btw:", content:event })
  }

  return (
    <FiltersWrapper>
      <Form layout="vertical">
        <Form.Item label="Data criação">
          <DatePicker.RangePicker
            format="DD/MM/YYYY"
            onChange={dates => handleChangeFilters(dates)}
          />
        </Form.Item>

        <Select
          name='filterSelectSegment'
          title='Segmento'
          fetchUrl='segments'
          onChange={handleFilterSegment}
        />

        <Select
          name='filterSelectTag'
          title='Tag'
          fetchUrl='segments'
          onChange={handleFilterTag}
        />
      </Form>

      <footer>
        {filters.length !== 0 && (
          <Button  danger size="large" onClick={clearFilters}>
            Limpar filtros
          </Button>
        )}

        <Button type="primary" size="large" onClick={handleApplyFilters}>Adicionar filtros</Button>
      </footer>
    </FiltersWrapper>
  );
}

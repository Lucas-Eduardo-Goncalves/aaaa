import { SortOrder } from 'antd/lib/table/interface';
import { IFilters, IFormData, IPaginationParams } from './types';

export const pageSizeOptions = ['10', '30', '50'];

export const initialEmptyFormData: IFormData = {
  name: '',
  cnpj: '',
  corporateName: '',
  address: '',
  number: '',
  complement: '',
  zipcode: '',
  district: '',
  state: '',
  city: '',
  responsibleName: '',
  email: '',
  phone: '',
  whatsapp: '',
  categoryId: 1,
  isActive: 1,
  
  
};

export const defaultColumnProps = {
  sorter: true,
  filterMultiple: false,
  sortDirections: ['descend', 'ascend'] as SortOrder[],
};

export const defaultPaginationParams: IPaginationParams = {
  current: 1,
  pageSize: Number(pageSizeOptions[0]),
};

export const defaultFilters: IFilters = {
  createdAt: undefined,
  categoryId: undefined,
  search: '',
  status: undefined,
};

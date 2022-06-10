import moment from 'moment';

export type Option = {
  value: string;
  label: string;
};

export declare type SortOrder = 'descend' | 'ascend' | null;

export type IPaginationParams = {
  current: number;
  pageSize: number;
};

export type IPaginationResult = {
  total: number;
};

export type IDependences = {
  cidades: Option[];
  escolaesferas: Option[];
  escolagraus: Option[];
};

export type IRowData = {
  key: string;
  name: string;
  cnpj: string;
  address: string;
  corporateName: string;
  number: string;
  complement: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  responsibleName: string;
  email: string;
  phone: string;
  whatsapp: string;
  isActive: number;
  categoryId: number;
  createdAt: moment.Moment;
};

export type IFormData = {
  name: string;
  cnpj: string;
  corporateName: string;
  address: string;
  number: string;
  complement: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  responsibleName: string;
  email: string;
  phone: string;
  whatsapp: string;
  isActive: number;
  categoryId: number;
};

export type IFormDataErrors = any;

export type IFilters = {
  createdAt?: [moment.Moment, moment.Moment];
  categoryId?: string;
  status?: any;
  search: string;
};

export type IParams = {
  pagination: IPaginationParams;
  sort: {
    field: string;
    order: 'descend' | 'ascend';
  };
  filters: IFilters;
};

export type ISelectedData = {
  keys: string[];
  data: IRowData[];
};

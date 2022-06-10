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
  addons: Option[];
};

export type IRowData = {
  key: string;
  nome: string;
  uf: string;
  sigla: string;
  status: number;
  createdAt: moment.Moment;
};

export type IFormData = {
  nome: string;
  uf: string;
  sigla: string;
  status: number;
};

export type IFormDataErrors = any;

export type IFilters = {
  createdAt?: [moment.Moment, moment.Moment];
  idCidade?: string;
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

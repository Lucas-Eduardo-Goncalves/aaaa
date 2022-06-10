import moment from 'moment';

export type Option = {
  value: string;
  label: string;
};

export type IDependences = {
  cidades: Option[];
  escolaesferas: Option[];
  escolagraus: Option[];
};

export type IFilters = {
  search: string;
  status?: any;
  categoryId?: string;
  createdAt?: [moment.Moment, moment.Moment];
};

export type IContactProps = {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  id: number;
  name: string;
  segmentId: number;
  updatedAt: string;
  userId: number;
}

export type IHandleSubmitProps = {
  email: string; 
  name: string; 
  segmentId: string; 
  tag: string;
}

export type IFetchPropsContacts = IContactProps[]
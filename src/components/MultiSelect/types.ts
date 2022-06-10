export interface ISelectProps {
  value: string;
}

export interface ISelectSegmentoComponent {
  title: string;
  name: string;
  fetchUrl: string;
  postUrl?: string;
}

export interface IFetchProps {
  name: string;
  id: string;
}
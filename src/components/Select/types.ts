interface ISelectProps {
  label: string; 
  value: string;
}

export interface ISelectSegmentoComponent {
  title: string;
  name: string;
  fetchUrl: string;
  postUrl?: string;
  onChange?: (event: string) => void;
}

export interface IFetchProps {
  name: string;
  id: string;
}
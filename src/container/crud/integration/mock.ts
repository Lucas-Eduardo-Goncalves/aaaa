import moment from 'moment';
import { IFormData, IParams, IRowData, ISelectedData, Option } from '../types';

const cidades: Option[] = [{ value: '1', label: 'Cidade 1' }];
const addons: Option[] = [];

let mockData: IRowData[] = [
  {
    key: '1',
    nome: 'Produto 1',
    endereco: 'Descricao',
    numero: 'Descricao',
    complemento: 'Descricao',
    cep: 'Descricao',
    bairro: 'Descricao',
   
    grauEscola: 'grauEscola',
    idEsfera: 'idEsfera',
    createdAt: moment(),
    status: 1,
    idCidade: cidades[0].value,
    cidadeName: cidades[0].label,
   
  },
];

const freeze = () => new Promise(resolve => setTimeout(resolve, 2000));

export const getData = async (params: IParams) => {
  console.log('getData', params);
  await freeze();
  return {
    data: mockData,
    size: 10000,
  };
};

export const getDependences = async () => {
  await freeze();
  return { cidades, addons };
};

export const createData = async (params: IFormData) => {
  await freeze();
  mockData.push({
    key: Math.random().toString(),
    ...params,
    cidadeName: '',
  } as IRowData);
};

export const updateData = async (key: string, params: IFormData) => {
  console.log('updateData', params);
  await freeze();
  const itemIndex = mockData.findIndex(d => d.key === key);
  if (itemIndex < 0) throw new Error('Item not found');
  Object.assign(mockData[itemIndex], params);
};

export const deleteData = async (params: ISelectedData) => {
  console.log('deleteData', params);
  await freeze();
  mockData = mockData.filter(d => !params.keys.includes(d.key));
};

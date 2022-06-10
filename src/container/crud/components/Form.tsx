import React, { useState } from 'react';
import { Row, Col, Button, Input, Select, DatePicker, Form as AntdForm, Checkbox, InputNumber } from 'antd';

import { CardWrapper, FormWrapper } from '../style';
import { IDependences, IFormData, IFormDataErrors } from '../types';
import { validate } from '../validation/form';
import { initialEmptyFormData } from '../empty-data';

type FormProps = {
  initialData?: IFormData;
  handleSubmit: (data: IFormData) => void;
  onCancel: () => void;
  loading: boolean;
  dependences: IDependences;
};

const defaultErrors = {};

const Form: React.FC<FormProps> = ({ initialData, handleSubmit, onCancel, loading, dependences }) => {
  const isUpdatingData = !!initialData;

  const [data, setData] = useState(initialData || initialEmptyFormData);
  const [formSubmited, setFormSubmited] = useState(false);
  const [errors, setErrors] = useState<IFormDataErrors>({ ...defaultErrors });

  function handleValidate(form: IFormData) {
    const validationErrors = validate(form);
    if (!validationErrors) setErrors({ ...defaultErrors });
    else setErrors(validationErrors);
    return validationErrors;
  }

  function handleChange(key: keyof IFormData, value: any) {
    setData(prev => {
      const newState = { ...prev, [key]: value };
      handleValidate(newState);
      return newState;
    });
  }

  async function handleSubmitForm() {
    setFormSubmited(true);
    const hasErrors = handleValidate(data);
    if (!hasErrors) return handleSubmit(data);
  }

  function getErrorProps(key: keyof IFormData) {
    const currentError = errors[key];

    if (!formSubmited) return {};
    if (!currentError) return {};

    return {
      validateStatus: 'error' as 'error',
      help: currentError,
    };
  }

  return (
    <FormWrapper>
      <AntdForm layout="vertical" style={{padding: 30}}>
        <Row gutter={40}>
          <Col span={12}>
            <CardWrapper type="inner" title="Informações Gerais">
              <AntdForm.Item label="Nome" {...getErrorProps('nome')}>
                <Input
                  placeholder="Nome da Escola"
                  value={data.nome}
                  onChange={e => handleChange('nome', e.target.value)}
                />
              </AntdForm.Item>

              <AntdForm.Item label="id Esfera" {...getErrorProps('idEsfera')}>
                <Input
                  placeholder="idEsfera"
                  value={data.idEsfera}
                  onChange={e => handleChange('idEsfera', e.target.value)}
                />
              </AntdForm.Item>
              <AntdForm.Item label="grauEscola" {...getErrorProps('grauEscola')}>
                <Input
                  placeholder="grauEscola"
                  value={data.grauEscola}
                  onChange={e => handleChange('grauEscola', e.target.value)}
                />
              </AntdForm.Item>
             

             
            </CardWrapper>

            

           
          </Col>
          
          <Col span={12}>
          <CardWrapper  type="inner" title="Endereço">
              <AntdForm.Item label="Logradouro" {...getErrorProps('endereco')}>
                <Input
                  placeholder="Nome do Logradouro"
                  value={data.endereco}
                  onChange={e => handleChange('endereco', e.target.value)}
                />
              </AntdForm.Item>
              <Row >
              <AntdForm.Item label="Número" {...getErrorProps('numero')}>
                <Input
                  placeholder="Número"
                  value={data.numero}
                  onChange={e => handleChange('numero', e.target.value)}
                />
              </AntdForm.Item>

              <AntdForm.Item style={{marginLeft: 20}} label="Complemento" {...getErrorProps('complemento')}>
                <Input
                  placeholder="Complemento"
                  value={data.complemento}
                  onChange={e => handleChange('complemento', e.target.value)}
                  
                  style={{ width: '100%' }}
                />
              </AntdForm.Item>
              </Row>
              <Row >
              <AntdForm.Item label="CEP" {...getErrorProps('cep')}>
                <Input
                  placeholder="CEP"
                  value={data.cep}
                  onChange={e => handleChange('cep', e.target.value)}
                  style={{ width: '100%' }}
                />
              </AntdForm.Item>
              <AntdForm.Item  style={{marginLeft: 20}}  label="Bairro" {...getErrorProps('bairro')}>
                <Input
                  placeholder="Bairro"
                  value={data.bairro}
                  onChange={e => handleChange('bairro', e.target.value)}
                  style={{ width: '100%' }}
                />
              </AntdForm.Item>
              </Row>
              <AntdForm.Item label="Cidade" {...getErrorProps('idCidade')}>
                <Select
                  placeholder="Selecione uma Cidade"
                  value={data.idCidade}
                  onChange={value => handleChange('idCidade', value)}
                >
                  {dependences.cidades.map(c => (
                    <Select.Option value={c.value}>{c.label}</Select.Option>
                  ))}
                </Select>
              </AntdForm.Item>
            </CardWrapper>
             

            
          </Col>          
        </Row>
      </AntdForm>

      <footer style={{padding: '20px 30px', borderTop: '1px solid #f0f0f0'}}>
        <Button type="default" onClick={() => onCancel()}>
          Voltar
        </Button>
        <Button type="primary" onClick={handleSubmitForm} loading={loading}>
          {isUpdatingData ? 'Atualizar' : 'Salvar'}
        </Button>
      </footer>
    </FormWrapper>
  );
};

export default Form;

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
    // const newState = { ...prev};
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
          <Col span={24}>
            <CardWrapper type="inner" title="Informações Gerais">
              <AntdForm.Item label="Nome " {...getErrorProps('nome')}>
                <Input
                  placeholder="Nome da Cidade"
                  value={data.nome}
                  onChange={e => handleChange('nome', e.target.value)}
                />
              </AntdForm.Item>

              <AntdForm.Item label="Estado" {...getErrorProps('uf')}>
                <Input
                  placeholder="Estado"
                  value={data.uf}
                  onChange={e => handleChange('uf', e.target.value)}
                />
              </AntdForm.Item>
              <AntdForm.Item label="Sigla" {...getErrorProps('sigla')}>
                <Input
                  placeholder="Sigla"
                  value={data.sigla}
                  onChange={e => handleChange('sigla', e.target.value)}
                />
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

import * as yup from 'yup';
import { IFormData, IFormDataErrors } from '../types';

const schema = yup.object({
  nome: yup.string().required('Este Campo é obrigatório'),
  uf: yup.string().required('Campo obrigatório'),
  sigla: yup.string().required('Campo obrigatório'),
  
  
/*   unit: yup.string().required('Campo obrigatório'),
  addons: yup.array().required('Campo obrigatório'), */
});

export const validate = (form: IFormData) => {
  try {
    schema.validateSync(form, { abortEarly: false });
    return null;
  } catch (error) {
    const validationError = error as yup.ValidationError;
    const errorsMap = validationError.inner.reduce((acc, item) => {
      return { ...acc, [item.path as string]: item.message };
    }, {});
    return errorsMap as IFormDataErrors;
  }
};

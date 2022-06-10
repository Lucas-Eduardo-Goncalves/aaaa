import Styled from 'styled-components';
import { Card } from 'antd';

export const CardWrapper = Styled(Card)`
  header {
    display: flex;
   
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .left-header {
    display: flex;
    align-items: center;
    background: red;

    h4 {
      margin: 0;
      margin-right: 16px;
    }

    button {
      margin-right: 16px;
    }
  }

  .actions {
    button {
      margin-left: 14px;
    }
  }
`;

export const FiltersWrapper = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .ant-picker {
    width: 100%;
  }

  .ant-picker-input input {
    padding: 10px;
  }

  footer {
    display: flex;
    flex-direction: column;

    button {
      margin-bottom: 8px;
    }
  }
`;

export const FormWrapper = Styled.div`
  .ant-picker {
    width: 100%;
  }

  .ant-form-item-has-error .ant-picker {
    border-color: red !important;
  }

  .ant-picker-input input {
    padding: 10px;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 30px;

    button {
      margin-left: 16px;
    }
  }
`;



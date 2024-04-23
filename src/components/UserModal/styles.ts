import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: #fff;
  color: #000;
  border-radius: 8px;

  h2 {
    margin-bottom: 16px;
    font-size: 24px;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
`;

export { ModalWrapper, Form, Label, Input, Button, CancelButton };

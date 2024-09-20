// components/FormGroup.js
import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: black;
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #374151;
  color: white;
  font-size: 1rem;
  margin-bottom: 5px;
  &:focus {
    outline: none;
    border: 2px solid #3b82f6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #374151;
  color: white;
  font-size: 1rem;
  &:focus {
    outline: none;
    border: 2px solid #3b82f6;
  }
`;

const FormGroup = ({ label, type, value, onChange, placeholder, isTextArea, name }) => (
  <Group>
    <Label>{label}</Label>
    {isTextArea ? (
      <TextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    ) : (
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    )}
  </Group>
);

export default FormGroup;

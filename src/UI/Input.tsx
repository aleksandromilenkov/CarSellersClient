import styled from "styled-components";

export const Input = styled.input`
  width: 100%; /* Full width */
  padding: 10px; /* Padding inside input */
  border: 1px solid #ccc; /* Border */
  border-radius: 4px; /* Rounded corners */
  font-size: 16px; /* Font size */
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff; /* Change border color on focus */
    outline: none; /* Remove outline */
  }
`;
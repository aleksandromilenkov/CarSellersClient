import styled from "styled-components";

export const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff; /* Button color */
  color: white; /* Text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;
import React from 'react';
import styled from 'styled-components';
import Button from './Button';

// Define the props interface
interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
}

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  background-color: rgba(0, 0, 0, 0.4);
    @media (max-width: 768px) {
    text-align:center;
  }
  }

  & h3 {
        @media (max-width: 490px) {
   align-self:center;
  }
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
      @media (max-width: 670px) {
    justify-content: flex-start;
  }
  }

  
  @media (max-width: 768px) {
    width: 28rem;
  }

    @media (max-width: 468px) {
    width: 24rem;
  }
  
`;


const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  resourceName,
  onConfirm,
  disabled = false,
  onCloseModal,
}) => {
    console.log(onCloseModal)
  const onConfirmHandler = () => {
    onConfirm();
    onCloseModal && onCloseModal();
  };

  return (
    <StyledConfirmDelete>
      <h3 style={{backgroundColor: "rgba(255, 0, 0, 0.4)", width: "fit-content"}}>Delete {resourceName}</h3>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={onConfirmHandler}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
};

export default ConfirmDelete;

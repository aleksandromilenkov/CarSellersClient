import styled, { css, DefaultTheme } from 'styled-components';

// Define the possible values for size and variation
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariation = 'primary' | 'secondary' | 'danger';

// Define the props interface for the Button
interface ButtonProps {
  size?: ButtonSize;
  variation?: ButtonVariation;
}

// Define the styles for each size
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;  
  @media (max-width: 670px) {
    font-size: 0.9rem;
    padding: 0.2rem 0.4rem;
  }
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
      @media (max-width: 670px) {
    font-size: 1rem;
    padding: 0.7rem 0.9rem;
  }
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
      @media (max-width: 670px) {
    font-size: 1.1rem;
    padding: 0.7rem 1.1rem;
  }
  `,
};

// Define the styles for each variation
const variations = {
  primary: css`
    color: blue;
    background-color: white;

    &:hover {
      background-color: green;
    }
  `,
  secondary: css`
    color: grey;
    background: black;
    border: 1px solid grey;

    &:hover {
      background-color: orange;
    }
  `,
  danger: css`
    color: white;
    background-color: red;

    &:hover {
      background-color: orangered;
    }
  `,
};

// Create the Button styled component
const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 1px;
  cursor: pointer;
  ${(props) => sizes[props.size || 'medium']}
  ${(props) => variations[props.variation || 'primary']}
`;

// Default props for the Button
Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default Button;

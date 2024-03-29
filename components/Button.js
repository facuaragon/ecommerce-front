import { primary } from "@/lib/colors";
import styled, { css } from "styled-components";
export const ButtonStyle = css`
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.white &&
    !props.outlined &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outlined &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

${(props) =>
    props.black &&
    !props.outlined &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outlined &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
  ${(props) =>
    props.primary &&
    !props.outlined &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};

      color: #fff;
    `};
  ${(props) =>
    props.primary &&
    props.outlined &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};

      color: ${primary};
    `};
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 25px;
      svg {
        height: 20px;
      }
    `};
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.checkout &&
    css`
      margin-top: 30px;
      height: 30px;
      width: 100%;
    `}
    ${(props) =>
    props.disabled &&
    css`
      background-color: #cccc;
      cursor: not-allowed;
    `}
`;
const StyledButton = styled.button`
  ${ButtonStyle}
`;
export default function Button({ children, ...rest }) {
  return (
    <>
      <StyledButton {...rest}>{children}</StyledButton>
    </>
  );
}

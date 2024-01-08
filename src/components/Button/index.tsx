import { MouseEventHandler } from "react";
import styled, { CSSProperties } from "styled-components";

interface Props {
  children: React.ReactNode;
  height: string;
  width: string;
  background: string;
  fontSize: string;
  fontColor: string;
  customStyle?: CSSProperties;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface ButtonPropsType {
  height: string;
  width: string;
  $background: string;
  fontSize: string;
  $fontColor: string;
}

const Button = styled.button<ButtonPropsType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.$background};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.$fontColor};
  border: none;
  outline: none;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MyButton: React.FC<Props> = ({
  children,
  height,
  width,
  background,
  fontColor,
  fontSize,
  customStyle,
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      disabled={disabled}
      height={height}
      width={width}
      $background={background}
      $fontColor={fontColor}
      fontSize={fontSize}
      style={customStyle}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default MyButton;

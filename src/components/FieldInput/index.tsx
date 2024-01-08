"use client";

import { ChangeEvent } from "react";
import styled from "styled-components";
import SelectWithSearch from "../SelectWithSearch";
import ImageUpload from "../ImageUpload";

const Container = styled.div`
  width: 100%;
  padding: 5px 0px;
  font-size: 15px;
  display: flex;
  flex-flow: row wrap;
`;

const FieldTitle = styled.div`
  width: 20%;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  display: flex;
`;

const FieldInputContainer = styled.div`
  flex: 1;
  .input,
  .textarea {
    padding: 10px 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    width: 100%;
    border-radius: 5px;
    outline: none;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.4);
      font-weight: 500;
    }
  }
  .textarea {
    min-height: 200px;
  }
`;

const InputWrapper = styled.div`
  cursor: pointer;
  input {
    pointer-events: none;
  }
`;

type Props = {
  title: string;
  value?: any;
  required?: boolean;
  type?: "input" | "textarea" | "select" | "button" | "image" | "images";
  onRemoveItem?: (value: string) => void;
  placeholder?: string;
  onClickBTNInput?: () => void;
  onChange: (value: any) => void;
  options?: any[];
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
};

const FieldInput: React.FC<Props> = ({
  title,
  value = "",
  placeholder = "",
  onClickBTNInput,
  type = "input",
  onChange,
  onRemoveItem,
  options,
  required = true,
  style,
  titleStyle,
}) => {
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!onChange) return;
    onChange(e.target.value);
  };

  const getInputType = () => {
    let inputComponent: React.ReactNode;
    switch (type) {
      case "input":
        inputComponent = (
          <input
            className="input"
            onChange={handleOnChange}
            value={value}
            placeholder={placeholder}
          />
        );
        break;
      case "textarea":
        inputComponent = (
          <textarea
            className="textarea"
            onChange={handleOnChange}
            value={value}
            placeholder={placeholder}
          />
        );
        break;
      case "button":
        inputComponent = (
          <InputWrapper onClick={onClickBTNInput}>
            <input
              className="input"
              placeholder={placeholder}
              readOnly
              value={value}
            />
          </InputWrapper>
        );
        break;
      case "select":
        if (!options) return;
        inputComponent = (
          <SelectWithSearch
            selectedItem={
              value
                ? {
                    label: value + "",
                    value: value,
                  }
                : null
            }
            dropdownItems={options.map((option) => {
              return {
                label: option.toString(),
                value: option,
              };
            })}
            onSelectItem={(selectedItem) => onChange(selectedItem.value)}
            footer={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  boxSizing: "border-box",
                  paddingLeft: "10px",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "#0061FF",
                }}
              >
                + Add new attribute value
              </div>
            }
          />
        );
        break;
      // case "image":
      //   inputComponent = <ImageUpload onUploadSuccess={} width="50px" height="50px" />;
      //   break;
      case "images":
        inputComponent = (
          <div style={{ display: "flex", flexFlow: "row wrap", gap: "5px" }}>
            {value.map((url: string, index: number) => (
              <ImageUpload
                key={index}
                onUploadSuccess={(url) => onChange(url)}
                onRemove={() => onRemoveItem && onRemoveItem(url)}
                width="50px"
                height="50p"
              />
            ))}
          </div>
        );

        break;
    }
    return inputComponent;
  };

  return (
    <Container style={style}>
      <FieldTitle style={titleStyle}>
        {required && (
          <span style={{ color: "red", marginRight: "5px" }}>*</span>
        )}
        {title}
      </FieldTitle>
      <FieldInputContainer>{getInputType()}</FieldInputContainer>
    </Container>
  );
};

export default FieldInput;

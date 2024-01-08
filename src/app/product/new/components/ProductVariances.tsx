"use client";

import FieldInput from "@/components/FieldInput";
import { TCategoryDetails } from "@/types/api.type";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

const BaseContentHolder = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: rgb(255, 255, 255);
`;

const ContentWithHeader = styled(BaseContentHolder)`
  display: flex;
  flex-flow: column;
  padding: 20px 20px;
`;

const ContentTitle = styled.div`
  width: 100%;
  padding: 5px 0px 20px 0px;
  font-size: 20px;
  font-weight: 600;
`;

const VarianceItem = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  margin-bottom: 5px;
  display: flex;
  flex-flow: column wrap;
  padding: 10px;
`;

const VarianceAttributeName = styled.div`
  width: 100%;
  height: 40px;
`;

const VarianceAttributeValuesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const VarianceAttributeValue = styled.div`
  width: 49%;
  background: green;
  display: flex;
  flex-flow: row;
  margin-bottom: 10px;
  input {
    width: 100%;
  }
`;

const VarianceTable = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const VarianceTableHeaders = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  height: 50px;
  display: flex;
  flex-flow: row wrap;
`;

const VarianceTableHeader = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  box-sizing: border-box;
  padding-left: 15px;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const VarianceRow = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 50px;
  &.hide {
    display: none;
  }
`;

const VarianceRowCol = styled.div`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  display: flex;
  flex-flow: column wrap;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  /* padding-top: 15px; */
  /* padding-bottom: 15px; */
`;

const VarianceRowColRow = styled.div`
  width: 100%;
  padding: 10px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  input {
    outline: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
  }
  &.hide {
    display: none;
  }
`;

type TProductVariance = {
  attributeName: string;
  values: any[];
};

const ProductVariances = ({}: {}) => {
  const [productVariances, setProductVariances] = useState<TProductVariance[]>(
    []
  );

  const addNewProductVariance = () => {
    if (productVariances.length < 2) {
      setProductVariances((oldValue) => [
        ...oldValue,
        { attributeName: "unname" + (oldValue.length + 1), values: [""] },
      ]);
    }
  };

  const handleOnChangeAtrrValue = (
    e: ChangeEvent<HTMLInputElement>,
    valueIndex: number,
    varIndex: number
  ) => {
    const updatedProductVariances = [...productVariances];
    updatedProductVariances[varIndex].values[valueIndex] = e.target.value;

    if (valueIndex + 1 === updatedProductVariances[varIndex].values.length) {
      updatedProductVariances[varIndex].values.push("");
    }

    setProductVariances(updatedProductVariances);
  };

  const handleOnChangeAtrrName = (
    e: ChangeEvent<HTMLInputElement>,
    varIndex: number
  ) => {
    const updatedProductVariances = [...productVariances];
    updatedProductVariances[varIndex].attributeName = e.target.value;
    setProductVariances(updatedProductVariances);
  };

  return (
    <ContentWithHeader>
      <ContentTitle>Sales information</ContentTitle>
      <button onClick={() => addNewProductVariance()}>Add</button>
      {productVariances.map((item, varIndex) => (
        <VarianceItem key={varIndex}>
          <VarianceAttributeName>
            <input
              value={item.attributeName}
              onChange={(e) => handleOnChangeAtrrName(e, varIndex)}
            />
          </VarianceAttributeName>
          <VarianceAttributeValuesContainer>
            {item.values.map((value, vIndex) => (
              <VarianceAttributeValue key={vIndex}>
                <input
                  value={value}
                  onChange={(e) => handleOnChangeAtrrValue(e, vIndex, varIndex)}
                  placeholder="input here"
                />
              </VarianceAttributeValue>
            ))}
          </VarianceAttributeValuesContainer>
        </VarianceItem>
      ))}
      {productVariances.length > 0 && (
        <VarianceTable>
          <VarianceTableHeaders>
            {productVariances.map((item, varIndex) => (
              <VarianceTableHeader key={varIndex}>
                {item.attributeName}
              </VarianceTableHeader>
            ))}
            <VarianceTableHeader>Price</VarianceTableHeader>
            <VarianceTableHeader>Quantity</VarianceTableHeader>
          </VarianceTableHeaders>
          {productVariances[0].values.map((value, vIndex) => (
            <VarianceRow
              className={value.length === 0 ? "hide" : ""}
              key={vIndex}
            >
              <VarianceRowCol>
                <span style={{ marginLeft: "10px" }}>{value}</span>
              </VarianceRowCol>
              {productVariances[1] && (
                <VarianceRowCol>
                  {productVariances[1].values.map((value2, vIndex2) => (
                    <VarianceRowColRow
                      className={value2.length === 0 ? "hide" : ""}
                      key={vIndex2}
                    >
                      {value2}
                    </VarianceRowColRow>
                  ))}
                </VarianceRowCol>
              )}

              <VarianceRowCol>
                {productVariances[1] &&
                productVariances[1].values[0].length > 0 ? (
                  productVariances[1].values.map((value2, vIndex2) => (
                    <VarianceRowColRow
                      className={value2.length === 0 ? "hide" : ""}
                      key={vIndex2}
                    >
                      <input type="number" defaultValue={0} />
                    </VarianceRowColRow>
                  ))
                ) : (
                  <VarianceRowColRow>
                    <input type="number" defaultValue={0} />
                  </VarianceRowColRow>
                )}
              </VarianceRowCol>
              <VarianceRowCol>
                {productVariances[1] &&
                productVariances[1].values[0].length > 0 ? (
                  productVariances[1].values.map((value2, vIndex2) => (
                    <VarianceRowColRow
                      className={value2.length === 0 ? "hide" : ""}
                      key={vIndex2}
                    >
                      <input />
                    </VarianceRowColRow>
                  ))
                ) : (
                  <VarianceRowColRow>
                    <input />
                  </VarianceRowColRow>
                )}
              </VarianceRowCol>
            </VarianceRow>
          ))}
        </VarianceTable>
      )}
      {/* <FieldInput
        style={{ width: "100%" }}
        titleStyle={{ alignItems: "center" }}
        type="button"
        title={"Product variances"}
        required={false}
        value={""}
        onClickBTNInput={() => alert(true)}
        onChange={(value) => {}}
      /> */}
    </ContentWithHeader>
  );
};

export default ProductVariances;

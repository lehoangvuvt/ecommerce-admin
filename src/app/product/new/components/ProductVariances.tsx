"use client";

import ImageUpload from "@/components/ImageUpload";
import { ChangeEvent } from "react";
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

export type TProductVariance = {
  mainAttribute: {
    attributeName: string;
    value: string;
  };
  imageURL: string | null;
  subAttribute: {
    attributeName: string;
    values: {
      value: string;
      qty: number;
      price: number;
    }[];
  } | null;
};

type Props = {
  productVariances: TProductVariance[];
  setProductVariances: (productVariances: TProductVariance[]) => void;
  addNewProductVariance: () => void;
};

const ProductVariances: React.FC<Props> = ({
  productVariances,
  setProductVariances,
  addNewProductVariance,
}) => {
  const handleOnChangeAtrrValue = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    type: "main" | "sub"
  ) => {
    let updatedProductVariances = structuredClone(productVariances);
    if (type === "main") {
      updatedProductVariances[index].mainAttribute.value = e.target.value;
      if (index + 1 === updatedProductVariances.length) {
        updatedProductVariances.push({
          imageURL: "",
          mainAttribute: {
            attributeName:
              updatedProductVariances[index].mainAttribute.attributeName,
            value: "",
          },
          subAttribute: null,
        });
      }
    } else {
      updatedProductVariances = updatedProductVariances.map((item) => {
        return {
          ...item,
          subAttribute: {
            ...item.subAttribute,
            values: item.subAttribute?.values.map((subAtrr, subArrIndex) => {
              if (subArrIndex === index) {
                return {
                  ...subAtrr,
                  value: e.target.value,
                };
              } else {
                return subAtrr;
              }
            }),
          },
        };
      }) as TProductVariance[];
    }
    if (index + 1 === updatedProductVariances[0].subAttribute?.values.length) {
      updatedProductVariances = updatedProductVariances.map((item) => {
        return {
          ...item,
          subAttribute: {
            ...item.subAttribute,
            values: [
              ...(item.subAttribute?.values as any[]),
              {
                value: "",
                qty: 0,
                price: 0,
              },
            ],
          },
        };
      }) as TProductVariance[];
    }
    setProductVariances(updatedProductVariances);
  };

  const handleOnChangeAtrrName = (
    e: ChangeEvent<HTMLInputElement>,
    type: "main" | "sub"
  ) => {
    let updatedProductVariances: TProductVariance[] = [];
    if (type === "main") {
      updatedProductVariances = productVariances.map((item) => {
        return {
          ...item,
          mainAttribute: {
            ...item.mainAttribute,
            attributeName: e.target.value,
          },
        };
      });
    } else {
      updatedProductVariances = productVariances.map((item) => {
        return {
          ...item,
          subAttribute: {
            ...item.subAttribute,
            attributeName: e.target.value,
          },
        };
      }) as TProductVariance[];
    }
    setProductVariances(updatedProductVariances);
  };

  const handleOnUploadSuccess = (url: string, vIndex: number) => {
    const updatedProductVariances = [...productVariances];
    updatedProductVariances[vIndex].imageURL = url;
    setProductVariances(updatedProductVariances);
  };

  const handleOnRemoveImg = (vIndex: number) => {
    const updatedProductVariances = [...productVariances];
    updatedProductVariances[vIndex].imageURL = null;
    setProductVariances(updatedProductVariances);
  };

  const handleChangeField = (
    field: "price" | "qty",
    value: string,
    subAtrrIndex: number,
    mainAtrrIndex: number
  ) => {
    const updatedProductVariances = [...productVariances];
    if (updatedProductVariances[mainAtrrIndex].subAttribute) {
      const subAtrr = updatedProductVariances[mainAtrrIndex].subAttribute;
      if (subAtrr && subAtrr.values[subAtrrIndex]) {
        subAtrr.values[subAtrrIndex][field] = parseInt(value);
        updatedProductVariances[mainAtrrIndex].subAttribute = subAtrr;
      }
    }

    console.log(updatedProductVariances);
    setProductVariances(updatedProductVariances);
  };

  return (
    <ContentWithHeader>
      <ContentTitle>Sales information</ContentTitle>
      <button onClick={addNewProductVariance}>Add</button>
      {productVariances.length > 0 && (
        <>
          <VarianceItem>
            <VarianceAttributeName>
              <input
                value={productVariances[0].mainAttribute.attributeName}
                onChange={(e) => handleOnChangeAtrrName(e, "main")}
              />
            </VarianceAttributeName>
            <VarianceAttributeValuesContainer>
              {productVariances.map((mainAtrr, mainAtrrIndex) => (
                <VarianceAttributeValue key={mainAtrrIndex}>
                  <input
                    value={mainAtrr.mainAttribute.value}
                    onChange={(e) =>
                      handleOnChangeAtrrValue(e, mainAtrrIndex, "main")
                    }
                    placeholder="input here"
                  />
                </VarianceAttributeValue>
              ))}
            </VarianceAttributeValuesContainer>
          </VarianceItem>
          {productVariances[0].subAttribute && (
            <VarianceItem>
              <VarianceAttributeName>
                <input
                  value={productVariances[0].subAttribute.attributeName}
                  onChange={(e) => handleOnChangeAtrrName(e, "sub")}
                />
              </VarianceAttributeName>
              <VarianceAttributeValuesContainer>
                {productVariances[0].subAttribute.values.map(
                  (subAtrr, subAtrrIndex) => (
                    <VarianceAttributeValue key={subAtrrIndex}>
                      <input
                        value={subAtrr.value}
                        onChange={(e) =>
                          handleOnChangeAtrrValue(e, subAtrrIndex, "sub")
                        }
                        placeholder="input here"
                      />
                    </VarianceAttributeValue>
                  )
                )}
              </VarianceAttributeValuesContainer>
            </VarianceItem>
          )}
        </>
      )}

      {productVariances.length > 0 && (
        <VarianceTable>
          <VarianceTableHeaders>
            <VarianceTableHeader>
              {productVariances[0].mainAttribute.attributeName}
            </VarianceTableHeader>
            {productVariances[0].subAttribute && (
              <VarianceTableHeader>
                {productVariances[0].subAttribute.attributeName}
              </VarianceTableHeader>
            )}
            <VarianceTableHeader>Price</VarianceTableHeader>
            <VarianceTableHeader>Quantity</VarianceTableHeader>
          </VarianceTableHeaders>
          {productVariances.map((item, mainAtrrIndex) => (
            <VarianceRow
              className={item.mainAttribute.value.length === 0 ? "hide" : ""}
              key={mainAtrrIndex}
            >
              <VarianceRowCol>
                <span
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    padding: "15px",
                  }}
                >
                  {item.mainAttribute.value}
                  <ImageUpload
                    uploadedURL={item.imageURL}
                    onRemove={() => handleOnRemoveImg(mainAtrrIndex)}
                    onUploadSuccess={(url) =>
                      handleOnUploadSuccess(url, mainAtrrIndex)
                    }
                  />
                </span>
              </VarianceRowCol>
              {item.subAttribute && (
                <VarianceRowCol>
                  {item.subAttribute.values &&
                    item.subAttribute.values.map(
                      (subAttributeItem, subAttrIndex) => (
                        <VarianceRowColRow
                          className={
                            subAttributeItem.value?.length === 0 ? "hide" : ""
                          }
                          key={subAttrIndex}
                        >
                          {subAttributeItem.value}
                        </VarianceRowColRow>
                      )
                    )}
                </VarianceRowCol>
              )}

              <VarianceRowCol>
                {item.subAttribute && item.subAttribute.values?.length > 0 ? (
                  item.subAttribute.values.map((subAttribute, subAtrrIndex) => (
                    <VarianceRowColRow
                      className={subAttribute.value?.length === 0 ? "hide" : ""}
                      key={subAtrrIndex}
                    >
                      <input
                        type="number"
                        value={subAttribute.price}
                        onChange={(e) =>
                          handleChangeField(
                            "price",
                            e.target.value,
                            subAtrrIndex,
                            mainAtrrIndex
                          )
                        }
                      />
                    </VarianceRowColRow>
                  ))
                ) : (
                  <VarianceRowColRow>
                    <input
                      type="number"
                      // onChange={(e) =>
                      //   handleChangeField("price", e.target.value, vIndex, 0)
                      // }
                      value={0}
                    />
                  </VarianceRowColRow>
                )}
              </VarianceRowCol>
              <VarianceRowCol>
                {item.subAttribute && item.subAttribute.values?.length > 0 ? (
                  item.subAttribute.values.map((subAtrribute, subAtrrIndex) => (
                    <VarianceRowColRow
                      className={subAtrribute.value?.length === 0 ? "hide" : ""}
                      key={subAtrrIndex}
                    >
                      <input
                        value={subAtrribute.qty}
                        onChange={(e) =>
                          handleChangeField(
                            "qty",
                            e.target.value,
                            subAtrrIndex,
                            mainAtrrIndex
                          )
                        }
                      />
                    </VarianceRowColRow>
                  ))
                ) : (
                  <VarianceRowColRow>
                    <input
                      type="number"
                      // onChange={(e) =>
                      //   handleChangeField("qty", e.target.value, vIndex, 0)
                      // }
                      value={0}
                    />
                  </VarianceRowColRow>
                )}
              </VarianceRowCol>
            </VarianceRow>
          ))}
        </VarianceTable>
      )}
    </ContentWithHeader>
  );
};

export default ProductVariances;

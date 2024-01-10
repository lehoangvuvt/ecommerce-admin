"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import PopupCategories from "./components/popupCategories";
import useCategories from "@/react-query/hooks/useCategories";
import useCategoryDetails from "@/react-query/hooks/useCategoryDetails";
import FieldInput from "@/components/FieldInput";
import useForm from "@/hooks/useForm";
import ProductCategoryAttributes from "./components/ProductCategoryAttributes";
import ProductVariances, {
  TProductVariance,
} from "./components/ProductVariances";
import { TCreateProductData, TApiProducVariance } from "@/types/api.type";
import { ProductService } from "@/services/product.service";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px 50px;
  position: relative;
`;

const Left = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  height: 100%;
  width: 20%;
`;

const Right = styled.div`
  top: 20px;
  left: 23%;
  width: 70%;
  position: absolute;
  display: flex;
  flex-flow: column;
  gap: 20px;
  min-height: 2000px;
`;

const BaseContentHolder = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: rgb(255, 255, 255);
`;

export const ContentWithHeader = styled(BaseContentHolder)`
  display: flex;
  flex-flow: column;
  padding: 20px 20px;
`;

export const ContentTitle = styled.div`
  width: 100%;
  padding: 5px 0px 20px 0px;
  font-size: 20px;
  font-weight: 600;
`;

const AddNewProduct = () => {
  const [isOpenCategoriesPopup, setOpenCategoriesPopup] = useState(false);
  const {
    categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
  } = useCategories(isOpenCategoriesPopup);

  const initialFormValues = {
    selectedCategoryPath: "",
    productName: "",
    productDescription: "",
    productImages: [],
  };
  const { values, setValue } = useForm<{
    selectedCategoryPath: "selectedCategoryPath";
    productName: "productName";
    productDescription: "productDescription";
    productImages: "productImages";
  }>(initialFormValues);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [productAttributes, setProductAttributes] = useState<{
    [key: string]: any;
  }>({});
  const {
    categoryDetails,
    isError: isErrorCategoryDetails,
    isLoading: isLoadingCategoryDetails,
  } = useCategoryDetails(selectedCategoryId);
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>(
    null
  );
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [productVariances, setProductVariances] = useState<TProductVariance[]>(
    []
  );

  useEffect(() => {
    if (
      categoryDetails &&
      categoryDetails.groupedAttributeWithValues.length > 0
    ) {
      const { groupedAttributeWithValues } = categoryDetails;
      let productAttributes: { [key: string]: any } = {};
      groupedAttributeWithValues.forEach((item) => {
        productAttributes[item.id] = null;
      });
      setProductAttributes(productAttributes);
    }
  }, [categoryDetails]);

  const addProduct = async () => {
    const formattedProductVariances: TApiProducVariance[] = [];
    productVariances
      .filter((item) => item.mainAttribute.value !== "")
      .forEach((pVariance) => {
        const attributeName = pVariance.mainAttribute.attributeName;
        formattedProductVariances.push({
          mainAttribute: {
            name: attributeName,
            value: pVariance.mainAttribute.value,
          },
          imageURL: pVariance.imageURL ?? "",
          subAttribute: {
            name: pVariance.subAttribute?.attributeName ?? "",
            values: pVariance.subAttribute
              ? pVariance.subAttribute.values
                  .filter((subAtrr) => subAtrr.value !== "")
                  .map((subAtrrValue) => {
                    return {
                      price: subAtrrValue.price,
                      quantity: subAtrrValue.qty,
                      value: subAtrrValue.value,
                    };
                  })
              : [],
          },
        });
      });
    const data: TCreateProductData = {
      brand_id: selectedBrandId ?? "",
      category_id: selectedCategoryId,
      description: values.productDescription,
      product_name: values.productName,
      productAttributes: productAttributes,
      productVariances: formattedProductVariances,
      images: values.productImages,
    };
    const response = await ProductService.createProduct(data);
    if (response) {
      alert(true);
    } else {
      alert(false);
    }
  };

  const handleAddNewProductVariance = () => {
    if (productVariances.length === 0) {
      setProductVariances([
        {
          imageURL: "",
          mainAttribute: { attributeName: "main_unname", value: "" },
          subAttribute: null,
        },
      ]);
    } else {
      if (productVariances[0].subAttribute === null) {
        const updatedProductVariances = productVariances.map((item) => {
          return {
            ...item,
            subAttribute: {
              attributeName: "sub_unname",
              values: [
                {
                  value: "",
                  qty: 0,
                  price: 0,
                },
              ],
            },
          };
        });
        setProductVariances(updatedProductVariances);
      }
    }
  };

  return (
    <Container>
      <Left>
        <BaseContentHolder style={{ height: "100px" }}></BaseContentHolder>
      </Left>
      <Right>
        <ContentWithHeader>
          <ContentTitle>Basic information</ContentTitle>
          <FieldInput
            title="Product images"
            type="images"
            placeholder="Input here"
            onChange={(url) => {
              const currentImages = [...values.productImages];
              currentImages.push(url);
              setValue(currentImages, "productImages");
            }}
            onRemoveItem={(_url) => {
              let updatedImages = [...values.productImages];
              const index = updatedImages.findIndex((url) => url === _url);
              updatedImages[index] = null;
              let newArr: string[] = [];
              updatedImages.forEach((url) => {
                if (url !== null) {
                  newArr.push(url);
                }
              });
              setValue(newArr, "productImages");
            }}
            value={values.productImages}
          />
          <FieldInput
            title="Product name"
            type="input"
            placeholder="Input here"
            onChange={(value) => setValue(value, "productName")}
            value={values.productName}
          />
          <FieldInput
            onClickBTNInput={() => setOpenCategoriesPopup(true)}
            title="Category"
            type="button"
            placeholder="Select category"
            onChange={(value) => setSelectedCategoryId(value)}
            value={values.selectedCategoryPath}
          />
          <FieldInput
            title="Product description"
            type="textarea"
            onChange={(value) => setValue(value, "productDescription")}
            value={values.productDescription}
          />
        </ContentWithHeader>

        {categoryDetails && (
          <>
            <ProductCategoryAttributes
              selectedBrandName={selectedBrandName}
              onSetSelectedBrandId={(id) => setSelectedBrandId(id)}
              onSetSelectedBrandName={(name) => setSelectedBrandName(name)}
              categoryDetails={categoryDetails}
              productAttributes={productAttributes}
              setProductAttributes={(updatedProductAttributes) =>
                setProductAttributes(updatedProductAttributes)
              }
            />
          </>
        )}
        <ProductVariances
          productVariances={productVariances}
          setProductVariances={(productVariances) =>
            setProductVariances(productVariances)
          }
          addNewProductVariance={handleAddNewProductVariance}
        />
        <button onClick={() => addProduct()}>Add</button>
      </Right>
      {isOpenCategoriesPopup && (
        <PopupCategories
          selectCategory={(category) => {
            setSelectedCategoryId(category.id);
            setValue(category.path, "selectedCategoryPath");
          }}
          togglePopup={() => setOpenCategoriesPopup(false)}
          categories={categories}
        />
      )}
    </Container>
  );
};

export default AddNewProduct;

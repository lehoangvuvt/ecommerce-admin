"use client";

import { useState } from "react";
import styled from "styled-components";
import PopupCategories from "./components/popupCategories";
import useCategories from "@/react-query/hooks/useCategories";
import useCategoryDetails from "@/react-query/hooks/useCategoryDetails";
import FieldInput from "@/components/FieldInput";
import useForm from "@/hooks/useForm";
import ProductCategoryAttributes from "./components/ProductCategoryAttributes";
import ProductVariances from "./components/ProductVariances";
import ImageUpload from "@/components/ImageUpload";

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
  width: 68%;
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
    productImages: [""],
  };
  const { values, setValue } = useForm<{
    selectedCategoryPath: "selectedCategoryPath";
    productName: "productName";
    productDescription: "productDescription";
    productImages: [""];
  }>(initialFormValues);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const {
    categoryDetails,
    isError: isErrorCategoryDetails,
    isLoading: isLoadingCategoryDetails,
  } = useCategoryDetails(selectedCategoryId);

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
              const updatedImages = [...values.productImages];
              updatedImages[updatedImages.length - 1] = url;
              setValue([...updatedImages, ""], "productImages");
            }}
            onRemoveItem={(_url) => {
              let updatedImages = [...values.productImages];
              const index = updatedImages.findIndex((url) => url === _url);
              updatedImages.splice(index, 1);
              setValue(updatedImages, "productImages");
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
            onChange={(value) => {}}
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
            <ProductCategoryAttributes categoryDetails={categoryDetails} />
          </>
        )}
        <ProductVariances />
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

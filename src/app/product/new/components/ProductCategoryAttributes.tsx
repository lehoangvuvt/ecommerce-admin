"use client";

import FieldInput from "@/components/FieldInput";
import { TCategoryDetails } from "@/types/api.type";
import { ContentTitle, ContentWithHeader } from "../page";

type Props = {
  productAttributes: { [key: string]: any };
  setProductAttributes: (updatedProductAttributes: {
    [key: string]: any;
  }) => void;
  categoryDetails: TCategoryDetails;
  selectedBrandName: string | null;
  onSetSelectedBrandName: (name: string | null) => void;
  onSetSelectedBrandId: (id: string) => void;
};

const ProductCategoryAttributes: React.FC<Props> = ({
  productAttributes,
  categoryDetails,
  selectedBrandName,
  setProductAttributes,
  onSetSelectedBrandName,
  onSetSelectedBrandId,
}) => {
  const handleOnChangeAttribute = (value: any, attributeId: string) => {
    const updatedProductAttributes = Object.assign({}, productAttributes);
    updatedProductAttributes[attributeId] = value;
    setProductAttributes(updatedProductAttributes);
  };

  const handleSelectBrand = (value: any) => {
    if (!categoryDetails) return;
    onSetSelectedBrandName(value);
    const brand = categoryDetails.brands.find(
      (brand) => brand.brand_name === value
    );
    if (brand) onSetSelectedBrandId(brand.id);
  };

  return (
    <ContentWithHeader>
      <ContentTitle>Details</ContentTitle>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
        }}
      >
        {categoryDetails.brands.length > 0 && (
          <FieldInput
            titleStyle={{ alignItems: "center" }}
            style={{ width: "46%" }}
            type="select"
            title={"Brand"}
            required={true}
            options={categoryDetails.brands.map((brand) => brand.brand_name)}
            value={selectedBrandName}
            onChange={(value) => handleSelectBrand(value)}
          />
        )}
        {categoryDetails.groupedAttributeWithValues.map((item) => (
          <FieldInput
            style={{ width: "46%" }}
            titleStyle={{ alignItems: "center" }}
            key={item.id}
            type="select"
            title={item.attribute_name}
            required={false}
            options={item.values}
            value={productAttributes[item.id]}
            onChange={(value) => handleOnChangeAttribute(value, item.id)}
          />
        ))}
      </div>
    </ContentWithHeader>
  );
};

export default ProductCategoryAttributes;

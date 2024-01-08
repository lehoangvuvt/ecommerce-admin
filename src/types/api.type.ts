export type TBase = {
  id: string;
  createdAt: string;
  updatedAt: string | null;
};

export type TCategory = {
  category_name: string;
  parent_category_id: string | null;
  child: TCategory[];
} & TBase;

export type AttributeWithValues =
  | AttributeWithStringValues
  | AttributeWithNumberValues;

export type AttributeWithStringValues = {
  attribute_name: string;
  id: string;
  value_type: "string";
  values: string[];
};

export type AttributeWithNumberValues = {
  attribute_name: string;
  id: string;
  value_type: "number";
  values: number[];
};

export type TCategoryDetails = {
  brands: TBrand[];
  category_name: string;
  parent_category_id: string;
  groupedAttributeWithValues: AttributeWithValues[];
};

export type TBrand = {
  brand_name: string;
} & TBase;

export type TUploadFileData = {
  name: string;
  type: string;
  base64: string;
};

export type TUploadFileRes = {
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: "image" | "video" | "raw" | "auto";
  created_at: string;
  original_filename: string;
  secure_url: string;
};

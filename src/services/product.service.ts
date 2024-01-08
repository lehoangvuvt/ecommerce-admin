import baseAxios from "./baseAxios";
import { TCreateProductData } from "@/types/api.type";

const baseRoute = "product";

export const ProductService = {
  async createProduct(data: TCreateProductData): Promise<any> {
    try {
      const response = await baseAxios({
        url: `${baseRoute}`,
        method: "POST",
        data,
      });
      if (response.status === 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
};

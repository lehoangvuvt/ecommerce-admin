import baseAxios from "./baseAxios";

const baseRoute = "category";

export const CategoryService = {
  async getAllCategories(): Promise<any[]> {
    try {
      const response = await baseAxios({
        url: `${baseRoute}/`,
        method: "GET",
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  },
  async getCategoryDetails(categoryId: string): Promise<any> {
    try {
      const response = await baseAxios({
        url: `${baseRoute}/${categoryId}`,
        method: "GET",
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
};

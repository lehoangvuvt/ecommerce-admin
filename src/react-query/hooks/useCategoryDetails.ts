import { useQuery } from "react-query";
import REACT_QUERY_KEYS from "../keys";
import { CategoryService } from "@/services/category.service";
import { TCategoryDetails } from "@/types/api.type";

const getCategoryDetails = async ({ queryKey }: { queryKey: any[] }) => {
  const categoryId = queryKey[1];
  const data = await CategoryService.getCategoryDetails(categoryId);
  return data;
};

const useCategoryDetails = (categoryId: string | null) => {
  const { data, isError, isLoading } = useQuery(
    [REACT_QUERY_KEYS.GET_CATEGORY_DETAILS, categoryId],
    getCategoryDetails,
    {
      enabled: categoryId && categoryId.trim().length > 0 ? true : false,
    }
  );
  return {
    categoryDetails: data ? (data as TCategoryDetails) : null,
    isError,
    isLoading,
  };
};

export default useCategoryDetails;

import { useQuery } from "react-query";
import REACT_QUERY_KEYS from "../keys";
import { CategoryService } from "@/services/category.service";
import { TCategory } from "@/types/api.type";

const getAllCategories = async (): Promise<TCategory[]> => {
  const data = (await CategoryService.getAllCategories()) as TCategory[];
  return data;
};

const useCategories = (
  isOpenCategories: boolean
): {
  categories: TCategory[];
  isError: boolean;
  isLoading: boolean;
} => {
  const { data, isError, isLoading } = useQuery(
    [REACT_QUERY_KEYS.GET_ALL_CATEGORIES],
    getAllCategories,
    {
      enabled: isOpenCategories,
    }
  );
  return {
    categories: data ?? [],
    isError,
    isLoading,
  };
};

export default useCategories;

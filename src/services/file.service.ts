import baseAxios from "./baseAxios";
import { TUploadFileData, TUploadFileRes } from "@/types/api.type";

const baseRoute = "files";

export const FileService = {
  async upload(data: TUploadFileData): Promise<TUploadFileRes | null> {
    try {
      const response = await baseAxios({
        url: `${baseRoute}/upload`,
        method: "POST",
        data,
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

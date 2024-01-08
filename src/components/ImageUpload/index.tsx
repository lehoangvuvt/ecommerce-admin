"use client";

import styled from "styled-components";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { getBase64 } from "@/utils/file.utils";
import { FileService } from "@/services/file.service";
import { TUploadFileData } from "@/types/api.type";
import { ClipLoader } from "react-spinners";

const Container = styled.div<{ $width: string; $height: string }>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(255, 87, 0, 0.1);
  }
  &.uploading {
    border: none;
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.7);
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const PrimaryIconContainer = styled.div<{ $iconSize: number }>`
  color: #ff5700;
  font-size: ${(props) => props.$iconSize}px;
`;

const SubIconContainer = styled.div<{ $iconSize: number }>`
  color: #ff5700;
  font-size: ${(props) => props.$iconSize}px;
  position: absolute;
  background: white;
  width: ${(props) => props.$iconSize}px;
  height: ${(props) => props.$iconSize}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(70%, 70%);
`;

const UploadedImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  img {
    height: 100%;
    width: 100%;
  }
  &:hover {
    & > div {
      display: flex;
    }
  }
`;

const UploadedImageContainerFooter = styled.div`
  position: absolute;
  width: 100%;
  background-color: #616161;
  bottom: 0%;
  left: 0;
  display: none;
  color: rgba(255, 255, 255, 0.95);
  height: 20px;
  font-size: 20px;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  padding-right: 2px;
`;

type Props = {
  width?: string;
  height?: string;
  iconSize?: number;
  onUploadSuccess?: (url: string) => void;
  uploadedURL: string | null;
  onRemove?: () => void;
};

const ImageUpload: React.FC<Props> = ({
  width = "50px",
  height = "50px",
  iconSize = 24,
  uploadedURL,
  onUploadSuccess,
  onRemove,
}) => {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setUploading] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      getBase64(file, async (result, error) => {
        if (error) return;
        if (typeof result === "string") {
          const type = result.split(",")[0];
          const data: TUploadFileData = {
            base64: result,
            name: file.name,
            type,
          };
          setUploading(true);
          const response = await FileService.upload(data);
          if (response) {
            if (onUploadSuccess) onUploadSuccess(response.secure_url);
          }
          setUploading(false);
        }
      });
    }
  };

  const handleOnClickContainer = (e: MouseEvent<HTMLDivElement>) => {
    if (uploadInputRef && uploadInputRef.current) {
      if (uploadedURL) return;
      uploadInputRef.current.click();
    }
  };

  return (
    <Container
      style={{
        cursor: isUploading
          ? "not-allowed"
          : uploadedURL
          ? "all-scroll"
          : "pointer",
        borderStyle: uploadedURL ? "solid" : "dashed",
      }}
      className={isUploading ? "uploading" : ""}
      $width={width}
      $height={height}
      onClick={handleOnClickContainer}
    >
      {isUploading ? (
        <ClipLoader color="white" />
      ) : !uploadedURL ? (
        <>
          <PrimaryIconContainer $iconSize={iconSize}>
            <InsertPhotoOutlinedIcon color="inherit" fontSize="inherit" />
          </PrimaryIconContainer>
          <SubIconContainer $iconSize={iconSize / 2}>
            <AddIcon color="inherit" fontSize="inherit" />
          </SubIconContainer>
          <input
            ref={uploadInputRef}
            onChange={handleChange}
            style={{ display: "none", pointerEvents: "none" }}
            type="file"
          />
        </>
      ) : (
        <UploadedImageContainer>
          <img src={uploadedURL} alt="uploaded-image" />
          <UploadedImageContainerFooter>
            <DeleteIcon
              onClick={() => {
                if (onRemove) onRemove();
              }}
              style={{ cursor: "pointer" }}
              fontSize="inherit"
              color="inherit"
            />
          </UploadedImageContainerFooter>
        </UploadedImageContainer>
      )}
    </Container>
  );
};

export default ImageUpload;

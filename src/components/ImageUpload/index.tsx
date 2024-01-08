"use client";

import styled from "styled-components";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { getBase64 } from "@/utils/file.utils";
import { FileService } from "@/services/file.service";
import { TUploadFileData } from "@/types/api.type";

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
  onUploadSuccess: (url: string) => void;
  onRemove?: () => void;
};

const ImageUpload: React.FC<Props> = ({
  width = "50px",
  height = "50px",
  iconSize = 24,
  onUploadSuccess,
  onRemove,
}) => {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [uploadedURL, setUploadedURL] = useState<string | null>(null);
  const [isUploading, setUploading] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      getBase64(file, async (result, error) => {
        if (error) return;
        console.log(file);
        if (typeof result === "string") {
          const data: TUploadFileData = {
            base64: result,
            name: file.name,
            type: "png",
          };
          setUploading(true);
          const response = await FileService.upload(data);
          if (response) {
            setUploadedURL(response.secure_url);
            onUploadSuccess(response.secure_url);
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
        cursor: uploadedURL ? "all-scroll" : "pointer",
        borderStyle: uploadedURL ? "solid" : "dashed",
      }}
      $width={width}
      $height={height}
      onClick={handleOnClickContainer}
    >
      {isUploading ? (
        <p>Uploading</p>
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
                setUploadedURL(null);
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

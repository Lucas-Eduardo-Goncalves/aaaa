import React from "react";
import { Button, Upload, UploadProps } from "antd";
import Cookies from "js-cookie";
import { UploadFile } from "antd/lib/upload/interface";

type IUploadComponent = {
  maxCount?: number;
  fileList: UploadFile[];
  setFileList: (event: UploadFile[]) => void;
}

export function UploadComponent({ maxCount = 5, fileList, setFileList }: IUploadComponent) {
  const token = Cookies.get("whats-front-token");

  const props: UploadProps = {
    name: "document",
    action: "https://whatsapi.webi9.com.br/files/file",
    headers: {
      authorization: `Bearer ${token}`,
    },

    onChange(info) {
      if(info.fileList) {
        setFileList(info.fileList)
      }
    }
  }

  return (
    <Upload {...props} maxCount={maxCount} defaultFileList={[...fileList]}>
      <Button>Click to Upload</Button>
    </Upload>
  );
}

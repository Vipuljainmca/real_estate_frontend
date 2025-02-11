import React, {useState} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload, message } from 'antd';
import { uploadApi } from '../../comman/apiRequest.ts';

const UploadFiles: React.FC<{ openAddFile?: { _id: string } }> = ({ openAddFile }) => {
    const [fileList, setFileList] = useState<any[]>([]);
  const handleUpload = async ({ file }: any) => {
    if (!openAddFile?._id) {
      message.error("Invalid lead ID");
      return;
    }

    const successFn = (data: any) => {
      message.success("File uploaded successfully!");
      console.log("Upload Success:", data);
      setFileList((prev) => [...prev, { uid: data._id, name: data.name, status: "done" }]);
    };

    const errorFn = (error: any) => {
      message.error("Failed to upload file.");
      console.error("Upload Error:", error);
    };

    uploadApi("http://localhost:4000/api/v1/upload", openAddFile._id, file, successFn, errorFn);
  };

  const uploadProps: UploadProps = {
    fileList,
    customRequest: ({ file }) => handleUpload({ file }), // Custom upload handler
    showUploadList: true,
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default UploadFiles;

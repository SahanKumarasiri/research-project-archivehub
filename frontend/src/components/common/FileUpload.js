import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFileUpload, fileUploadDetails } from "../../auth/authActions";
import { DECODED_TOKEN } from "../helpers/Helper";

const FileUpload = ({ setAttachments }) => {
  const dispatch = useDispatch();
  const [tempFileList, setTempFileList] = useState([]);
  const [uploadedFileListForShow, setUploadedFileListForShow] = useState([]);
  const uploadedFiles = useSelector(
    (state) => state?.auth?.files?.data?.data || {}
  );
  const fetching = useSelector(
    (state) => state?.auth?.files?.fetching || false
  );
  const error = useSelector(
    (state) => state?.auth?.files?.error?.status || false
  );

  const msg = useSelector(
    (state) => state?.auth?.message?.data?.data?.msg || null
  );

  const collaborateData = useSelector(
    (state) => state?.auth?.collaborator?.data?.data || null
  );

  const uploadFunc = (options) => {
    dispatch(
      fileUploadDetails({
        file: tempFileList.map(({ uid, name }) => ({ uid, name })).pop(),
        userId: DECODED_TOKEN(localStorage.getItem("authToken")).userId,
        originFile: tempFileList.pop(),
      })
    );
  };
  useEffect(() => {
    if (Object.keys(uploadedFiles)?.length) {
      setUploadedFileListForShow([
        ...uploadedFileListForShow,
        {
          ...uploadedFiles,
          status: fetching ? "uploading" : error ? "error" : "done",
        },
      ]);
      setAttachments(
        [
          ...uploadedFileListForShow,
          {
            ...uploadedFiles,
            status: fetching ? "uploading" : error ? "error" : "done",
          },
        ]?.map(({ path, name }) => ({ path, name }))
      );
    }
  }, [Object.keys(uploadedFiles)?.length]);

  useEffect(() => {
    if (msg || collaborateData) {
      setUploadedFileListForShow([]);
      setTempFileList([]);
    }
  }, [msg, collaborateData]);
  window.onbeforeunload = () => dispatch(clearFileUpload());
  return (
    <div>
      <Upload
        action={null}
        customRequest={uploadFunc}
        beforeUpload={(file, fileList) => {
          tempFileList.push(...fileList);
          setTempFileList(tempFileList);
        }}
        onRemove={(file) => {
          setTempFileList(tempFileList.filter(({ uid }) => uid !== file.uid));
          setUploadedFileListForShow(
            uploadedFileListForShow.filter(({ uid }) => uid !== file.uid)
          );
        }}
        fileList={uploadedFileListForShow}
      >
        <Button icon={<UploadOutlined />}>
          {fetching ? "Uploading..." : "Attachments"}
        </Button>
      </Upload>
    </div>
  );
};

export default FileUpload;

import { Button, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { DECODED_TOKEN, EMPTY_FIELD_VALIDATION } from "../helpers/Helper";
import ReactQuill from "react-quill";
import FileUpload from "./FileUpload";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFileUpload,
  clearMessage,
  messageDetails,
} from "../../auth/authActions";

const ChatForm = () => {
  const [form] = useForm();
  const [Attachments, setAttachments] = useState([]);
  const [selection, seSelection] = useState([]);

  const dispatch = useDispatch();

  const confirmation = useSelector(
    (state) => state?.auth?.confirmation?.data?.data?.users || []
  );

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const checkProfileData = useSelector(
    (state) => state?.auth?.checkProfile?.data?.data || []
  );

  const msg = useSelector(
    (state) => state?.auth?.message?.data?.data?.msg || null
  );

  const msgFetching = useSelector(
    (state) => state?.auth?.message?.fetching || false
  );
  const fetching = useSelector(
    (state) => state?.auth?.files?.fetching || false
  );

  const decodedToken = DECODED_TOKEN(authToken);

  const userArray = confirmation
    ?.filter(
      (el) =>
        el?.status === "ACCEPTED" &&
        (el?.userId === decodedToken?.userId ||
          el?.connectedWith === decodedToken?.userId) &&
        !el?.deactivated && !el?.deleted
    )
    ?.map((el) => ({
      userId: !el?.msg?.includes(
        `${decodedToken?.firstName} ${decodedToken?.lastName} `
      )
        ? el?.userId
        : el?.connectedWith,
      name: el?.msg?.includes(
        `${decodedToken?.firstName} ${decodedToken?.lastName} `
      )
        ? `${el?.firstName} ${el?.lastName}`
        : `${el?.connectedUserInfo?.firstName} ${el?.connectedUserInfo?.lastName}`,
    }));

  const onSubmit = () => {
    if (form.validateFields()) {
      dispatch(
        messageDetails({
          userName: checkProfileData?.name,
          userEmail: decodedToken?.email,
          attachments: Attachments,
          users: selection,
          para: form.getFieldsValue().message,
          subject: form.getFieldsValue().subject,
        })
      );
    }
  };

  useEffect(() => {
    if (msg) {
      notification.success({
        message: "Message successfully sent!.",
        placement: "topLeft",
      });
      form.resetFields();
      dispatch(clearFileUpload());
      dispatch(clearMessage());
    }
  }, [msg]);

  return (
    <div>
      <Form form={form} onFinish={onSubmit}>
        <Form.Item>
          <label className="chat-lable">Subject</label>
        </Form.Item>
        <Form.Item name={"subject"} rules={[EMPTY_FIELD_VALIDATION]}>
          <Input type="text" placeholder="Enter Subject" />
        </Form.Item>
        <Form.Item>
          <label className="chat-lable">Message</label>
        </Form.Item>
        <Form.Item name={"message"} rules={[EMPTY_FIELD_VALIDATION]}>
          <ReactQuill placeholder="Enter Message" />
        </Form.Item>
        <Form.Item>
          <FileUpload setAttachments={setAttachments} />
        </Form.Item>
        <Form.Item name={"users"} rules={[EMPTY_FIELD_VALIDATION]}>
          <div className="row">
            <div className="col-6">
              <span className="chat-lable">
                Select one or more users <br />
                (ctrl + click)
              </span>
            </div>
            <div className="col-6">
              <select
                multiple
                className="px-1 py-1"
                onChange={(e) => {
                  seSelection(
                    [...e.target.selectedOptions].map((opt) => opt.value)
                  );
                }}
              >
                {userArray?.map((el) => (
                  <option value={el?.userId} key={el?.userId}>
                    {el?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Form.Item>
        <Form.Item className="text-center">
          <Button
            className="chat-button"
            onClick={() => form.submit()}
            disabled={fetching}
            loading={msgFetching}
          >
            <span className="chat-button-text">SEND</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChatForm;

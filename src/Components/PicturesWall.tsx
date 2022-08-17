import { CrossCircle } from "./Icons/CrossCircle";
import { Edit } from "./Icons/Edit";
import { EventHandler, NLView } from "../types";
import { FileOutlined } from "@ant-design/icons";
import { Input, Modal, Row, Upload, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadFile, UploadFileStatus } from "antd/lib/upload/interface";
import Form from "antd/lib/form";
import React, { FC, ReactElement } from "react";

// type File = { status: UploadFileStatus, originFileObj: Blob, preview: string, url: string, name: string } & UploadFile;
// type FileList = File[];

function getBase64(file: RcFile | undefined): Promise<string> {
  if (!file) throw new Error("No data received");

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export class PicturesWall extends React.Component<
  React.ComponentPropsWithRef<
    React.ElementType & {
      onChange: EventHandler;
      onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
      uploadText: string;
      setContentType: React.Dispatch<React.SetStateAction<string>>;
      contentType: string;
      children?: ReactElement;
      name: string;
    }
  >
> {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    value: null as UploadFile | null,
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
      value: file,
    });
  };

  handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    this.setState({ fileList });
    this.props.onChange && this.props.onChange({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const { contentType } = this.props;

    return (
      <>
        {contentType === "text/plain" ? (
          <Form.Item
            required={true}
            name="content"
            rules={[
              {
                required: true,
                message: "A couple of words here please",
              },
            ]}
          >
            <Input.TextArea
              placeholder={"What's on your mind?"}
              style={{
                padding: "15px 19px",
                height: 377,
                borderRadius: 8,
              }}
              className="paragraph-2b"
              onChange={this.props.onContentChange}
            />
          </Form.Item>
        ) : (
          <>
            <Upload
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              // onPreview={this.handlePreview}
              onChange={this.handleChange}
              beforeUpload={() => false}
              // customRequest={({ file, onSuccess }) => {
              //   onSuccess && onSuccess(() => ({ body: "ok", xhr: {} as XMLHttpRequest }));

              // }}
              openFileDialogOnClick
            >
              {fileList.length > 0 ? null : this.props.name === "avatar" ? (
                <Row style={{ textAlign: "left" }}>
                  <Edit />
                </Row>
              ) : (
                <div className="paragraph-2b" style={{ fontSize: 17 }}>
                  Drag and drop content here!{<br />} JPEG, PNG, GIF
                </div>
              )}
            </Upload>
            <Modal
              closeIcon={<CrossCircle />}
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </>
        )}
      </>
    );
  }
}

export const PictureWallFormItem: NLView<{
  onChange?: EventHandler;
  uploadText?: string;
}> = ({ onChange, uploadText }) => {
  return (
    <div style={{ margin: "auto" }} className="upload-profile-update-icon">
      <PicturesWall name="avatar" listType="picture-card" showUploadList={false} onChange={onChange} uploadText={uploadText} />
    </div>
  );
};

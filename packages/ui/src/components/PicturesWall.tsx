import { Upload, Modal, Row } from "antd";
import React, { ReactElement } from "react";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import { FileOutlined } from "@ant-design/icons";
import { Image } from "./Icons/Image";
import { EventHandler, NLView } from "@newcoin-foundation/core";

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
      uploadText: string;
      setContentType: React.Dispatch<React.SetStateAction<string>>;
      contentType: string;
      children: ReactElement;
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
      previewTitle:
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
      value: file,
    });
  };

  handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    this.setState({ fileList });
    this.props.onChange && this.props.onChange({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <Row style={{ alignItems: "flex-start" }} justify="space-between">
        {this.props.children ? this.props.children : <Image />}

        {/* <div style={{ marginTop: 8 }}>{this.props.uploadText || "Upload"}</div> */}
      </Row>
    );

    return (
      <>
        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          // onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={() => false}
          openFileDialogOnClick={
            this.props.contentType === "text/plain" ? false : true
          }
          // customRequest={({ file, onSuccess }) => {
          //   onSuccess && onSuccess(() => ({ body: "ok", xhr: {} as XMLHttpRequest }));

          // }}
        >
          {fileList.length > 0 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export const PictureWallFormItem: NLView<{
  onChange?: EventHandler;
  uploadText?: string;
}> = ({ onChange, uploadText }) => {
  return (
    <div style={{ margin: "auto" }}>
      <PicturesWall
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={onChange}
        uploadText={uploadText}
      >
        <div>
          <FileOutlined />
          <div style={{ marginTop: 8 }}></div>
        </div>
      </PicturesWall>
    </div>
  );
};

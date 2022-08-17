import { Col, Row } from "antd";
import { Image } from "../../../Components/Icons/Image";
import { NLView } from "../../../types";
import { PicturesWall } from "../../../Components/PicturesWall";
import { Text } from "../../../Components/Icons/Text";
import { Video } from "../../../Components/Icons/Video";
import Form from "antd/lib/form";
import SupportBox from "../../../Components/SupportBox";

const PostCreateHeader: NLView<{
  contentType: string;
  setContentType: React.Dispatch<React.SetStateAction<string>>;
  onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ contentType, setContentType, onChangeContent }) => {
  return (
    <div className="post-create-header-wrapper">
      <Col>
        <Row>
          <h2 className="header-5" style={{ marginBottom: "20px", textAlign: "left" }}>
            Upload node
          </h2>
        </Row>
        <Row style={{ flex: 1, flexDirection: "column" }}>
          <div>
            <div className="postCreateHeader-uploadIcons-wrapper">
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setContentType("text/plain");
                }}
                className={contentType === "text/plain" ? "uploadIconActive" : "uploadIconInactive"}
              >
                <Text />
              </span>
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setContentType("");
                }}
                className={
                  contentType !== "text/plain" && contentType !== "video/mp4" ? "uploadIconActive" : "uploadIconInactive"
                }
              >
                <Image />
              </span>
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setContentType("video/mp4");
                }}
                className={contentType === "video/mp4" ? "uploadIconActive" : "uploadIconInactive"}
              >
                <Video />
              </span>
            </div>

            <div style={{ margin: "auto" }}>
              <Form.Item
                name="file"
                valuePropName="fileList"
                getValueFromEvent={(ev) => {
                  return ev?.fileList || []; //ev?.target?.files || [];
                }}
                rules={[
                  {
                    required: !contentType,
                    message: "What are you uploading?",
                  },
                ]}
              >
                <PicturesWall
                  name="uploadNode"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  contentType={contentType}
                  onContentChange={onChangeContent}
                />
              </Form.Item>
            </div>
          </div>
        </Row>
        <Row>
          <SupportBox />
        </Row>
      </Col>
    </div>
  );
};

export default PostCreateHeader;

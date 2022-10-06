import { Button, Col, Input, Row, Tooltip } from "antd";
import { Info } from "../../Components/Icons/Info";
import { Link } from "react-router-dom";
import { PictureWallFormItem } from "../../Components/PicturesWall";
import { useAppState } from "../../overmind";
import { useCachedDaoProposals } from "../../hooks/useCached";
import { useContentImageUrl } from "../../Components/MediaComponents/ImageMediaComponent";
import Form from "antd/lib/form";
import SupportBox from "../../Components/SupportBox";

const UserUpdateHeader = () => {
  const state = useAppState();
  const daoOwner = state.api.auth.user?.username || state.config.settings.newcoin.daoDomain;
  const daoProposals = useCachedDaoProposals({ daoOwner });
  const profilePicture = useContentImageUrl({
    id: state.api.auth.user.id,
    contentUrl: state.api.auth.user.contentUrl,
  });

  return (
    <div className="post-create-header-wrapper">
      <div className="post-back-arrow" style={{ padding: "0px 20px" }}>
        {/* <LargeArrowBack /> */}
      </div>
      <Row
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Row style={{ flexDirection: "column" }}>
          <h2 className="text-center header-5" style={{ marginBottom: 20, textAlign: "left" }}>
            Edit Profile
          </h2>
          <Row justify="center" className="full-width-only">
            {/* <Col span={6}>
							<Form.Item>
								<ContentImage {...sf} neverHide={true} />
							</Form.Item>
						</Col> */}
            <Col span={18}>
              <Form.Item
                // label="Avatar"
                name="file"
              >
                <PictureWallFormItem uploadText="Upload avatar" placeholderImgSrc={profilePicture} />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              marginBottom: "10px",
            }}
          >
            <p className="header-5" style={{ lineHeight: "32px", marginRight: 10 }}>
              Domain
            </p>
            <Tooltip
              placement="rightTop"
              title={"This is your Newcoin blockchain name, aka your domain. You cannot edit this domain name!"}
            >
              <span style={{ height: 30 }}>
                <Info color="#FCFCF3" />
              </span>
            </Tooltip>
          </Row>
          <Form.Item>
            <Input disabled placeholder="your domain" style={{ marginLeft: 10, width: "calc(100% - 10px)" }} />
          </Form.Item>
          <Row
            style={{
              marginBottom: "10px",
            }}
          >
            <p className="header-5">Name</p>
          </Row>
          <Form.Item
            name="displayName"
            rules={[
              {
                required: true,
                message:
                  "Display name must start with a letter, be 3 - 9 chars or longer and contain only latin letters, digits and dots.",
              },
            ]}
          >
            <Input placeholder="display name" style={{ marginLeft: 10, width: "calc(100% - 10px)" }} />
          </Form.Item>
          <Row
            style={{
              marginBottom: "10px",
            }}
          >
            <p className="header-5">Bio</p>
          </Row>
          <Form.Item name="description">
            <Input.TextArea placeholder="bio" style={{ marginLeft: 10, width: "calc(100% - 10px)" }} />
          </Form.Item>
          <Row
            style={{
              marginBottom: "10px",
            }}
          >
            <p className="header-5">Email</p>
          </Row>
          <Form.Item
            name="email"
            required={false}
            rules={[
              {
                required: false,
                // message: "Please enter your email",
              },
            ]}
          >
            <Input placeholder="email" style={{ marginLeft: 10, width: "calc(100% - 10px)" }} />
          </Form.Item>
          {!daoProposals.dao_id && (
            <Form.Item>
              <Row>
                <Link to="/dao/create">
                  <Button className="u-dao-view-btn u-margin-right-medium">
                    <span className="paragraph-2b">Create DAO</span>
                  </Button>
                </Link>
              </Row>
            </Form.Item>
          )}
        </Row>
        <Row style={{ flex: 1, flexDirection: "column" }}>
          <SupportBox style={{ marginLeft: 10, width: "calc(100% - 10px)" }} />
        </Row>
        <br />
        <br />
        <br />
        <br />
      </Row>
    </div>
  );
};

export default UserUpdateHeader;

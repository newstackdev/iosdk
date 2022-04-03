import { NLView } from "@newcoin-foundation/core";
import { Row } from "antd";
import { Link } from "react-router-dom";

const Title: NLView<{ title?: string; href?: string }> = ({ title, href }) => {
  return (
    <Row
      justify={"space-between"}
      align="middle"
      // style={title === "save to a folder" ? {} : { marginBottom: "40px" }}
    >
      {title && <h2 className="header-2">{title}</h2>}
      {href ? (
        <Link className="paragraph-2b" to={href || ""}>
          See all
        </Link>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default Title;

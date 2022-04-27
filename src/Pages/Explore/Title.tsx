import { Button, Row } from "antd";
import { Link } from "react-router-dom";
import { NLView } from "../../types";

const Title: NLView<{ title?: string; href?: string }> = ({ title, href }) => {
	return (
		<Row
			justify={"space-between"}
			align="middle"
			className="title"
			// style={title === "save to a folder" ? {} : { marginBottom: "40px" }}
		>
			{title && <h2 className="header-2">{title}</h2>}
			{href ? (
				<Link className="paragraph-2b" to={href || ""}>
					<Button className="secondary-button">
						<span className="paragraph-2b">See all</span>
					</Button>
				</Link>
			) : (
				<></>
			)}
		</Row>
	);
};

export default Title;

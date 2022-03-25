import { Row } from "antd";
import { Link } from "react-router-dom";
import { AppearingComponent } from "./Appearing";

const SupportBox = () => {
	return (
		<AppearingComponent seconds={5}>
			<Row className="support-box">
				<p className="paragraph-2r">Need support?</p>
				<p className="paragraph-2u">
					<Link to="/"> Join our telegram group!</Link>
				</p>
			</Row>
		</AppearingComponent>
	);
};

export default SupportBox;

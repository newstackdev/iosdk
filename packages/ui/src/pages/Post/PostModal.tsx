import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { ThreeDots } from "../../Components/Icons/ThreeDots";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { NLView } from "../../types";

const PostReportModal: NLView = ({ children }) => {
	const [visible, setVisible] = useState<boolean>(false);

	return (
		<>
			<Modal
				visible={visible}
				okText={"Close"}
				onOk={() => setVisible(false)}
				onCancel={() => setVisible(false)}
				cancelButtonProps={{ hidden: true }}
				footer={false}
				className="nl-white-box-modal post-modal"
				closeIcon={<CrossCircle />}
			>
				<div className="text-left" style={{ width: "100%" }}>
					<Row gutter={48}>
						<Col span={24}>
							<br />
							<p className="header-3">Report content</p>
						</Col>
						<div className="report-checkbox-wrapper">
							<Col span={24}>
								<br />
								<p className="paragraph-2r">
									Thanks for keeping the community safe.
								</p>
							</Col>
							<Col span={24}>
								<RowCheckbox title="report-checkbox">
									<p className="header-5">Nudity</p>
								</RowCheckbox>
							</Col>
							<Col span={24}>
								<RowCheckbox title="report-checkbox">
									<p className="header-5">Violence</p>
								</RowCheckbox>
							</Col>
							<Col span={24}>
								<RowCheckbox title="report-checkbox">
									<p className="header-5">Harassment</p>
								</RowCheckbox>
							</Col>
							<Col span={24}>
								<RowCheckbox title="report-checkbox">
									<p className="header-5">Spam</p>
								</RowCheckbox>
							</Col>
							<Col span={24}>
								<RowCheckbox title="report-checkbox">
									<p className="header-5">Copyright</p>
								</RowCheckbox>
							</Col>
							<Col span={24}>
								<RowCheckbox title="report-checkbox">
									<p className="header-5">Self-injury</p>
								</RowCheckbox>
							</Col>
						</div>
						<Col
							span={24}
							style={{
								width: "100%",
								textAlign: "center",
								marginTop: "40px",
							}}
						>
							<Button type="primary">Report</Button>
						</Col>
					</Row>
				</div>
			</Modal>
			<div onClick={() => setVisible(true)}>
				<ThreeDots />
			</div>
		</>
	);
};

export default PostReportModal;

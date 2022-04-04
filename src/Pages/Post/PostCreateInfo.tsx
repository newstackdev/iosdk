import { Checkbox, Col, Row } from "antd";
import { ProgressButton } from "../../Components/ProgressButton";
import { LICENSES } from "../../constants";
import { NLView } from "../../types";

export type LicenseProps = { name: string; value: string };

const PostCreateInfo: NLView<{
	selectedLicense: LicenseProps;
	setSelectedLicense: React.Dispatch<React.SetStateAction<LicenseProps>>;
	setIsLicense: React.Dispatch<React.SetStateAction<boolean>>;
	isLicense: boolean;
	mintConfirmationOpen: boolean;
	ncoBalance: number;
}> = ({
	selectedLicense,
	setSelectedLicense,
	isLicense,
	setIsLicense,
	mintConfirmationOpen,
	ncoBalance,
}) => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "end",
				flexDirection: "column",
				textAlign: "center",
			}}
		>
			{isLicense ? (
				<AddLicense
					selectedLicense={selectedLicense}
					setSelectedLicense={setSelectedLicense}
					isLicense={isLicense}
					setIsLicense={setIsLicense}
				/>
			) : (
				<></>
			)}
			<>
				<span hidden={mintConfirmationOpen || isLicense}>
					<ProgressButton
						actionName="api.post.create"
						type="primary"
						progressText="Creating post..."
						htmlType="submit"
						className={
							!selectedLicense ? "disabled-submit-button" : ""
						}
						disabled={!selectedLicense}
					>
						Share
					</ProgressButton>
				</span>
			</>
		</div>
	);
};

const AddLicense: NLView<{
	selectedLicense: LicenseProps;
	setSelectedLicense: React.Dispatch<React.SetStateAction<LicenseProps>>;
	setIsLicense: React.Dispatch<React.SetStateAction<boolean>>;
	isLicense: boolean;
}> = ({ selectedLicense, setSelectedLicense, isLicense, setIsLicense }) => {
	return (
		<>
			<p
				className="header-5"
				style={{
					marginBottom: "20px",
					textAlign: "center",
				}}
			>
				Add license
			</p>
			<div className="scrollable-licences">
				<Checkbox.Group value={[selectedLicense.value]}>
					{LICENSES.map((license) => (
						<LicenceContent
							description={license[2]}
							shortcut={license[1]}
							type={license[0]}
							link={license[3]}
							setSelectedLicense={setSelectedLicense}
							setIsLicense={setIsLicense}
							isLicense={isLicense}
						/>
					))}
				</Checkbox.Group>
			</div>
		</>
	);
};

const LicenceContent: NLView<{
	description: string;
	shortcut: string;
	type: string;
	link: string;
	isLicense: boolean;
	setSelectedLicense: React.Dispatch<React.SetStateAction<LicenseProps>>;
	setIsLicense: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
	type,
	description,
	shortcut,
	link,
	setSelectedLicense,
	setIsLicense,
	isLicense,
}) => (
	<>
		<Row
			style={{ flexDirection: "row-reverse" }}
			justify="space-between"
			align="middle"
		>
			<Col sm={2}>
				<Checkbox
					value={type}
					onChange={() => {
						setSelectedLicense({ name: type, value: shortcut });
						setIsLicense(!isLicense);
					}}
				/>
			</Col>
			<Col sm={18}>
				<p
					className="paragraph-2b"
					style={{
						margin: 0,
						flexDirection: "row-reverse",
					}}
				>
					({shortcut}) {type}
				</p>
			</Col>
		</Row>
		<p
			className="paragraph-2r"
			style={{ margin: "40px 0 20px 0", color: "#959595" }}
		>
			{description}
		</p>
		<a href={link} target="_blank" rel="noreferrer">
			<p
				className="paragraph-2u"
				style={{
					marginBottom: "40px",
					color: "#959595",
					wordBreak: "break-all",
				}}
			>
				{link}
			</p>
		</a>
	</>
);

export default PostCreateInfo;

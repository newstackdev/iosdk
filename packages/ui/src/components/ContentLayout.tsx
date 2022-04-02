import { Row, Col } from "antd";
import { Spin } from "./Spin";
import { ReactElement } from "react";
import { useAppState } from "../overmind";

type LayedOutContent = {
	header?: ReactElement | string | undefined;
	info?: ReactElement;
	isWorking?: boolean;
	isDomainPresale?: boolean;
	customClass?: string;
	isPost?: boolean;
	isMood?: boolean;
};

const ContentLayoutHorizontal: React.FunctionComponent<
	React.PropsWithChildren<LayedOutContent>
> = ({ header, info, children, isWorking }) => (
	<>
		<h2>{header}</h2>
		<Row gutter={18} wrap={true}>
			<Col xs={24} sm={8} lg={4}>
				{info}
			</Col>
			<Col xs={24} sm={14} lg={20}>
				{children}
			</Col>
		</Row>
		{isWorking ? <Spin /> : ""}
	</>
);

const ContentLayoutVertical: React.FunctionComponent<
	React.PropsWithChildren<LayedOutContent>
> = ({ header, info, children, isWorking }) => {
	const state = useAppState();
	return (
		<div className="app-main-full-width" style={{ minHeight: "90vh" }}>
			<div>{info}</div>
			<h2>{header}</h2>
			<div>{children}</div>
			{/* {(isWorking !== undefined) && state.indicators.isWorking ? <Spin /> : ""} */}
		</div>
	);
};

const ContentLayoutHorizontal3col: React.FunctionComponent<
	React.PropsWithChildren<LayedOutContent>
> = ({
	header,
	info,
	children,
	isWorking,
	customClass = "",
	isPost,
	isMood,
}) => {
	const state = useAppState();
	// return <div className="app-main-full-width" style={{ minHeight: "90vh" }}>
	//     <div>{info}</div>
	//     <h2>{header}</h2>
	//     <div>{childlgren}</div>
	//     {/* {(isWorking !== undefined) && state.indicators.isWorking ? <Spin /> : ""} */}
	// </div>;
	if (isWorking) return <Spin />;

	// const spanSum = (header ? 4 : 0) + (info ? 4 : 0);
	// const mainSpan = 24 - spanSum

	const extrasSpan = (header ? 4 : 0) + (info ? 4 : 0);

	return (
		<Row
			justify="space-between"
			gutter={16}
			className="app-main-full-width"
			style={{ margin: 0, height: "100%" }}
		>
			{header ? (
				<Col
					xs={24}
					lg={isPost ? 7 : isMood ? 6 : 4}
					className={
						isPost
							? "text-left post-notification-column"
							: "text-left"
					}
					style={isPost ? { display: "flex" } : {}}
				>
					{header}
				</Col>
			) : (
				""
			)}
			<Col
				xs={24}
				lg={
					isPost
						? 18 - extrasSpan
						: isMood
						? 20 - extrasSpan
						: 24 - extrasSpan
				}
				className={`${customClass}`}
				style={
					extrasSpan
						? { display: "flex" }
						: { width: "100%", padding: 0, display: "flex" }
				}
			>
				<div className="app-main-full-height">{children}</div>
			</Col>
			{info ? (
				<Col
					xs={24}
					lg={isPost ? 7 : isMood ? 6 : 4}
					style={{ display: "flex" }}
				>
					<div style={{ width: "100%" }} className="text-left">
						{info}
					</div>
				</Col>
			) : (
				""
			)}
		</Row>
	);
};

export const ContentLayout = ContentLayoutHorizontal3col;

import {
	MoodReadResponse,
	PostReadResponse,
} from "@newlife/newlife-creator-client-api";
import { Card, Col, Image, Row, Space } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { Link } from "react-router-dom";
import { CreativeSearchItem } from "../overmind/lists";
import { NLView } from "../types";
import { ContentImage } from "./Image";
import { aestheticList } from "../overmind/lists/SearchCreative/aestheticList";
import { useAppState } from "../overmind";

export interface OpenSearchResponse {
	_index: string;
	_type: string;
	_id: string;
	_score: null;
	_source: OpenSearchDocument;
	sort: number[];
}

export interface OpenSearchDocument {
	image: string;
	content: { [key: string]: number };
	aesthetics: { [key: string]: number };
	meta: Meta;
}

export type Aesthetics = Record<string, number>;

export interface Meta {
	blog_name: string;
	id: number;
	date: string;
	tags: string[];
	short_url: string;
	summary: string;
}

export const SearchItemWidget: NLView<{ item: any, index: number }> = ({ item, index }) => {
	const state = useAppState();
	return <Card
		style={{ width: "100%" }}
		// title={}
		cover={
			<Link to={`/search-creative/vote?${state.routing.location}&index=${index.toString()}`}>
				<Image width="100%" preview={false} src={item.image} />
			</Link>
		}
	>
		<small>
			<a href={item?.meta?.short_url} target="_new">
				{item?.meta?.short_url}
			</a>
		</small>
		<br />
		<small>
			by{" "}
			<a href={`${item?.meta?.short_url}`} target="_new">
				{item?.meta?.blog_name}
			</a>
		</small>
		<br />
		<small>
			{Object.entries(item?.aesthetics ?? {})
			.filter(kvp => aestheticList.includes(kvp[0]))
			.map(
				kvp =>
					<p style={{textAlign: "center"}}>
						{kvp[0]}

						<div
							className="nl-rating-bar"
							style={{
								textAlign: "left",
								opacity: 100,
								width: `${(kvp[1] as any as number) * 100 || 0}%`,
							}}
						></div>
					</p>
			)}
		</small>
		{/* <Link to={}>Vote</Link> */}
		{/* <Space direction="vertical" style={{ wordWrap: "break-word"}}>
            <div>{
                item.meta.blog_name ?
                    <>
                        By <a href={`${item.meta.short_url}`} target="_new">{ item.meta.blog_name }</a>
                    </> : ""
            }</div>
            {/* <div>
                {Object.keys(item.content).map(t => <><Link to={`/search-creative/${t.replace(/\s+/g, ".")}`}>{t}</Link> </> )}
            </div> */}
		{/* </Space> */}
	</Card>
};

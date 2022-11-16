import { ContentImage } from "./Image";
import { Link } from "react-router-dom";
import { MoodReadResponse, PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NLView } from "../types";
import { useAppState } from "../overmind";
import { useCachedPost } from "../hooks/useCached";

export const MaybeLink: React.FC<
  React.PropsWithChildren<{
    style?: React.CSSProperties;
    to: string;
    className?: string;
  }>
> = ({ to, children, className, style }) => (
  <Link style={style} to={to} className={className}>
    {children}
  </Link>
);

export const PostWidget: NLView<{
  post: PostReadResponse;
  mood?: MoodReadResponse;
  username?: string;
  aspectRatio: string | undefined | number;
  isSpotlight?: boolean;
}> = ({ post, mood, username, aspectRatio, isSpotlight }) => {
  const p = post;

  return (
    <>
      {p.contentType === "text/plain" ? (
        <div className="text-container">
          <p className="text-left paragraph-2r">
            "{/* @ts-ignore */}
            {p.content?.length > 17 ? p?.content?.substring(0, 12) + "..." : p.content || ""}"
          </p>
        </div>
      ) : (
        <ContentImage
          size="small"
          {...p}
          width="100%"
          style={{ aspectRatio: `${aspectRatio}` }}
          className={isSpotlight || aspectRatio! >= 1 ? "post-rounded" : "post-rounded"}
        />
      )}

      {/* {username && (
				<p className="spotlight-username paragraph-1b font-variant-none">
					<Link
						to={`/user/${
							post?.author?.username || post.author?.displayName
						}`}
					>
						{post?.author?.username || post?.author?.displayName}
					</Link>
				</p>
			)} */}
    </>
  );

  // return <Card
  //     style={{ width: "100%" }}
  //     title={<Link to={`/post/${p.id}`}>{p.title}</Link>}
  //     cover={<ContentImage  width="100%" src={p.contentUrl} />}
  // >
  //     {/* <Space direction="vertical"> */}
  //         By <Link to={`/user/${p?.author?.id}`}>{ p.author?.username }</Link>
  //         <Paragraph ellipsis={{ rows: 3, expandable: false }}>
  //             { post.description }
  //         </Paragraph>
  //     {/* </Space> */}
  // </Card>
};

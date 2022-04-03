import { NLView } from "@newcoin-foundation/core";
import {
  MoodReadResponse,
  PostReadResponse,
} from "@newlife/newlife-creator-client-api";
import { Link } from "react-router-dom";
import { MediaComponent } from "./MediaComponents/MediaComponent";

const MaybeLink: React.FC<
  React.PropsWithChildren<{ to: string; className: string }>
> = ({ to, children, className }) =>
  to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
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
      <MaybeLink
        to={!p.id ? "" : !mood ? `/post/${p.id}` : `/folder/${mood.id}/${p.id}`}
        className={p.contentType === "text/plain" ? "maybelink" : ""}
      >
        {p.contentType === "text/plain" ? (
          <div className="text-container">
            <p className="text-mood">
              "{/* @ts-ignore */}
              {p.content?.length > 17
                ? p?.content?.substring(0, 12) + "..."
                : p.content || ""}
              "
            </p>
          </div>
        ) : (
          <MediaComponent
            size="small"
            {...p}
            width="100%"
            style={{ aspectRatio: `${aspectRatio}` }}
            className={isSpotlight || aspectRatio! >= 1 ? "post-rounded" : ""}
          />
        )}
      </MaybeLink>

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

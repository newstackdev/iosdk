import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { CaretRightFilled } from "@ant-design/icons";
import { Callback, NLView } from "@newcoin-foundation/core";
import { useAppState } from "@newcoin-foundation/state";
import { useCachedMood } from "@newcoin-foundation/hooks";
import FolderClosed from "./Icons/Folder/Closed";
import { MediaComponent } from "./MediaComponents/MediaComponent";

export const MoodFolderWidget: NLView<{
  mood: MoodReadResponse;
  onClick?: Callback;
  selected?: boolean;
  force?: boolean;
  setSelectedFolder: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFolder: boolean;
}> = ({
  mood,
  onClick,
  selected,
  force,
  selectedFolder,
  setSelectedFolder,
}) => {
  const state = useAppState();
  const m = useCachedMood(mood, force);

  const url = m.contentUrl || m.posts?.find((p) => p.contentUrl)?.contentUrl;
  const p = (m?.posts && m.posts[0]) || {};
  return (
    <div
      {...(onClick ? { onClick: () => onClick() } : {})}
      style={{
        textAlign: "center",
        color: "white",
        width: "100%",
        border: "none",
      }}
      className={
        selected
          ? "selected-folder bg-selected-folder"
          : "selectable-folder bg-hover"
      }
    >
      <div style={{ width: "90%", margin: "0 auto" }}>
        <FolderClosed />
      </div>
      <p className="folder-name">{m.title}</p>
    </div>
  );
};

export const MoodWidget: NLView<{
  mood: MoodReadResponse;
  onClick?: Callback;
  selected?: boolean;
  force?: boolean;
}> = ({ mood, onClick, selected, force }) => {
  const state = useAppState();
  const m = useCachedMood(mood, force);

  const url = m.contentUrl || m.posts?.find((p) => p.contentUrl)?.contentUrl;
  const p = (m?.posts && m.posts[0]) || {};
  return (
    <div
      className={selected ? "selected" : ""}
      {...(onClick ? { onClick: () => onClick() } : {})}
    >
      <MediaComponent
        // src={url && `1000x1000/${url}`}
        // href={`/mood/${m.id}`}
        // {...m}
        {...p}
        // contentUrl={onClick ? "" : `/mood/${m.id}${m.posts?.length ? `/${m.posts[0].id}` : ""}`}
        mask={
          <div style={{ textAlign: "center" }}>
            <div>
              <CaretRightFilled style={{ fontSize: "35px", color: "white" }} />
            </div>
            <p>{m.title}</p>
          </div>
        }
      />
    </div>
  );
  // return <Card
  //     style={{ maxWidth: "clamp(300, 20vw, 400)" }}
  //     // title={<Link to={`/mood/${mood.id}`}>{mood.title}</Link>}
  //     cover={<ContentImage width="100%" src={mood.contentUrl || get(mood, "posts[0].contentUrl") || ""} />}
  // />
};

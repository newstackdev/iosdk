import { IOView } from "../../../types";
import { Row } from "antd";
import { SimplifiedTag, bySumScore, sumScore } from "../Post";
import { useVotingStreamMood } from "../../../Pages/Post/Post";

export const Tags: IOView<{
  isEyeOpened?: boolean;
  isEyeOpenedResponzive?: boolean;
  visionTags: SimplifiedTag[];
  nonVisionTags: SimplifiedTag[];
  setHilightTag: React.Dispatch<React.SetStateAction<SimplifiedTag[]>>;
}> = ({ isEyeOpened, isEyeOpenedResponzive, visionTags, nonVisionTags, setHilightTag, children }) => {
  const nextInStream = useVotingStreamMood();
  const { currPost } = nextInStream;

  return ((isEyeOpened || isEyeOpenedResponzive) && currPost.tags?.length === undefined ? (
    <p className="paragraph-2b">no tags found.</p>
  ) : (
    isEyeOpened || isEyeOpenedResponzive
  )) && currPost.tags?.length ? (
    <Row className="nl-post-info-column__tags-wrapper">
      {[
        ...visionTags?.sort(bySumScore),
        ...nonVisionTags
          // 	?.sort(bySumScore)
          .slice(0, Math.max(0, 20 - visionTags.length)),
      ]
        // ?.slice(0, 10)
        ?.map((t) => {
          const tag = t.value;
          const score = (sumScore(t["_rel"]) * 100).toFixed(0);

          return (
            <>
              <Row
                onMouseOver={() => setHilightTag(visionTags.filter((s) => s.value === t.value))}
                onMouseOut={() => setHilightTag([])}
                className="paragraph-3b nl-post-info-column__infobox-wrapper__col__tag"
                style={{
                  backgroundColor: t.polygons?.length ? "#c9fd50" : "#fcfcf3",
                  alignItems: "baseline",
                  flexWrap: "nowrap",
                }}
              >
                <p className="u-margin-right-xs paragraph-3b">{score}%</p>
                <p className="paragraph-3b">{tag}</p>
              </Row>
            </>
          );
        })}
    </Row>
  ) : (
    <>{children}</>
  );
};

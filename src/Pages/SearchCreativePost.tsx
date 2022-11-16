import { Image, Progress } from "antd";
import { NLView } from "../types";
import { Spin } from "../Components/Spin";
import { Vote } from "../Components/Vote";
import { useActions, useAppState, useEffects } from "../overmind";
import { useCreativeSearchQuery } from "./SearchCreative";
import { useEffect } from "react";

export const SearchCreativePost: NLView = () => {
  const state = useAppState();
  const actions = useActions();
  const effects = useEffects();
  const { tags, aesthetics, index } = useCreativeSearchQuery();

  useEffect(() => {
    if (!state.lists.creativeSearch.results.items.length) {
      actions.lists.creativeSearch({ tags, aesthetics });
    }
  }, []);

  const item = state.lists.creativeSearch.results.items[index];

  const doneVoting = (vote: number) => {
    effects.ux.message.info(`Voted at ${vote}`);
    actions.routing.historyPush({
      location: `/search-creative/vote?tags=${tags}&aesthetics=${aesthetics}&index=${index + 1}`,
    });
  };

  if (!item) return <Spin />;

  return (
    <Vote
      // useVotingStream={useVotingStreamMood}
      onDoneVoting={doneVoting}
      info={
        <>
          {Object.entries(item.aesthetics || []).map((a) => (
            <>
              <div>{a[0]}</div>
              <Progress strokeColor="#c1fa50" percent={a[1] * 100} />
            </>
          ))}
        </>
      }
    >
      <Image preview={false} src={item.image} />
    </Vote>
  );
};

// import '../App.css';
import { useEffect } from "react";
import { ContentLayout } from "../../Components/ContentLayout";
import Spotlights from "../../Components/Spotlights";
import TopFolders from "../../Components/TopFolders";
import Creators from "../../Components/Creators";
import { NLView } from "@newcoin-foundation/core";
import { useAppState, useActions } from "@newcoin-foundation/state";

export const Explore: NLView = () => {
  const state = useAppState();
  const actions = useActions();

  const moods = state.lists.top.moods.items;

  useEffect(() => {
    !moods.length && actions.lists.top.moods();
  }, []);

  const users = state.lists.top.users.items;

  useEffect(() => {
    !users.length && actions.lists.top.users();
  }, []);

  // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
  return (
    <ContentLayout>
      {/* <UsersHorizontalScroller
				users={users}
				powerUp={false}
				layout="vertical"
				title={users?.length ? "Spotlights" : ""}
			/> */}
      <Spotlights title={"Spotlights"} maxRows={1} maxItems={3} />
      <TopFolders title={"Explore top folders"} maxItems={3} posts={"full"} />
      {/* <MoodsGrid
				moods={moods}
				loadMore={actions.lists.top.moods}
				title={moods?.length ? "Top moods today" : ""}
			/> */}
      <Creators maxItems={3} title={"Explore top creators"} users={users} />
      <TopFolders title={"Explore more folders"} maxItems={3} skipItems={3} />
    </ContentLayout>
  );
};

export default Explore;

/* <div style={{ marginBottom: 40 }}>
  <Space>
    <Tag >Science</Tag>
    <Tag>Art</Tag>
    <Tag>Design</Tag>
    <Tag>Curiosity</Tag>
    <Tag>Fresh</Tag>
    <Tag>Blah</Tag>
    <Tag >Science</Tag>
    <Tag>Art</Tag>
    <Tag>Design</Tag>
    <Tag>Curiosity</Tag>
    <Tag>Fresh</Tag>
    <Tag>Blah</Tag>
  </Space>
</div> */

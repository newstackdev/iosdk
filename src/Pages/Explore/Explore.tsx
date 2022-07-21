// import '../App.css';
import { ContentLayout } from "../../Components/ContentLayout";
import { ItemGrid } from "../../Components/ItemGrid";
import { MoodWidget } from "../../Components/MoodWidget";
import { MoodsGrid } from "../Mood/MoodsGrid";
import { NLView } from "../../types";
import { useActions, useAppState } from "../../overmind";
import { useEffect } from "react";
import Creators, { TopCreators } from "../../Components/Creators";
import FolderClosed from "../../Components/Icons/Folder/Closed";
import Spotlights from "../../Components/Spotlights";
import TopFolders from "../../Components/TopFolders";
import TopHashtags from "../../Components/TopHashtags";

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

  // if(true)
  // 	return <NewcoinRecept visible={true} tx="hello">Here is your receipt</NewcoinRecept>;

  // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
  return (
    <div className="explore-page-wrapper">
      {/* <UsersHorizontalScroller
				users={users}
				powerUp={false}
				layout="vertical"
				title={users?.length ? "Spotlights" : ""}
			/> */}
      <Spotlights title={"Spotlights"} maxRows={1} maxItems={10} carousel />
      <TopFolders title={"Explore top folders"} maxItems={3} maxPostsToShow={5} posts={"full"} filterToSameNumberPosts />
      {/* <MoodsGrid
				moods={moods}
				loadMore={actions.lists.top.moods}
				title={moods?.length ? "Top moods today" : ""}
			/> */}
      <TopCreators maxItems={4} title={"Explore top creators"} users={users} />
      <TopHashtags maxItems={3} title={"Explore top hashtags"} />
      <TopFolders
        title={"Explore more folders"}
        maxItems={3}
        maxPostsToShow={5}
        skipItems={3}
        filterToSameNumberPosts
        posts={"full"}
      />
    </div>
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

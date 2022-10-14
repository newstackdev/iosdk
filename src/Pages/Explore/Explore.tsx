// import '../App.css';
import { ContentType, NLView } from "../../types";
import { TopCreators } from "../../Components/Creators";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useEffect } from "react";
import Spotlights from "../../Components/Spotlights";
import TopFolders from "../../Components/TopFolders";
import TopHashtags from "../../Components/TopHashtags";

export const Explore: NLView = () => {
  const state = useAppState();
  const actions = useActions();
  const effects = useEffects();

  const topMoods = state.lists.top.moods.items;
  const topUsers = state.lists.top.users.items;
  const topPosts = state.lists.top.posts.items;
  const topVideoPosts = state.lists.top.videoPosts.items;

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([actions.lists.top.moods({}), actions.lists.top.users(), actions.lists.top.posts()]);
      await actions.lists.top.posts(ContentType.video);
    };
    loadAll();
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
      <Spotlights title={"Spotlights"} carousel posts={topPosts} href="top/spotlights" />
      <TopFolders
        title={"Explore top folders"}
        maxItems={3}
        maxPostsToShow={5}
        posts={"full"}
        filterToSameNumberPosts
        enableScrollForMoreMoods={false}
      />
      {/* <MoodsGrid
				moods={moods}
				loadMore={actions.lists.top.moods}
				title={moods?.length ? "Top moods today" : ""}
			/> */}
      <TopCreators maxItems={4} title={"Explore top creators"} users={topUsers} to="/top/creators" />
      <Spotlights title={"Top videos"} carousel posts={topVideoPosts} href="top/videos" />
      <TopHashtags maxItems={3} title={"Explore top hashtags"} />
      <TopFolders
        title={"Explore more folders"}
        maxItems={3}
        maxPostsToShow={5}
        skipItems={3}
        filterToSameNumberPosts
        posts={"full"}
        enableScrollForMoreMoods={false}
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

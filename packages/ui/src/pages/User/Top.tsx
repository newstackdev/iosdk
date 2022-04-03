// import '../App.css';
import { useEffect } from "react";
import { NLView } from "../../types";
import { useActions, useAppState } from "../state";
import { UsersList } from "../../Components/UserWidget";
// import { ItemGrid } from "../Components/ItemGrid";
// import FolderClosed from '../Components/Icons/Folder/Closed';
// import { MoodsGrid } from './Mood/MoodsGrid';

export const UserTop: NLView = () => {
  const state = useAppState();
  const actions = useActions();

  const users = state.lists.top.users.items;

  useEffect(() => {
    !users.length && actions.lists.top.users();
  }, []);

  // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
  return (
    <div className="app-main-full-width">
      <h1>Top users today</h1>
      {/* {JSON.stringify(state.lists.top.users.items)} */}
      {/* <UsersList users={users} powerUp={true} /> */}
    </div>
  );
};
//loadMore={actions.lists.top.moods} />
export default UserTop;

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

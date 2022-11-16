import { MoodsGrid } from "./MoodsGrid";
import { NLView } from "../../types";
import { useActions, useAppState } from "../../overmind";

export const MyMoods: NLView = () => {
  useActions().routing.setTitle("My folders");

  return <MoodsGrid moods={useAppState().api.auth.moods} title="My folders" />;
};
export default MyMoods;

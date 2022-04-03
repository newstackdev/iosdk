import { NLView } from "@newcoin-foundation/core";
import { useActions, useAppState } from "@newcoin-foundation/state";
import { MoodsGrid } from "./MoodsGrid";

export const MyMoods: NLView = () => {
  useActions().routing.setTitle("My folders");

  return <MoodsGrid moods={useAppState().api.auth.moods} title="My folders" />;
};
export default MyMoods;

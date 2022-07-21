import { namespaced } from "overmind/config";
import rating from "./rating";
import stake from "./stake";
import user from "./user";
import userJourney from "./userJourney";
import vote from "./vote";

export default namespaced({
  user,
  rating,
  userJourney,
  stake,
  vote,
});

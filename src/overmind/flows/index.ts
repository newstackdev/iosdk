import { namespaced } from "overmind/config";
import user from "./user";
import rating from "./rating";
import userJourney from "./userJourney";

export default namespaced({
	user,
	rating,
    userJourney
});

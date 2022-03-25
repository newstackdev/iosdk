import { namespaced } from 'overmind/config'
import user from "./user";
import rating from "./rating";

export default namespaced({
    user,
    rating
});
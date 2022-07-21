import { NLView } from "./types";
import { PartialConfiguration } from "./config";
import { overmind as _overmind } from "./overmind";
export declare const App: NLView<{
    overmind: ReturnType<typeof _overmind>;
    config?: PartialConfiguration;
}>;
export default App;

import "swiper/css";
import "swiper/css/navigation";
import { MoodReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { NLView } from "../types";
export declare const SpotlightGrid: NLView<{
    maxItems?: number;
    title?: string;
    mood: MoodReadResponse;
    carousel: boolean;
    navigationPrevRef: any;
    navigationNextRef: any;
}>;
declare const Spotlights: NLView<{
    title?: string;
    maxRows?: number;
    maxItems?: number;
    carousel: boolean;
}>;
export default Spotlights;

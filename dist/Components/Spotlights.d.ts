import "swiper/css";
import "swiper/css/navigation";
import { PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NLView } from "../types";
export declare const SpotlightGrid: NLView<{
    title?: string;
    carousel?: boolean;
    navigationPrevRef: any;
    navigationNextRef: any;
    posts: PostReadResponse[];
}>;
declare const Spotlights: NLView<{
    href?: string;
    title?: string;
    carousel?: boolean;
    posts: PostReadResponse[];
}>;
export default Spotlights;

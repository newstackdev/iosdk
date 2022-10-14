/// <reference types="react" />
import { NLView } from "../../types";
interface ITitle {
    title?: string;
    href?: string;
    navigationPrevRef?: any;
    navigationNextRef?: any;
    deeplikeActions?: boolean;
    deepLikeContainer?: React.MutableRefObject<any>;
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    visible?: boolean;
}
declare const Title: NLView<ITitle>;
export default Title;

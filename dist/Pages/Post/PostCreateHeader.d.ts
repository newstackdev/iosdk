/// <reference types="react" />
import { NLView } from "../../types";
declare const PostCreateHeader: NLView<{
    contentType: string;
    setContentType: React.Dispatch<React.SetStateAction<string>>;
    onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}>;
export default PostCreateHeader;

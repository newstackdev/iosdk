/// <reference types="react" />
import { NLView } from "../../types";
import { LicenseProps } from "./PostCreateInfo";
declare const PostCreateHeader: NLView<{
    selectedLicense: LicenseProps;
    ncoBalance: number;
    contentType: string;
    setContentType: React.Dispatch<React.SetStateAction<string>>;
}>;
export default PostCreateHeader;

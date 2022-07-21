/// <reference types="react" />
import { NLView } from "../../types";
export declare type LicenseProps = {
    name: string;
    value: string;
};
declare const PostCreateInfo: NLView<{
    selectedLicense: LicenseProps;
    setSelectedLicense: React.Dispatch<React.SetStateAction<LicenseProps>>;
    setIsLicense: React.Dispatch<React.SetStateAction<boolean>>;
    isLicense: boolean;
    mintConfirmationOpen: boolean;
    ncoBalance: number;
    content: string;
    contentType: string;
    embedSwitch: boolean;
    isLoading: boolean;
}>;
export default PostCreateInfo;

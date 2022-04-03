/// <reference types="react" />
import { NLView } from "@newcoin-foundation/core";
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
}>;
export default PostCreateInfo;
//# sourceMappingURL=PostCreateInfo.d.ts.map
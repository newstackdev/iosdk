/// <reference types="react" />
import { IOView, NLView } from "../../types";
export declare const UserInvite: NLView;
export declare const InviteesList: IOView<{
    setVisibleForm: React.Dispatch<React.SetStateAction<boolean>>;
    maxItems?: number;
    title?: string;
}>;

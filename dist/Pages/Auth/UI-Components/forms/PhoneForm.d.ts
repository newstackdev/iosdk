/// <reference types="react" />
import { FormInstance } from "antd";
import { NLView } from "../../../../types";
declare const PhoneForm: NLView<{
    setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    embedded: boolean | undefined;
    phoneForm: FormInstance<any>;
}>;
export default PhoneForm;

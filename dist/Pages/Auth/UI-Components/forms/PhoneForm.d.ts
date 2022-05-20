/// <reference types="react" />
import { NLView } from "../../../../types";
import { FormInstance } from "antd";
declare const PhoneForm: NLView<{
    setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    embedded: boolean | undefined;
    phoneForm: FormInstance<any>;
}>;
export default PhoneForm;

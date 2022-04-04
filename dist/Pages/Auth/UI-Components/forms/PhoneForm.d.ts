/// <reference types="react" />
import { NLView } from "../../../../types";
import { FormInstance } from "antd";
import "./styles/Form.less";
declare const PhoneForm: NLView<{
    setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    embedded: boolean | undefined;
    phoneForm: FormInstance<any>;
    isErrorSubmit: boolean | undefined;
    handleCallBack: ((value: any) => any) | undefined;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    error: boolean;
}>;
export default PhoneForm;

/// <reference types="react" />
import { FormInstance } from "antd";
import { NLView } from "../../../../types";
declare const CodeForm: NLView<{
    setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    embedded: boolean | undefined;
    codeForm: FormInstance<any>;
}>;
export default CodeForm;

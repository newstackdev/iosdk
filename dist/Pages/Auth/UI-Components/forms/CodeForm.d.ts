/// <reference types="react" />
import { NLView } from "../../../../types";
import { FormInstance } from "antd";
declare const CodeForm: NLView<{
    setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    embedded: boolean | undefined;
    codeForm: FormInstance<any>;
}>;
export default CodeForm;

import { NLView } from "../types";
import TextArea from "antd/lib/input/TextArea";

// a unified way to display long hashes
export const HashDisplay: NLView<{ hash?: string }> = ({ hash }) => (
  <>
    <TextArea rows={3} value={hash || ""}></TextArea>
  </>
);

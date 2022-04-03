import TextArea from "antd/lib/input/TextArea";
import { NLView } from "@newcoin-foundation/core";

// a unified way to display long hashes
export const HashDisplay: NLView<{ hash?: string }> = ({ hash }) => (
  <>
    <TextArea rows={3} value={hash || ""}></TextArea>
  </>
);

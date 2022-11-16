import { Button } from "antd";
import { NLView } from "../types";
import { useAppState } from "../overmind";
import { useState } from "react";

export const WhitelistPreview: NLView<{
  setActiveTags: React.Dispatch<React.SetStateAction<string[]>>;
  activeTags: string[];
  user: any;
}> = ({ setActiveTags, activeTags, user }) => {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const state = useAppState();

  const items = state.lists.search.posts.results?.value || [];

  const buttonClassName = activeButton ? "primary-green-btn" : "secondary-button";

  return (
    <div className={"new-proposal-whitelist-ctn"}>
      <Button
        onClick={() => {
          if (activeTags.includes(user)) {
            const arr = [...activeTags];
            const index = arr.indexOf(user);
            index !== -1 && arr.splice(index, 1);
            setActiveTags(arr);
          } else {
            setActiveTags((p) => [...p, user]);
          }
          setActiveButton(!activeButton);
        }}
        className={`${buttonClassName} u-margin-bottom-medium u-margin-top-medium`}
        style={{ border: "none" }}
      >
        <span className={activeButton ? "paragraph-2r" : "paragraph-2u"}>{user}</span>
      </Button>
    </div>
  );
};

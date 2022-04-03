import { useActions } from "@newcoin-foundation/state";
import { useEffect } from "react";

export const About = () => {
  const actions = useActions();

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "About" }]);
  }, []);

  return (
    <>
      <h3>About</h3>
      This is newweb
    </>
  );
};

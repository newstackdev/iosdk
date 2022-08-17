import { Auth } from "../Auth/Auth";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";

export const Authenticate: IOView = () => {
  return (
    <ContentLayout customClass="app-content-layout">
      <Auth embedded={true} />
    </ContentLayout>
  );
};

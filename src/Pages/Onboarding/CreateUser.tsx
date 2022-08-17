import { Auth } from "../Auth/Auth";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";
import { UserCreate } from "../User/UserCreate";

export const CreateUser: IOView = () => {
  return (
    <ContentLayout customClass="app-content-layout">
      <UserCreate hideUsername={true} noRouing />
    </ContentLayout>
  );
};

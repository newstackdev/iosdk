import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";

export const NotInvited: IOView = () => {
  return (
    <ContentLayout>
      <div className="header-2b">
        This invite code is invalid.
        <br />
        Please check the invite code/link that you received and make sure you enter it exactly.
        <br />
        <br />
        If you don't have an invite code ask around your social networks to get an invite.
      </div>
      <p>
        Running into trouble? Get in touch on our <a href="https://t.me/newcoinprotocol">Telegram channel</a>.
      </p>
    </ContentLayout>
  );
};

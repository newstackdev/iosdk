import { Button } from "antd";
import { IOView } from "../types";
import { useAppState } from "../overmind";

export const UnsidAuth: IOView<{
  redirectPath?: string;
  redirectUrl?: string;
}> = ({ children, redirectPath, redirectUrl }) => {
  const state = useAppState();

  const hostname = state.config.settings.app.currentHost;
  const params = {
    requestor: state.config.settings.newcoin.daoDomain,
    referer: hostname,
    redirectUrl: redirectUrl || redirectPath || `https://${hostname}`,
  };
  const unsidUrl = `https://auth-dev.unsid.org/explore?requestor=${params.requestor}&referer=${params.referer}&redirectUrl=${params.redirectUrl}`;

  return (
    <>
      {children || (
        <>
          {params.requestor && <h1 className="text-center">{`Welcome to ${state.config.settings.app.name}`}</h1>}
          <h2 className="text-center">This service is using UNSID - the distributed identity service for access management.</h2>

          <br />
          {params.requestor ? (
            <>
              <h2 className="text-center">Please sign in using your account at auth.unsid.org</h2>
              <div className="text-center">
                <Button style={{ fontSize: 30, height: 60, marginTop: 60 }} onClick={() => ((window.location as any) = unsidUrl)}>
                  Sign In
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center" style={{ maxWidth: 800 }}>
              This application had not been configured correctly.
              <br />
              <br />
              If you are the developer of the app:
              <br />
              <br />
              <ul>
                <li>
                  Have you created your app entry yet? If not create it at&nbsp;
                  <a href="https://console-dev.newstack.dev">console-dev.newstack.dev</a>&nbsp;. It only takes a few minutes.
                  <br />
                  <br />
                </li>

                <li>
                  Got an app created? You are likely missing just a tiny bit of config. Please follow the instructions at&nbsp;
                  <a href="https://console-dev.newstack.dev/instructions">console-dev.newstack.dev</a>&nbsp;.
                  <br />
                  <br />
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

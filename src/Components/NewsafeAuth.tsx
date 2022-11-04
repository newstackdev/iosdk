import { Alert, Button } from "antd";
import { IOView } from "../types";
import { useActions, useAppState } from "../overmind";

const maybeWithEnv = (v, env: string) => (env != "prod" ? v : `${v}-${env}`);

export const NewsafeAuth: IOView<{
  redirectPath?: string;
  redirectUrl?: string;
}> = ({ children, redirectPath, redirectUrl }) => {
  const state = useAppState();
  const actions = useActions();

  const hostname = state.config.settings.newsafe.currentHost || state.config.settings.app.currentHost;
  const params = {
    requestor: state.config.settings.newcoin.daoDomain,
    referer: hostname,
    redirectUrl: redirectUrl || redirectPath || `https://${hostname}`,
  };

  const env = state.config.env.env;
  const newstackConsoleUrl = maybeWithEnv("https://console", env) + ".newstack.dev";
  return (
    <>
      {children || (
        <>
          {params.requestor && <h1 className="text-center">{`Welcome to ${state.config.settings.app.name}`}</h1>}
          <h2 className="text-center">
            This service is using NEWSAFE
            <br />
            the decentralized identity and access management service.
          </h2>

          <br />
          {params.requestor ? (
            <>
              <h2 className="text-center">Please sign in using your account at auth.newsafe.org</h2>
              <div className="text-center">
                <Button
                  style={{ fontSize: 30, height: 60, marginTop: 60 }}
                  onClick={() => actions.newsafe.navigateToNewsafeAuthUrl()}
                >
                  Sign In
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center" style={{ maxWidth: 800 }}>
              <Alert
                message={
                  <>
                    This application had not been configured correctly.
                    <br />
                    <br />
                    If you are the developer of the app:
                    <br />
                    <br />
                    <ul>
                      <li>
                        Have you created your app entry yet? If not create it at&nbsp;
                        <a href={newstackConsoleUrl}>{newstackConsoleUrl}</a>&nbsp;. It only takes a few minutes.
                        <br />
                        <br />
                      </li>

                      <li>
                        Got an app created? You are likely missing just a tiny bit of config. Please follow the instructions
                        at&nbsp;
                        <a href={`${newstackConsoleUrl}/instructions`}>{newstackConsoleUrl}</a>&nbsp;.
                        <br />
                        <br />
                      </li>
                    </ul>
                  </>
                }
                type="error"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

import { Alert, Button } from "antd";
import { IOView } from "../types";
import { useActions, useAppState } from "../overmind";

const maybeWithEnv = (v, env: string) => (env === "prod" ? v : `${v}-${env}`);

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

  const { stage, env } = state.config.env;
  const newstackConsoleUrl = maybeWithEnv("https://console", env) + ".newstack.dev";

  const isConfigured = params.requestor && stage;

  return (
    <>
      {children || (
        <>
          {isConfigured && <h1 className="text-center">{`Welcome to ${state.config.settings.app.name}`}</h1>}
          <h2 className="text-center">
            This application is using NEWSAFE
            <br />
            the decentralized identity and access management service.
          </h2>
          <br />
          {isConfigured ? (
            <>
              <h2 className="text-center">Please sign in using your account at auth.newsafe.org</h2>
              <br />
              <div className="text-center">
                <Button onClick={() => actions.newsafe.navigateToNewsafeAuthUrl()}>Sign In</Button>
              </div>
            </>
          ) : (
            <div>
              <Alert
                message={
                  <>
                    <br />
                    <h3 className="text-center">This application had not been configured correctly.</h3>
                    <br />
                    If you are the developer of the app:
                    <br />
                    <br />
                    <ul className="text-left">
                      <li>
                        Have you created your app entry yet? If not create it at&nbsp;
                        <a href={newstackConsoleUrl} target="_new">
                          {newstackConsoleUrl}
                        </a>
                        . It only takes a few minutes.
                        <br />
                        <br />
                      </li>
                      <li>
                        Got an app created? You are likely missing just a tiny bit of config. Please follow the instructions
                        at&nbsp;
                        <a href={`${newstackConsoleUrl}/instructions`} target="_new">
                          {newstackConsoleUrl}
                        </a>
                        . Remember to restart the app for the configuration to take effect.
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

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
          <h1 className="text-center">{`Welcome to ${state.config.settings.app.name}`}</h1>
          <h2 className="text-center">This is a unsid-enabled service.</h2>
          <h2 className="text-center">Please sign in using your account at auth.unsid.org</h2>
          <div className="text-center">
            <Button style={{ fontSize: 30, height: 60, marginTop: 60 }} onClick={() => ((window.location as any) = unsidUrl)}>
              Sign In
            </Button>
          </div>
        </>
      )}
    </>
  );
};

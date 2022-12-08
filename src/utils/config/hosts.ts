export const actualCurrentHost = window.location.hostname;
export const isLocalhost = ["127.0.0.1", "localhost"].includes(actualCurrentHost);

export const getCurrentHost = (localhostHost: string) => {
  if (!isLocalhost) return actualCurrentHost;

  const lh = localhostHost.split(/,/)[0]; // assume could be a list of hosts
  return lh;
};

const win = window as any;
export const replaceHost = (host?: string) =>
  // eslint-disable-next-line prettier/prettier
  `https://${host || window.location.host}${window.location.pathname}${window.location.search ? "?" + window.location.search : ""
  }`;

// if (window.location.protocol != "https:" && !isLocalhost) (window.location as any) = replaceHost();
// `https://${window.location.host}${window.location.pathname}${window.location.search ? "?" + window.location.search : ""}`;

export const ensureCanonicalHost = (canonicalHosts: Record<string, string | undefined> = {}, stage) => {
  const canonicalHostsForStage: string[] = (canonicalHosts[stage] || "").split(/,/);
  if (!isLocalhost && canonicalHostsForStage.length && !canonicalHostsForStage.includes(actualCurrentHost))
    (window.location as any) = `https://${canonicalHostsForStage[0]}${window.location.pathname}${
      window.location.search ? "?" + window.location.search : ""
    }`;
};

export const ensureProtocol = () => {
  if (window.location.protocol != "https:" && !isLocalhost) (window.location as any) = replaceHost();
};

export const ensureProtocolAndHost = (canonicalHosts: Record<string, string | undefined> = {}, stage) => {
  ensureProtocol();
  ensureCanonicalHost(canonicalHosts, stage);
};

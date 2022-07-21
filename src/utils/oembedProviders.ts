import { OEMBED_PROVIDERS } from "../constants";

export const findOembedProvider = (url: string) => {
  if (!isValidURL(url)) {
    return null;
  }

  const domain = getDomain(url);

  const providers = getProviders();

  for (let i = 0; i < providers.length; i++) {
    const prov = providers[i];
    const { endpoints, provider_name: providerName, provider_url: providerUrl } = prov;
    const endpoint = getEndpoint(url, domain, endpoints);
    if (endpoint) {
      return {
        fetchEndpoint: endpoint.url,
        providerName,
        providerUrl,
      };
    }
  }

  return null;
};

export const hasOembedProvider = (url: string) => {
  return findOembedProvider(url) !== null;
};

export const getProviders = () => {
  return [...store.providers];
};

const getDomain = (url: string) => {
  try {
    const { host } = new URL(url);
    return host;
  } catch (err) {
    return "";
  }
};

const isValidURL = (url: string) => {
  try {
    const ourl = new URL(url);
    return ourl !== null && ourl.protocol.startsWith("http");
  } catch (err) {
    return false;
  }
};

const providersFromList = (providers: any) => {
  return providers
    .map((provider) => {
      const { provider_url: url } = provider;
      provider.domain = getDomain(url);
      return provider;
    })
    .filter((provider) => {
      return provider.domain !== "";
    });
};

const store = {
  providers: providersFromList(OEMBED_PROVIDERS),
};

const getEndpoint = (url: string, domain: string, endpoints: any) => {
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    const { schemes = [], url: endpointUrl } = endpoint;
    if (schemes.length === 0) {
      const endpointDomain = getDomain(endpointUrl);
      if (endpointDomain === domain) {
        return endpoint;
      }
    }
    const isMatchedScheme = schemes.some((scheme) => {
      const reg = new RegExp(scheme.replace(/\*/g, "(.*)").replace(/\?/g, "\\?").replace(/,$/g, ""), "i");
      return url.match(reg);
    });
    if (isMatchedScheme) {
      return endpoint;
    }
  }
  return null;
};

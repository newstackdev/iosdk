import { isEmpty } from "lodash";
import Web3 from "web3";

let web3js: Web3 | null = null;

const ethereum = (window as any as { ethereum: any }).ethereum;

export const initWeb3 = () => {
  if (!web3js) {
    web3js = new Web3(ethereum);
  }
};

initWeb3();

const detectCurrentProvider = () => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  }
  return provider;
};

export const connect = async (): Promise<string> => {
  const currentProvider = detectCurrentProvider();
  if (currentProvider) {
    if (currentProvider !== window.ethereum) {
      return "Non-web3 browser detected. You should consider trying MetaMask!";
    }
    try {
      await currentProvider.request({ method: "eth_requestAccounts" });
      const userAccount = (await web3js?.eth.getAccounts()) || [];
      if (userAccount?.length === 0) {
        return "Please connect to meta mask";
      }
      return "";
    } catch (e) {
      return "There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.";
    }
  }
  return "Non-web3 browser detected. You should consider trying MetaMask!";
};

export const sendSignedMessage = async (acc_address: string, username: string) => {
  const m = {
    timestamp: Date.now().toString(),
    address: acc_address.toLowerCase(),
    username,
  };
  const payload = JSON.stringify(m);
  const signature = (await web3js?.eth.personal.sign(payload, acc_address, "")) || "";
  return {
    payload,
    encryptedPayload: signature,
  };
};

export const checkConnection = async () => {
  try {
    const accs = await ethereum.request({ method: "eth_accounts" });
    if (isEmpty(accs)) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const getCurrentAccount = async () => {
  const userAccount = (await web3js?.eth.getAccounts()) || [];
  return userAccount[0];
};

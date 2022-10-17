import { NLView } from "../types";

export const blockExplorerUrl = {
  blocks: (id: string) =>
    !id
      ? ""
      : `https://local.bloks.io/transaction/${id}?` +
        "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
        "hyperionUrl=http%3A%2F%2Fhyperion-dev.newcoin.org",

  newcoin: (id: string) => `https://newscan.live/transaction/${id}`,
  //  `https://explorer-dev.newcoin.org/transaction/${id}`,
};

export const BlockExplorerLink: NLView<{
  id?: string;
  explorer?: "newcoin" | "blocks";
}> = ({ id, explorer }) =>
  id ? (
    <a href={blockExplorerUrl[explorer || "newcoin"](id)} target="_blank" rel="noreferrer">
      {id}
    </a>
  ) : (
    <></>
  );

// <div style={{ maxWidth: "10ch", textOverflow: "ellipsis" }}>
// </div>

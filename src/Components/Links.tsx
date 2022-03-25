import { NLView } from "../types";


const makeUrl = {
    blocks: (id: string) => !id ? "" : 
        `https://local.bloks.io/transaction/${id}?` +
            "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
            "hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org",

    newcoin: (id: string) => 
        `https://explorer.newcoin.org/transaction/${id}`
}

export const BlockExplorerLink: 
    NLView<{
        id?: string,
        explorer?: "newcoin" | "blocks" 
    }> = 
        ({ id, explorer }) =>
            <div style={{ maxWidth: "10ch", textOverflow: "ellipsis" }}>
                { id ? <a href={makeUrl[explorer || "newcoin"](id)}>{id}</a> : "" }
            </div>
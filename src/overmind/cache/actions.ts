import { Action } from "src/types";
import { PostReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { json } from "overmind";
import Dexie from "dexie";

export const initStore: Action<{ name: string }> = (_, { name }) => {};

const put = async (table: Dexie.Table, value: any) => {
  try {
    await table.put(json(value));
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const store: Action<{ label: string; value: any }> = async ({ state }, { label, value }) => {
  return put(state.cache.db.nodes[label], value);
};

export const storeMultiple: Action<{ label: string; value: any[] }> = async ({ state }, { label, value }) => {
  const t = state.cache.db.nodes[label];
  Promise.all(value.map((d) => put(t, d)));
};

type IGraphObject = { id?: string };

export const storeEdge: Action<{
  fromLabel?: string;
  toLabel: string;
  from: IGraphObject;
  to: IGraphObject;
  value?: any;
}> = async ({ effects }, { fromLabel, toLabel, from, to, value }) => {
  return put(effects.cache.edges(), { fromLabel, toLabel, fromId: from.id, toId: to.id, value });
};

export const storeEdgeMultiple: Action<{
  fromLabel?: string;
  toLabel?: string;
  from: IGraphObject[];
  to: IGraphObject[];
  value?: any;
}> = async ({ effects }, { fromLabel, toLabel, from, to, value }) => {
  const tbl = effects.cache.edges();
  await Promise.all(
    from.flatMap((f) => to.map((t) => put(tbl, { fromLabel, toLabel, fromId: f.id, toId: t.id, value: value || {} }))),
  );
  return;
};

export const getPost: Action<PostReadResponse> = async ({ effects }, post) => {
  return await effects.cache.db()["posts"].get({ id: post.id });
};

export const onInitializeOvermind: Action = async ({ effects, state, actions, reaction }) => {
  effects.cache.init("iosdk-cache", {
    // [EDGES_TABLE_NAME]: "++id,fromLabel,toLabel,fromId,toId",
    post: "id,created,author.username",
    user: "id,created,username",
    folder: "id,created,username",
  });

  const db = effects.cache.db();
  await effects.cache.open();

  db.db.on("ready", () => {
    state.cache.ready = true;
  });

  setTimeout(() => {
    state.cache._db = () => db;
  });

  // state.cache._edges = () => db[EDGES_TABLE_NAME];
};

// moods: "id,created,author.username",
// userMoods: "id,username",
//   const id = "test-124"; //Date.now().toString();
//   await actions.cache.cachePost({ post: { id, created: id, title: "Monkey gone to heaven" } });
//   const r = await actions.cache.getPost({ id });
//   console.log(r);
// export const cachePost: Action<{ label: PostReadResponse }> = async ({ state }, { post }) => {
//   try {
//     await state.cache.db["posts"].put(post);
//   } catch (ex) {
//     console.log(ex);
//   }
// };

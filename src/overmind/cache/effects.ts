import Dexie from "dexie";

// export default (() => {
export const internal = {
  db: {},
  nodes: {},
  edges: {},
} as { nodes: Dexie; db: Dexie; edges: Dexie.Table };

export const db = () => {
  return internal;
};
export const edges = () => internal.edges;

const EDGES_TABLE_NAME = "__EDGES";

export const init = (name: string = "iosdk-cache", stores: Record<string, string>) => {
  const db = new Dexie(name);
  db.version(1).stores({
    ...stores,
    [EDGES_TABLE_NAME]: "++id,__outE,__inE",
  });
  const edges = db[EDGES_TABLE_NAME];

  internal.nodes = internal.db = db;
  internal.edges = edges;
};
export const open = async () => {
  await internal.db.open();

  // return {
  //   db,
  //   edges,
  // };
};

//   return {
//     init
//   };
// })();

// db.version(1).stores({
//   friends: "++id, name, age", // Primary key and indexed props
// });

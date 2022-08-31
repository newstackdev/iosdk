import { derived } from "overmind";
import Dexie, { DexieConstructor } from "dexie";

export default {
  get db() {
    const d = this._db();
    return d ? { ...d, ready: true } : { nodes: {} as Dexie, edges: {} as Dexie.Table, ready: false };
  },
  // db: derived((state: any) => {
  //   const db = state?._db();
  //   return db
  //     ? { edges: db.nodes, nodes: db.db, ready: true }
  //     : {
  //         nodes: {},
  //         edges: {},
  //         ready: false,
  //       };
  // }),
  ready: false,
  _db: (() => {}) as () => { nodes: Dexie; edges: Dexie.Table },
  // _edges: (() => {}) as () => Dexie.Table,
};
// (state._db() || {}) as Dexie), //{} as Dexie,
// edges: derived((state: any) => (state._edges() || {}) as Dexie.Table), //{} as Dexie,
// };

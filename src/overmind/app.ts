type CustomPlaceholder = () => void;
// declare namespace iosdk {
export const app = {
  // custom: {
  //     actions: {
  //         info: CustomPlaceholder //(() => console.log("Not implemented")) as CustomPlaceholder
  //     },
  //     effects: {
  //         info: CustomPlaceholder //(() => console.log("Not implemented")) as CustomPlaceholder
  //     },
  //     state: {
  //         info: CustomPlaceholder //"Not implemented"
  //     }
  // } as const
};
// }
export type App = typeof app;

type CustomPlaceholder = () => void;

export const app = {
  custom: {
    actions: {
      info: (() => console.log("Not implemented")) as CustomPlaceholder,
    },
    effects: {
      info: (() => console.log("Not implemented")) as CustomPlaceholder,
    },
    state: {
      info: "Not implemented",
    },
  },
};

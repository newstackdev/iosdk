import { Action } from "../../types";
import { catchError } from "overmind";
import isEmpty from "lodash/isEmpty";

export const connect: Action<{}> = async ({ effects }) => {
  const m = await effects.evm.connect();
  if (!isEmpty(m)) {
    effects.ux.message.error(m);
  }
};

export const checkConnection: Action = async ({ effects }) => {
  const isConnected = await effects.evm.checkConnection();
  console.log(isConnected, "isConnected");
};

export const sendSignedMessage: Action = async ({ state, effects, actions }) => {
  await actions.evm.connect({});
  const acc = await effects.evm.getCurrentAccount();
  const message = await effects.evm.sendSignedMessage(acc, state.flows.user.create.form.username || "");
  if (isEmpty(message.encryptedPayload)) {
    effects.ux.message.error("invalid message signature");
  }
  try {
    await state.api.client.user.transferCreate(message);
    actions.flows.user.create.wizardStepNext();
    actions.routing.historyPush({ location: "/signup/create" });
    await actions.api.auth.logout({ keepFbUser: true });
    await actions.firebase.refreshApiToken();
    await actions.api.auth.authorize();
  } catch (e) {
    effects.ux.message.error("transfer was not successful");
  }
};

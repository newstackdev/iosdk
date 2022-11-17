export const defaultDao = (state) =>
  state.config.settings.newcoin.defaultToOwnDao ? state.api.auth.user.username : state.config.settings.newcoin.daoDomain;

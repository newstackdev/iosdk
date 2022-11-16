export const estimateUsernamePrice = (priceId) => ~~(8 * 10 ** (5 - (priceId.length - 3)));

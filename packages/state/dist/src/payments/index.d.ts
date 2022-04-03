import { Action } from "@newcoin-foundation/core";
import { Stripe, StripeElements } from "@stripe/stripe-js";
declare const _default: {
    actions: {
        pay: Action<{
            stripe?: Stripe;
            elements?: StripeElements;
        }, void>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map
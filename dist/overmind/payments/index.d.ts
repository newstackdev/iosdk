import { Stripe, StripeElements } from "@stripe/stripe-js";
import { Action } from "../../types";
declare const _default: {
    actions: {
        pay: Action<{
            stripe?: Stripe | null | undefined;
            elements?: StripeElements | null | undefined;
        }, void>;
    };
};
export default _default;

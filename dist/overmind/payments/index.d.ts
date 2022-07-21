import { Action } from "../../types";
import { Stripe, StripeElements } from "@stripe/stripe-js";
declare const _default: {
    actions: {
        pay: Action<{
            stripe?: Stripe | null | undefined;
            elements?: StripeElements | null | undefined;
        }, void>;
    };
};
export default _default;

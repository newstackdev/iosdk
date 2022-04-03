/// <reference types="react" />
import { Stripe } from "@stripe/stripe-js";
import { EmbeddableControl } from "@newcoin-foundation/core";
declare type CreateSubscriptionReq = {
    customerId: string;
    paymentMethodId: string;
    priceId: string;
};
declare type CreateSubscriptionRes = {
    paymentMethodId: string;
    priceId: string;
    subscription: string;
};
declare type Invoice = {
    payment_intent: {
        status: string;
        client_secret: string;
    };
};
declare type ProcessPaymentReq = {
    subscription: {
        status: string;
        latest_invoice: Invoice;
    };
    invoice: Invoice;
    priceId: string;
    paymentMethodId: string;
    isRetry: boolean;
};
export declare function handlePaymentThatRequiresCustomerAction(stripe: Stripe, { subscription, invoice, priceId, paymentMethodId, isRetry, }: ProcessPaymentReq): Promise<{
    subscription: {
        status: string;
        latest_invoice: Invoice;
    };
    priceId: string;
    paymentMethodId: string;
    invoice?: undefined;
} | {
    priceId: string;
    subscription: {
        status: string;
        latest_invoice: Invoice;
    };
    invoice: Invoice;
    paymentMethodId: string;
}>;
export declare function createSubscription(stripe: Stripe, api: any, { customerId, paymentMethodId, priceId }: CreateSubscriptionReq): Promise<CreateSubscriptionRes>;
export declare const Product: ({ embedded, setNext, }: React.PropsWithChildren<EmbeddableControl>) => JSX.Element;
export {};
//# sourceMappingURL=Product.d.ts.map
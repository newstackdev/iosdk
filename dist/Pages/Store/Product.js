import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { loadStripe, } from "@stripe/stripe-js";
import { PaymentElement, useElements, useStripe, } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useForm } from "antd/lib/form/Form";
import { AUTH_FLOW_STATUS } from "../../overmind/auth/state";
import { IndeterminateProgress, } from "../../Components/IndeterminateProgress";
import { ProgressButton } from "../../Components/ProgressButton";
import { config } from "../../config";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${config.settings.stripe.publicKey}`);
export async function handlePaymentThatRequiresCustomerAction(stripe, { subscription, invoice, priceId, paymentMethodId, isRetry, }) {
    if (subscription && subscription.status === "active") {
        // Subscription is active, no customer actions required.
        return { subscription, priceId, paymentMethodId };
    }
    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    let paymentIntent = invoice
        ? invoice.payment_intent
        : subscription.latest_invoice.payment_intent;
    if (paymentIntent.status === "requires_action" ||
        (isRetry === true && paymentIntent.status === "requires_payment_method")) {
        try {
            const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: paymentMethodId,
            });
            if (result?.paymentIntent?.status === "succeeded") {
                // Show a success message to your customer.
                // subscription = stripe.subsc.retrieve(subscription.id)
                return {
                    priceId: priceId,
                    subscription: subscription,
                    invoice: invoice,
                    paymentMethodId: paymentMethodId,
                };
            }
            // const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
            // });
            // return { subscription, priceId, paymentMethodId };
        }
        catch (ex) {
            // Start code flow to handle updating the payment details.
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc).
            // displayError(error);
            throw ex;
        }
    }
    else {
    }
}
export async function createSubscription(stripe, api, { customerId, paymentMethodId, priceId }) {
    try {
        const createSubscriptionResponse = await api.payment.stripeSubscriptionCreate({
            customerId,
            paymentMethodId,
            priceId,
        });
        // chandlePaymentThatRequiresCustomerAction(stripe, createSubscriptionResponse);
        const result = "x";
        return createSubscriptionResponse;
        // return {
        //     paymentMethodId: paymentMethodId,
        //     priceId: priceId,
        //     subscription: result
        // };
    }
    catch (ex) {
        console.log(ex);
    }
    // // Some payment methods require a customer to be on session
    // // to complete the payment process. Check the status of the
    // // payment intent to handle these actions.
    // .then(handlePaymentThatRequiresCustomerAction)
    // // If attaching this card to a Customer object succeeds,
    // // but attempts to charge the customer fail, you
    // // get a requires_payment_method error.
    // .then(handleRequiresPaymentMethod)
    // // No more actions required. Provision your service for the user.
    // .then(onSubscriptionComplete)
    // .catch((error) => {
    //     // An error has happened. Display the failure to the user here.
    //     // We utilize the HTML element we created.
    //     showCardError(error);
    // })
}
const CheckoutForm = ({ embedded, setNext, }) => {
    const stripe = useStripe();
    const elements = useElements();
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const [form] = useForm();
    useEffect(() => {
        embedded &&
            setNext &&
            setNext({
                text: "Continue",
                command: () => form.submit(),
            });
    }, [embedded && setNext]);
    const onPaymentElementChanged = (e) => {
        console.log(e);
    };
    return (
    // <Elements stripe={stripePromise} options={options}>
    _jsxs(Form, { form: form, onFinish: () => actions.payments.pay({ stripe, elements }), children: [_jsx(Form.Item, { name: "payment", children: _jsx("div", { style: { minHeight: 142 }, children: _jsx(PaymentElement, { onChange: onPaymentElementChanged }) }) }), _jsx(Form.Item, { hidden: embedded, children: _jsx(ProgressButton, { progressText: "Processing payment...", type: "primary", actionName: "payments.pay", htmlType: "submit", disabled: !stripe || !elements, children: "Submit" }) })] })
    // </Elements>
    );
};
const estimateUsernamePrice = (priceId) => ~~(8 * (10 ** (5 - (priceId.length - 3))));
export const Product = ({ embedded, setNext, }) => {
    const [flowState, setFlowState] = useState({ options: { clientSecret: "" }, intent: {} });
    const state = useAppState();
    const actions = useActions();
    // const [price, setPrice] = useState<any>("io-domain-presale-standard");
    const requestedUsername = state.flows.user.create.form.username;
    const price = estimateUsernamePrice(requestedUsername);
    console.log(requestedUsername);
    useEffect(() => {
        if (!state.indicators.isWorking &&
            !state.api.auth.user?.id &&
            state.auth.status === AUTH_FLOW_STATUS.AUTHENTICATED) {
            actions.flows.user.create.preregisterCreate({ noRouting: true });
        }
    }, [state.api.auth.user, state.auth.status, state.indicators.isWorking]);
    useEffect(() => {
        if (!state.api.auth.user?.id)
            return;
        // return;
        (async () => {
            const newPaymentIntent = await state.api.client.payment.stripeIntentCreate({
                items: [{ productId: "io-domain-sale", priceId: requestedUsername }],
            });
            setFlowState({
                intent: newPaymentIntent.data,
                options: {
                    clientSecret: newPaymentIntent.data.client_secret || "",
                },
            });
        })();
    }, [price, state.api.auth.user, state.auth.authenticated]);
    const paymentIntent = flowState.intent || {};
    const options = flowState.options;
    if (!state.api.auth.user?.id)
        return (_jsx("div", { className: "app-main-centered", style: { minWidth: 150 }, children: _jsx(IndeterminateProgress, { inProgress: true }) }));
    return (_jsxs("div", { className: "app-main-full-height-only-with-bottom-control", children: [_jsx("br", {}), _jsx("br", {}), paymentIntent["amount"] && (_jsxs("h2", { className: "header-2", children: ["Total for premium domain ", _jsx("b", { children: requestedUsername }), ": ", paymentIntent["amount"] / 100, "EUR"] })), _jsx("br", {}), _jsx("div", { style: { maxWidth: 600, minHeight: 380 }, children: options.clientSecret && (_jsx(Elements, { stripe: stripePromise, options: options, children: _jsx(CheckoutForm, { embedded: embedded, setNext: setNext }) })) })] }));
};
//# sourceMappingURL=Product.js.map
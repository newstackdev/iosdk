"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.createSubscription = exports.handlePaymentThatRequiresCustomerAction = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const stripe_js_1 = require("@stripe/stripe-js");
const react_stripe_js_1 = require("@stripe/react-stripe-js");
const react_stripe_js_2 = require("@stripe/react-stripe-js");
const antd_1 = require("antd");
const react_1 = require("react");
const overmind_1 = require("../../overmind");
const Form_1 = require("antd/lib/form/Form");
const state_1 = require("../../overmind/auth/state");
const antd_2 = require("antd");
const IndeterminateProgress_1 = require("../../Components/IndeterminateProgress");
const ProgressButton_1 = require("../../Components/ProgressButton");
const config_1 = require("../../config");
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = (0, stripe_js_1.loadStripe)(`${config_1.config.settings.stripe.publicKey}`);
async function handlePaymentThatRequiresCustomerAction(stripe, { subscription, invoice, priceId, paymentMethodId, isRetry, }) {
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
exports.handlePaymentThatRequiresCustomerAction = handlePaymentThatRequiresCustomerAction;
async function createSubscription(stripe, api, { customerId, paymentMethodId, priceId }) {
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
exports.createSubscription = createSubscription;
const CheckoutForm = ({ embedded, setNext, }) => {
    const stripe = (0, react_stripe_js_1.useStripe)();
    const elements = (0, react_stripe_js_1.useElements)();
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const effects = (0, overmind_1.useEffects)();
    const [form] = (0, Form_1.useForm)();
    (0, react_1.useEffect)(() => {
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
    (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, onFinish: () => actions.payments.pay({ stripe, elements }), children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "payment", children: (0, jsx_runtime_1.jsx)("div", { style: { minHeight: 142 }, children: (0, jsx_runtime_1.jsx)(react_stripe_js_1.PaymentElement, { onChange: onPaymentElementChanged }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { hidden: embedded, children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { progressText: "Processing payment...", type: "primary", actionName: "payments.pay", htmlType: "submit", disabled: !stripe || !elements, children: "Submit" }) })] })
    // </Elements>
    );
};
const Product = ({ embedded, setNext, }) => {
    const [flowState, setFlowState] = (0, react_1.useState)({ options: { clientSecret: "" }, intent: {} });
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const [price, setPrice] = (0, react_1.useState)("io-domain-presale-standard");
    console.log(price);
    (0, react_1.useEffect)(() => {
        if (!state.indicators.isWorking &&
            !state.api.auth.user?.id &&
            state.auth.status === state_1.AUTH_FLOW_STATUS.AUTHENTICATED) {
            actions.flows.user.create.preregisterCreate({ noRouting: true });
        }
    }, [state.api.auth.user, state.auth.status, state.indicators.isWorking]);
    (0, react_1.useEffect)(() => {
        if (!state.api.auth.user?.id)
            return;
        return;
        (async () => {
            const newPaymentIntent = await state.api.client.payment.stripeIntentCreate({
                items: [{ productId: "io-domain-presale", priceId: price }],
            });
            setFlowState({
                intent: newPaymentIntent.data,
                options: {
                    clientSecret: newPaymentIntent.data.client_secret || "",
                },
            });
        })();
    }, [price, state.api.auth.user?.id, state.auth.authenticated]);
    const paymentIntent = flowState.intent || {};
    const options = flowState.options;
    if (!state.api.auth.user?.id)
        return ((0, jsx_runtime_1.jsx)("div", { className: "app-main-centered", style: { minWidth: 150 }, children: (0, jsx_runtime_1.jsx)(IndeterminateProgress_1.IndeterminateProgress, { inProgress: true }) }));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "app-main-full-height-only-with-bottom-control", children: [(0, jsx_runtime_1.jsx)(antd_2.Checkbox.Group, { value: price, onChange: (v) => setPrice(v[v.length - 1]), style: { width: "100%" }, children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "bottom", justify: "space-between", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 2, children: (0, jsx_runtime_1.jsx)(antd_2.Checkbox, { value: "io-domain-presale-standard", className: "dm-presale-form-checkbox" }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2b", children: "standard" }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 2, children: (0, jsx_runtime_1.jsx)(antd_2.Checkbox, { value: "io-domain-presale-premium", className: "dm-presale-form-checkbox" }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2b", children: "premium" }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 2, children: (0, jsx_runtime_1.jsx)(antd_2.Checkbox, { value: "io-domain-presale-lifetime", className: "dm-presale-form-checkbox" }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2b", children: "lifetime" }) })] }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), paymentIntent["amount"] && ((0, jsx_runtime_1.jsxs)("h2", { className: "header-2", children: ["Total: ", paymentIntent["amount"] / 100, "EUR"] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { style: { maxWidth: 600, minHeight: 380 }, children: options.clientSecret && ((0, jsx_runtime_1.jsx)(react_stripe_js_2.Elements, { stripe: stripePromise, options: options, children: (0, jsx_runtime_1.jsx)(CheckoutForm, { embedded: embedded, setNext: setNext }) })) })] }));
};
exports.Product = Product;
//# sourceMappingURL=Product.js.map
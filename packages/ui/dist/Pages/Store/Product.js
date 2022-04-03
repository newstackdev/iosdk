"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Product = exports.createSubscription = exports.handlePaymentThatRequiresCustomerAction = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var stripe_js_1 = require("@stripe/stripe-js");
var react_stripe_js_1 = require("@stripe/react-stripe-js");
var react_stripe_js_2 = require("@stripe/react-stripe-js");
var antd_1 = require("antd");
var react_1 = require("react");
var Form_1 = require("antd/lib/form/Form");
var antd_2 = require("antd");
var IndeterminateProgress_1 = require("../../Components/IndeterminateProgress");
var ProgressButton_1 = require("../../Components/ProgressButton");
var state_1 = require("@newcoin-foundation/state");
var state_2 = require("@newcoin-foundation/state/dist/src/auth/state");
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
var stripePromise = (0, stripe_js_1.loadStripe)("pk_test_wPJ6hXufjI4FCyabWUFsEnRf002P6QN6lX");
function handlePaymentThatRequiresCustomerAction(stripe, _a) {
    var _b;
    var subscription = _a.subscription, invoice = _a.invoice, priceId = _a.priceId, paymentMethodId = _a.paymentMethodId, isRetry = _a.isRetry;
    return __awaiter(this, void 0, void 0, function () {
        var paymentIntent, result, ex_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (subscription && subscription.status === "active") {
                        // Subscription is active, no customer actions required.
                        return [2 /*return*/, { subscription: subscription, priceId: priceId, paymentMethodId: paymentMethodId }];
                    }
                    paymentIntent = invoice
                        ? invoice.payment_intent
                        : subscription.latest_invoice.payment_intent;
                    if (!(paymentIntent.status === "requires_action" ||
                        (isRetry === true && paymentIntent.status === "requires_payment_method"))) return [3 /*break*/, 5];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, stripe.confirmCardPayment(paymentIntent.client_secret, {
                            payment_method: paymentMethodId
                        })];
                case 2:
                    result = _c.sent();
                    if (((_b = result === null || result === void 0 ? void 0 : result.paymentIntent) === null || _b === void 0 ? void 0 : _b.status) === "succeeded") {
                        // Show a success message to your customer.
                        // subscription = stripe.subsc.retrieve(subscription.id)
                        return [2 /*return*/, {
                                priceId: priceId,
                                subscription: subscription,
                                invoice: invoice,
                                paymentMethodId: paymentMethodId
                            }];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _c.sent();
                    // Start code flow to handle updating the payment details.
                    // Display error message in your UI.
                    // The card was declined (i.e. insufficient funds, card has expired, etc).
                    // displayError(error);
                    throw ex_1;
                case 4: return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.handlePaymentThatRequiresCustomerAction = handlePaymentThatRequiresCustomerAction;
function createSubscription(stripe, api, _a) {
    var customerId = _a.customerId, paymentMethodId = _a.paymentMethodId, priceId = _a.priceId;
    return __awaiter(this, void 0, void 0, function () {
        var createSubscriptionResponse, result, ex_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api.payment.stripeSubscriptionCreate({
                            customerId: customerId,
                            paymentMethodId: paymentMethodId,
                            priceId: priceId
                        })];
                case 1:
                    createSubscriptionResponse = _b.sent();
                    result = "x";
                    return [2 /*return*/, createSubscriptionResponse];
                case 2:
                    ex_2 = _b.sent();
                    console.log(ex_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createSubscription = createSubscription;
var CheckoutForm = function (_a) {
    var embedded = _a.embedded, setNext = _a.setNext;
    var stripe = (0, react_stripe_js_1.useStripe)();
    var elements = (0, react_stripe_js_1.useElements)();
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var effects = (0, state_1.useEffects)();
    var form = (0, Form_1.useForm)()[0];
    (0, react_1.useEffect)(function () {
        embedded &&
            setNext &&
            setNext({
                text: "Continue",
                command: function () { return form.submit(); }
            });
    }, [embedded && setNext]);
    var onPaymentElementChanged = function (e) {
        console.log(e);
    };
    return (
    // <Elements stripe={stripePromise} options={options}>
    (0, jsx_runtime_1.jsxs)(antd_1.Form, __assign({ form: form, onFinish: function () { return actions.payments.pay({ stripe: stripe, elements: elements }); } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ name: "payment" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: { minHeight: 142 } }, { children: (0, jsx_runtime_1.jsx)(react_stripe_js_1.PaymentElement, { onChange: onPaymentElementChanged }) })) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ hidden: embedded }, { children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ type: "primary", actionName: "payments.pay", htmlType: "submit", disabled: !stripe || !elements }, { children: "Submit" })) }))] }))
    // </Elements>
    );
};
var Product = function (_a) {
    var _b, _c;
    var embedded = _a.embedded, setNext = _a.setNext;
    var _d = (0, react_1.useState)({ options: { clientSecret: "" }, intent: {} }), flowState = _d[0], setFlowState = _d[1];
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var _e = (0, react_1.useState)("io-domain-presale-standard"), price = _e[0], setPrice = _e[1];
    console.log(price);
    (0, react_1.useEffect)(function () {
        var _a;
        if (!state.indicators.isWorking &&
            !((_a = state.api.auth.user) === null || _a === void 0 ? void 0 : _a.id) &&
            state.auth.status === state_2.AUTH_FLOW_STATUS.AUTHENTICATED) {
            actions.flows.user.create.preregisterCreate({ noRouting: true });
        }
    }, [state.api.auth.user, state.auth.status, state.indicators.isWorking]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (!((_a = state.api.auth.user) === null || _a === void 0 ? void 0 : _a.id))
            return;
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var newPaymentIntent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, state.api.client.payment.stripeIntentCreate({
                            items: [{ productId: "io-domain-presale", priceId: price }]
                        })];
                    case 1:
                        newPaymentIntent = _a.sent();
                        setFlowState({
                            intent: newPaymentIntent.data,
                            options: {
                                clientSecret: newPaymentIntent.data.client_secret || ""
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [price, (_b = state.api.auth.user) === null || _b === void 0 ? void 0 : _b.id, state.auth.authenticated]);
    var paymentIntent = flowState.intent || {};
    var options = flowState.options;
    if (!((_c = state.api.auth.user) === null || _c === void 0 ? void 0 : _c.id))
        return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "app-main-centered", style: { minWidth: 150 } }, { children: (0, jsx_runtime_1.jsx)(IndeterminateProgress_1.IndeterminateProgress, { inProgress: true }) })));
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "app-main-full-height-only-with-bottom-control" }, { children: [(0, jsx_runtime_1.jsx)(antd_2.Checkbox.Group, __assign({ value: price, onChange: function (v) { return setPrice(v[v.length - 1]); }, style: { width: "100%" } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "bottom", justify: "space-between" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 2 }, { children: (0, jsx_runtime_1.jsx)(antd_2.Checkbox, { value: "io-domain-presale-standard", className: "dm-presale-form-checkbox" }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2b" }, { children: "standard" })) }), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 2 }, { children: (0, jsx_runtime_1.jsx)(antd_2.Checkbox, { value: "io-domain-presale-premium", className: "dm-presale-form-checkbox" }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2b" }, { children: "premium" })) }), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 2 }, { children: (0, jsx_runtime_1.jsx)(antd_2.Checkbox, { value: "io-domain-presale-lifetime", className: "dm-presale-form-checkbox" }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2b" }, { children: "lifetime" })) })] })) })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), paymentIntent["amount"] && ((0, jsx_runtime_1.jsxs)("h2", __assign({ className: "header-2" }, { children: ["Total: ", paymentIntent["amount"] / 100, "EUR"] }))), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", __assign({ style: { maxWidth: 600, minHeight: 380 } }, { children: options.clientSecret && ((0, jsx_runtime_1.jsx)(react_stripe_js_2.Elements, __assign({ stripe: stripePromise, options: options }, { children: (0, jsx_runtime_1.jsx)(CheckoutForm, { embedded: embedded, setNext: setNext }) }))) }))] })));
};
exports.Product = Product;

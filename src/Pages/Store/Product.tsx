import {
	loadStripe,
	Stripe,
	StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Button, Col, Form, Radio, Row } from "antd";
import { useEffect, useState } from "react";
import { useActions, useAppState, useEffects } from "../../overmind";
import { PaymentStripePaymentIntentCreateResponse } from "@newlife/newlife-creator-client-api";
import { EmbeddableControl } from "../../types";
import { useForm } from "antd/lib/form/Form";
import { AUTH_FLOW_STATUS } from "../../overmind/auth/state";
import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import {
	IndeterminateProgress,
	IndeterminateProgressAction,
} from "../../Components/IndeterminateProgress";
import { ProgressButton } from "../../Components/ProgressButton";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_wPJ6hXufjI4FCyabWUFsEnRf002P6QN6lX");

type CreateSubscriptionReq = {
	customerId: string;
	paymentMethodId: string;
	priceId: string;
};

type CreateSubscriptionRes = {
	paymentMethodId: string;
	priceId: string;
	subscription: string;
};

type Invoice = {
	payment_intent: {
		status: string;
		client_secret: string;
	};
};
type ProcessPaymentReq = {
	subscription: { status: string; latest_invoice: Invoice };
	invoice: Invoice;
	priceId: string;
	paymentMethodId: string;
	isRetry: boolean;
};
export async function handlePaymentThatRequiresCustomerAction(
	stripe: Stripe,
	{
		subscription,
		invoice,
		priceId,
		paymentMethodId,
		isRetry,
	}: ProcessPaymentReq
) {
	if (subscription && subscription.status === "active") {
		// Subscription is active, no customer actions required.
		return { subscription, priceId, paymentMethodId };
	}

	// If it's a first payment attempt, the payment intent is on the subscription latest invoice.
	// If it's a retry, the payment intent will be on the invoice itself.
	let paymentIntent = invoice
		? invoice.payment_intent
		: subscription.latest_invoice.payment_intent;

	if (
		paymentIntent.status === "requires_action" ||
		(isRetry === true && paymentIntent.status === "requires_payment_method")
	) {
		try {
			const result = await stripe.confirmCardPayment(
				paymentIntent.client_secret,
				{
					payment_method: paymentMethodId,
				}
			);

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
		} catch (ex) {
			// Start code flow to handle updating the payment details.
			// Display error message in your UI.
			// The card was declined (i.e. insufficient funds, card has expired, etc).
			// displayError(error);
			throw ex;
		}
	} else {
	}
}

export async function createSubscription(
	stripe: Stripe,
	api: any,
	{ customerId, paymentMethodId, priceId }: CreateSubscriptionReq
) {
	try {
		const createSubscriptionResponse: CreateSubscriptionRes =
			await api.payment.stripeSubscriptionCreate({
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
	} catch (ex) {
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

const CheckoutForm = ({
	embedded,
	setNext,
}: React.PropsWithChildren<EmbeddableControl>) => {
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

	const onPaymentElementChanged = (e: StripePaymentElementChangeEvent) => {
		console.log(e);
	};

	return (
		// <Elements stripe={stripePromise} options={options}>
		<Form
			form={form}
			onFinish={() => actions.payments.pay({ stripe, elements })}
		>
			<Form.Item name="payment">
				<div style={{ minHeight: 142 }}>
					<PaymentElement onChange={onPaymentElementChanged} />
				</div>
				{/* <CardElement />
                </PaymentElement> */}
			</Form.Item>
			{/* <Form.Item>
				<IndeterminateProgressAction actionName="payments.pay" />
			</Form.Item> */}
			<Form.Item hidden={embedded}>
				<ProgressButton
					progressText="Processing payment..."
					type="primary"
					actionName="payments.pay"
					htmlType="submit"
					disabled={!stripe || !elements}
				>
					Submit
				</ProgressButton>
			</Form.Item>
		</Form>
		// </Elements>
	);
};

export const Product = ({
	embedded,
	setNext,
}: React.PropsWithChildren<EmbeddableControl>) => {
	const [flowState, setFlowState] = useState<{
		options: { clientSecret: string };
		intent: PaymentStripePaymentIntentCreateResponse;
	}>({ options: { clientSecret: "" }, intent: {} });

	const state = useAppState();
	const actions = useActions();
	const [price, setPrice] = useState<any>("io-domain-presale-standard");

	console.log(price);

	useEffect(() => {
		if (
			!state.indicators.isWorking &&
			!state.api.auth.user?.id &&
			state.auth.status === AUTH_FLOW_STATUS.AUTHENTICATED
		) {
			actions.flows.user.create.preregisterCreate({ noRouting: true });
		}
	}, [state.api.auth.user, state.auth.status, state.indicators.isWorking]);

	useEffect(() => {
		if (!state.api.auth.user?.id) return;

		(async () => {
			const newPaymentIntent =
				await state.api.client.payment.stripeIntentCreate({
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
		return (
			<div className="app-main-centered" style={{ minWidth: 150 }}>
				{/* <h2 className="header-2">...</h2> */}
				<IndeterminateProgress inProgress={true} />
			</div>
		);
	return (
		<div className="app-main-full-height-only-with-bottom-control">
			<Checkbox.Group
				value={price}
				onChange={(v) => setPrice(v[v.length - 1])}
				style={{ width: "100%" }}
			>
				<Row align="bottom" justify="space-between">
					<Col sm={2}>
						<Checkbox
							value="io-domain-presale-standard"
							className="dm-presale-form-checkbox"
						/>
					</Col>
					<Col>
						<p className="paragraph-2b">standard</p>
					</Col>
					<Col sm={2}>
						<Checkbox
							value="io-domain-presale-premium"
							className="dm-presale-form-checkbox"
						/>
					</Col>
					<Col>
						<p className="paragraph-2b">premium</p>
					</Col>
					<Col sm={2}>
						<Checkbox
							value="io-domain-presale-lifetime"
							className="dm-presale-form-checkbox"
						/>
					</Col>
					<Col>
						<p className="paragraph-2b">lifetime</p>
					</Col>
				</Row>
			</Checkbox.Group>
			<br />
			<br />
			{(paymentIntent as any)["amount"] && (
				<h2 className="header-2">
					Total: {(paymentIntent as any)["amount"] / 100}EUR
				</h2>
			)}
			<br />
			<div style={{ maxWidth: 600, minHeight: 380 }}>
				{options.clientSecret && (
					<Elements stripe={stripePromise} options={options}>
						<CheckoutForm embedded={embedded} setNext={setNext} />
					</Elements>
				)}
			</div>
		</div>
	);
};

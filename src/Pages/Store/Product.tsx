import { AUTH_FLOW_STATUS } from "../../overmind/auth/state";
import { Button, Col, Form, Input, Radio, Row } from "antd";
import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { Elements } from "@stripe/react-stripe-js";
import { EmbeddableControl } from "../../types";
import { IndeterminateProgress, IndeterminateProgressAction } from "../../Components/IndeterminateProgress";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentStripePaymentIntentCreateResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { ProgressButton } from "../../Components/ProgressButton";
import { Stripe, StripePaymentElementChangeEvent, loadStripe } from "@stripe/stripe-js";
import { config } from "../../config";
import { estimateUsernamePrice } from "../../utils/username";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${config.settings.stripe.publicKey}`);

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
  { subscription, invoice, priceId, paymentMethodId, isRetry }: ProcessPaymentReq,
) {
  if (subscription && subscription.status === "active") {
    // Subscription is active, no customer actions required.
    return { subscription, priceId, paymentMethodId };
  }

  // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
  // If it's a retry, the payment intent will be on the invoice itself.
  let paymentIntent = invoice ? invoice.payment_intent : subscription.latest_invoice.payment_intent;

  if (paymentIntent.status === "requires_action" || (isRetry === true && paymentIntent.status === "requires_payment_method")) {
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
  { customerId, paymentMethodId, priceId }: CreateSubscriptionReq,
) {
  try {
    const createSubscriptionResponse: CreateSubscriptionRes = await api.payment.stripeSubscriptionCreate({
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

const CheckoutForm = ({ embedded, setNext }: React.PropsWithChildren<EmbeddableControl>) => {
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
    <Form form={form} onFinish={() => actions.payments.pay({ stripe, elements })}>
      <div className="text-center">
        <Input
          onChange={(e) => actions.flows.user.create.updateForm({ couponCode: e.target.value })}
          placeholder="Enter a coupon code here"
        />
        <br />
        <br />
        <br />
      </div>
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
        <div className="flex-space-between">
          <ProgressButton
            progressText="Cancelling payment..."
            type="primary"
            actionName="routing.goBack"
            onClick={() => actions.routing.goBack()}
            htmlType="button"
            disabled={!stripe || !elements}
          >
            Cancel
          </ProgressButton>
          <ProgressButton
            progressText="Processing payment..."
            type="primary"
            actionName="payments.pay"
            htmlType="submit"
            disabled={!stripe || !elements}
          >
            Submit
          </ProgressButton>
        </div>
      </Form.Item>
    </Form>
    // </Elements>
  );
};

export const Product = ({ embedded, setNext }: React.PropsWithChildren<EmbeddableControl>) => {
  const [flowState, setFlowState] = useState<{
    options: { clientSecret: string };
    intent: PaymentStripePaymentIntentCreateResponse;
  }>({ options: { clientSecret: "" }, intent: {} });

  const state = useAppState();
  const actions = useActions();
  // const [price, setPrice] = useState<any>("io-domain-presale-standard");
  const requestedUsername = state.flows.user.create.form.username;
  const price = estimateUsernamePrice(requestedUsername);

  console.log(requestedUsername);

  useEffect(() => {
    if (!state.indicators.isWorking && !state.api.auth.user?.id && state.auth.status === AUTH_FLOW_STATUS.AUTHENTICATED) {
      actions.flows.user.create.preregisterCreate({ noRouting: true });
    }
  }, [state.api.auth.user, state.auth.status, state.indicators.isWorking]);

  useEffect(() => {
    if (!state.api.auth.user?.id) return;

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
    return (
      <div className="app-main-centered" style={{ minWidth: 150 }}>
        {/* <h2 className="header-2">...</h2> */}
        <IndeterminateProgress inProgress={true} />
      </div>
    );
  return (
    <div className="app-main-full-height-only-with-bottom-control">
      {/* <Checkbox.Group
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
			</Checkbox.Group> */}
      <br />
      {/* Estimated: domain price: ${price} */}
      <br />
      {(paymentIntent as any)["amount"] && (
        <h2 className="header-2">
          Total for premium domain <b>{requestedUsername}</b>: {(paymentIntent as any)["amount"] / 100}EUR
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

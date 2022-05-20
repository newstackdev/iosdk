const pay = async ({ state, actions, effects }, { stripe, elements }) => {
    if (!elements || !stripe) {
        return;
    }
    const el = elements.getElement("payment");
    if (!el) {
        return effects.ux.message.error("Stripe did not init correctly");
    }
    // return
    const loc = window.location;
    const confirmation = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: `${loc.protocol}//${loc.hostname}${state.routing.location}`,
        },
        redirect: "if_required"
    });
    if (confirmation.paymentIntent?.status === "succeeded") {
        effects.ux.notification.open({
            message: "Success! You have subscribed. Please fill in a few more details.",
        });
        await actions.api.auth.authorize();
        await actions.auth.fakeUserUpdate({
            subscriptionStatus: "subscribed",
        });
    }
    else
        effects.ux.notification.error({
            message: "Someting has gone wrong while paying. Please try again. The error reported by payment provider is: " +
                (confirmation.error?.message || ""),
        });
};
export default {
    actions: {
        pay
    }
};
//# sourceMappingURL=index.js.map
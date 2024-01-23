import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";

export default async function SiteSettingsDomains({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex gap-2">
        <p className="font-bold text-xl">Stripe Setup </p>
        <p className="font-bold text-xl text-red-500">(Compulsory)</p>
      </div>
      <p className="text-md">Stripe is a payment processing platform that allows businesses to accept payments from customers online.</p>
      <div className="flex gap-2">
         <p className="text-md">If you do not have a stripe account then please setup it up at  </p>
          <a href="https://stripe.com/" className="text-blue-800 px-2 py-1 bg-white rounded-xl">Click here to open Stripe Platform</a>
          <p className="text-md">Then enter relevant credentials below:-  </p>
      </div>
      <Form
        title="STRIPE_API_KEY"
        description="Enter your Stripe Api key."
        helpText="Stripe API keys are unique to each account and are used to authenticate API requests. They are the only way for the payment gateway to recognize that the API requests were made by the account."
        inputAttrs={{
          name: "stripeApiKey",
          type: "text",
          defaultValue: data?.stripeApiKey!,
          placeholder: "STRIPE_API_KEY",
          maxLength: 200,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="STRIPE_WEBHOOK_SECRET"
        description="Enter your Stripe Webhook Secret."
        helpText="Stripe webhook secrets are used to verify the authenticity of requests from Stripe. It is used to verify if the user payment is successful or not."
        inputAttrs={{
          name: "stripeWebhookSecret",
          type: "text",
          defaultValue: data?.stripeWebhookSecret!,
          placeholder: "STRIPE_WEBHOOK_SECRET",
          maxLength: 200,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}

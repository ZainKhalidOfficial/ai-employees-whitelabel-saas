import { ReactNode } from "react";
import Form from "@/components/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { editUser } from "@/lib/actions";
import { WhitelabelSubscriptionPlan } from "@/components/whitelabel-subscription-plan";
import prisma from "@/lib/prisma";
import { getUserToken } from "@/app/helpers/getUserToken";

export default async function WhitelabelPlanPage() {
  // const session = await getSession();

     const session = await getUserToken();
     
  if (!session) {
    redirect("/login");
  }

  const pathData = await prisma.whitelabelSubscriptionPlan.findUnique({
    where: {
        userId:"admin"
    }
});



  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-2">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          My Plan
        </h1>
        {/* <Form
          title="Name"
          description="Your name on this app."
          helpText="Please use 32 characters maximum."
        
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: session.user.name!,
            placeholder: "Brendon Urie",
            maxLength: 32,
          }}
          handleSubmit={editUser}
        /> */}
        {/* <Form
          title="Email"
          description="Your email on this app."
          helpText="Please enter a valid email."
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: session.user.email!,
            placeholder: "panic@thedis.co",
          }}
          handleSubmit={editUser}
        /> */}

       <WhitelabelSubscriptionPlan isPro={{isPro: false, tokens: 0}} disabled={false} planData={pathData}/>
        

      </div>
    </div>
  );
}

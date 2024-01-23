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
      
      <p className="font-bold text-xl">Design your Subscription Plan </p>
      <p className="text-md">There are 3 subscription packages in total, (Basic, Silver and Gold).</p>
      <>
      <p className="font-bold text-lg">1. Silver Plan</p>


      <Form
        title="Custom Employees"
        description="User must be able to create how many custom employees?"
        helpText="Custom employees are additional employees that users can create using prompted instructions."
        inputAttrs={{
          name: "silverCustomEmployees",
          type: "text",
          defaultValue: String(data?.silverCustomEmployees!),//data?.subdomain!
          placeholder: "Number of Custom Employees?",
          maxLength: 2,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Business Profiles"
        description="User must be able to create how many business profiles?"
        helpText="Business Profiles are text based business details to be shared with employees during chat."
        inputAttrs={{
          name: "silverBusinessProfiles",
          type: "text",
          defaultValue: String(data?.silverBusinessProfiles!),
          placeholder: "Number of business profiles",
          maxLength: 2,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />
        <Form
        title="Tokens"
        description="User must be able to use how many tokens?"
        helpText="Tokens are the resources limit that are consumed each time user sends a message."
        inputAttrs={{
          name: "silverTokens",
          type: "text",
          defaultValue: String(data?.silverTokens!),
          placeholder: "Number of tokens",
          maxLength: 6,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Price"
        description="How much to charge user for this package in USD?"
        helpText="Caution: This also includes 10% service charges fee & price can't be less than 60."
        inputAttrs={{
          name: "silverPackagePrice",
          type: "text",
          defaultValue: String(data?.silverPackagePrice!),
          placeholder: "USD",
          maxLength: 6,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />

      </>

      <>
      <p className="font-bold text-lg">2. Gold Plan </p>


      <Form
        title="Custom Employees"
        description="User must be able to create how many custom employees?"
        helpText="Custom employees are additional employees that users can create using prompted instructions."
        inputAttrs={{
          name: "goldCustomEmployees",
          type: "text",
          defaultValue: String(data?.goldCustomEmployees!),
          placeholder: "Number of Custom Employees?",
          maxLength: 2,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Business Profiles"
        description="User must be able to create how many business profiles?"
        helpText="Business Profiles are text based business details to be shared with employees during chat."
        inputAttrs={{
          name: "goldBusinessProfiles",
          type: "text",
          defaultValue: String(data?.goldBusinessProfiles!),
          placeholder: "Number of business profiles",
          maxLength: 2,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Tokens"
        description="User must be able to use how many tokens?"
        helpText="Tokens are the resources limit that are consumed each time user sends a message. "
        inputAttrs={{
          name: "goldTokens",
          type: "text",
          defaultValue: String(data?.goldTokens!),
          placeholder: "Number of tokens",
          maxLength: 6,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Price"
        description="How much to charge user for this package in USD?"
        helpText="Caution: This also includes 10% service charges fee & price can't be less than 80."
        inputAttrs={{
          name: "goldPackagePrice",
          type: "text",
          defaultValue: String(data?.goldPackagePrice!),
          placeholder: "USD",
          maxLength: 6,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />

      </>

      <>
      <p className="font-bold text-lg">3. Platinum Plan</p>


      <Form
        title="Custom Employees"
        description="User must be able to create how many custom employees?"
        helpText="Custom employees are additional employees that users can create using prompted instructions."
        inputAttrs={{
          name: "platinumCustomEmployees",
          type: "text",
          defaultValue: String(data?.platinumCustomEmployees!),
          placeholder: "Number of Custom Employees?",
          maxLength: 2,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Business Profiles"
        description="User must be able to create how many business profiles?"
        helpText="Business Profiles are text based business details to be shared with employees during chat."
        inputAttrs={{
          name: "platinumBusinessProfiles",
          type: "text",
          defaultValue: String(data?.platinumBusinessProfiles!),
          placeholder: "Number of business profiles",
          maxLength: 2,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Tokens"
        description="User must be able to use how many tokens?"
        helpText="Tokens are the resources limit that are consumed each time user sends a message."
        inputAttrs={{
          name: "platinumTokens",
          type: "text",
          defaultValue: String(data?.platinumTokens!),
          placeholder: "Number of tokens",
          maxLength: 6,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />
        <Form
        title="Price"
        description="How much to charge user for this package in USD?"
        helpText="Caution: This also includes 10% service charges fee & price can't be less than 100."
        inputAttrs={{
          name: "platinumPackagePrice",
          type: "number",
          defaultValue: String(data?.platinumPackagePrice!),
          placeholder: "USD",
          maxLength: 6,
          // pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />
      </>
      
    </div>
    
  );
}

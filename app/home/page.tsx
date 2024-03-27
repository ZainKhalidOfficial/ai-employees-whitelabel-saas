
// import AboutSectionOne from "@/components/home2/About/AboutSectionOne";
// import AboutSectionTwo from "@/components/home2/About/AboutSectionTwo";
// import Blog from "@/components/home2/Blog";
// import Brands from "@/components/home2/Brands";
// import ScrollUp from "@/components/home2/Common/ScrollUp";
// import Contact from "@/components/home2/Contact";
// import Features from "@/components/home2/Features";
import Hero from "@/components/home2/Hero";
// import Pricing from "@/components/home2/Pricing";
import Testimonials from "@/components/home2/Testimonials";
// import Video from "@/components/home2/Video";
// import { LandingContent } from "@/components/landing-content";
// import { SubscriptionPlan } from "@/components/subscription-plan";
import { WhitelabelSubscriptionPlan } from "@/components/whitelabel-subscription-plan";
import { WhitelabelFeaturePlan } from "@/components/feature-plan";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import WhitelabelFAQ from "@/components/whitelabel-faq";
import Link from "next/link";

//http://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login

export const metadata: Metadata = {
  title: "Whitelabel Vitexy",
  description: "Own Vitexy like it's yours",
  // other metadata
};

interface PlanData {
  id: string;
  userId: string;

  mStartupSitesAllowed: number;
  mStartupCustomEmployees: number;
  mStartupCustomDomains: string;
  mStartupPrice: number;
  
  yStartupSitesAllowed: number;
  yStartupCustomEmployees: number;
  yStartupCustomDomains: string;
  yStartupPrice: number;

  mMidsizeSitesAllowed: number;
  mMidsizeCustomEmployees: number;
  mMidsizeCustomDomains: string;
  mMidsizePrice: number;

  yMidsizeSitesAllowed: number;
  yMidsizeCustomEmployees: number;
  yMidsizeCustomDomains: string;
  yMidsizePrice: number;

  mEnterpriseSitesAllowed: number;
  mEnterpriseCustomEmployees: number;
  mEnterpriseCustomDomains: string;
  mEnterprisePrice: number;
  
  yEnterpriseSitesAllowed: number;
  yEnterpriseCustomEmployees: number;
  yEnterpriseCustomDomains: string;
  yEnterprisePrice: number;
}
export default async function Home() {

        const pathData = await prisma.whitelabelSubscriptionPlan.findUnique({
          where: {
            userId: "admin"
          }
        });

  return (
    <>
      {/* <ScrollUp /> */}
      <Hero />

      <div id="guide" className="flex justify-center mb-20 flex-grow">
        <div className="w-4/5 lg:w-3/5 grid grid-cols-1 lg:block lg:grid-cols-none">
        <p className="font-bold mb-24 text-5xl lg:text-7xl text-center text-white  "> <span className="text-[#7075F3]">Step-By-Step</span> Guide</p>
        <p className="text-white text-xl text-start md:my-4 ">With Vitexy, starting your AI company is extremely easy. We do the techy bits. All you do is:</p>         
        <p className="text-[#7075F3] text-2xl pl-6 font-bold text-start md:my-2 ">• Choose a Package</p>
        <p className="text-[#7075F3] text-2xl pl-6 font-bold text-start md:my-2 "> • Customize Your Brand</p>
        <p className="text-[#7075F3] text-2xl pl-6 font-bold text-start md:my-2 "> • Get a Domain</p>
        <p className="text-[#7075F3] text-2xl pl-6 font-bold text-start md:my-2 "> • Choose Payment Method</p>
        <p className="text-white text-xl text-start lg:text-start md:mt-8 ">and you're set. In just days, you'll be ready to sell a cutting-edge advanced AI software without the struggle or complexity. It's the future of AI, simplified for everyone.</p>         
     
        </div>
      </div>

      <div id="how" className="grid mb-20 gap-y-10 py-8 grid-cols-1 text-center ">
      <p className="font-semibold text-4xl lg:text-5xl text-center text-white  "> 
      Here's How <span className="text-[#7075F3]">Your AI Company</span> Works</p>
      <WhitelabelFeaturePlan />
        </div>

      {/* <Video /> */}
      {/* <Features /> */}
      {/* <Brands /> */}

      {/* <div id="features" className="grid grid-cols-1  text-center ">
      <p className="font-bold text-3xl md:text-4xl">More than just <span className="text-transparent bg-clip-text  bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 inline">AI Chatbots </span> 🤖</p>
      <p className="text-md md:text-lg m-4 ">Users can create personalized AI agents that can answer questions, have pre-knowledge of their businesses and more.</p>         
        </div>

      <AboutSectionOne />

      <div className="grid grid-cols-1 mt-10  text-center ">
      <p className="font-bold text-3xl md:text-4xl">Fully <span className="text-transparent bg-clip-text  bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 inline">White Label AI </span> SAAS 📋</p>
      <p className="text-md md:text-lg m-4 ">Rebrand the entire Vitexy AI platform as your own SaaS and sell directly to your clients.</p>         
        </div>

      <AboutSectionTwo /> */}

      {/* <div className="grid grid-cols-1  text-center ">
      <p className="font-bold text-3xl md:text-4xl">More than just <span className="text-transparent bg-clip-text  bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 inline">AI Chatbots </span> 🤖</p>
      <p className="text-md md:text-lg m-4 ">Users can create personalized AI agents that can answer questions, have pre-knowledge of their businesses and more.</p>         
        </div>

      <AboutSectionOne /> */}

      <div id="why" className="grid my-8 grid-cols-1  text-center ">
        <p className="font-semibold text-4xl lg:text-5xl text-center text-white  "> 
         Why Choose <span className="text-[#7075F3]">Vitexy?</span></p>
      </div>
      

      {/* <LandingContent />  */}
      <Testimonials /> 

  

      {/* <div id="pricing" className="grid grid-cols-1  text-center py-20 ">
            <p className="text-md md:text-lg"> a free trial</p>
            <p className="text-md md:text-lg">or</p>
            <p className="font-bold text-3xl md:text-4xl">Monthly Pricing</p>
        </div> */}

        <div id="price" className="grid mb-8 py-8 grid-cols-1 text-center ">
      <p className="font-semibold text-4xl lg:text-5xl text-center text-white  "> 
         <span className="text-[#7075F3]">Sign-up today</span></p>

         <p className="font-normal my-4 text-sm lg:text-md text-center text-white  "> 
         & subscribe to one of our following plans</p>
        </div>
        
        
        <WhitelabelSubscriptionPlan isPro={{isPro: false, tokens: 0}} disabled={true} planData={pathData}/>

        <div className="flex my-8 flex-col items-center lg:gap-10 ">
        <p className="font-semibold text-xl lg:text-3xl text-center text-white  "> 
        Frequently Asked Questions</p>
        <WhitelabelFAQ />
      </div>

      
      <div className="flex my-8 items-center justify-center lg:h-screen flex-grow">
        <div className="w-2/3 grid grid-cols-1 lg:block lg:grid-cols-none">
        <p className="font-bold mb-36 text-7xl text-center text-white  "> <span className="text-[#7075F3]">Unlock</span> The Future of AI</p>
        <p className="text-white text-2xl text-center lg:text-start my-8 ">We are rapidly entering an AI-driven world, every company needs a guide. With your Advanced AI Company, you're that bridge. We handle the tech, you bring businesses into the AI age. Dive into a life of pure profits and freedom, and let businesses thrive with your help</p>         
        
        <Link className="p-3 text-2xl md:text-2xl font-normal  text-center text-black bg-[#7075F3] hover:bg-white rounded-full" 
              href={`http://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`}>Get Started</Link>
        </div>
        
      </div>

      {/* <Contact /> */}
    </>
  );
}


//1

// import { Metadata } from "next";
// import Hero from "@/components/home/Hero";
// import Brands from "@/components/home/Brands";
// import Feature from "@/components/home/Features";
// import About from "@/components/home/About";
// import FeaturesTab from "@/components/home/FeaturesTab";
// import FunFact from "@/components/home/FunFact";
// import Integration from "@/components/home/Integration";
// import CTA from "@/components/home/CTA";
// import FAQ from "@/components/home/FAQ";
// import Pricing from "@/components/home/Pricing";
// import Contact from "@/components/home/Contact";
// import Blog from "@/components/home/Blog";
// import Testimonial from "@/components/home/Testimonial";

// import Header from "@/components/home/Header";
// import Lines from "@/components/home/Lines";

// export const metadata: Metadata = {
//   title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",
//   description: "This is Home for Solid Pro",
//   // other metadata
// };

// export default function Home() {
//   return (
//     <main>
      
//       <Lines />
//       <Header />
//       <Hero />
//       <Brands />
//       <Feature />
//       <About />
//       <FeaturesTab />
//       <FunFact />
//       <Integration />
//       <CTA />
//       <FAQ />
//       <Testimonial />
//       <Pricing />
//       <Contact />
//       <Blog />
//     </main>
//   );
// }

//org

// import { LandingNavbar } from "@/components/landing-navbar";
// import { LandingHero } from "@/components/landing-hero";
// import { LandingContent } from "@/components/landing-content";
// import { SubscriptionPlan } from "@/components/subscription-plan";
// import { FooterContent } from "@/components/landing-footer";
// import FAQSection from "@/components/landing-faq";


// const LandingPage = () => {

//     return ( 
//        <div className="h-full">
//         <div className="mx-auto max-w-screen-xl">

//         <LandingNavbar />
//         <LandingHero />
//         <LandingContent /> 
//         <div className="grid grid-cols-1  text-center py-20 ">
//             <p className="text-lg ">Sign-up today with a free trial</p>
//             <p className="text-lg ">or</p>
//             <p className="font-bold text-5xl ">Monthly Pricing</p>
//         </div>
//         <SubscriptionPlan isPro={false} disabled={true} />

//         <FAQSection />
//         </div>
//         <FooterContent />
//        </div>
//     );
// }
 
// export default LandingPage;


// import { InlineSnippet } from "@/components/form/domain-configuration";
// import Image from "next/image";

// export default function HomePage() {
//   return (
//     <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
//       <Image
//         width={512}
//         height={512}
//         src="/logo.png"
//         alt="Platforms on Vercel"
//         className="w-48"
//       />
//       <h1 className="text-white">
//         Edit this page on{" "}
//         <InlineSnippet className="ml-2 bg-blue-900 text-blue-100">
//           app/home/page.tsx
//         </InlineSnippet>
//       </h1>
//     </div>
//   );
// }

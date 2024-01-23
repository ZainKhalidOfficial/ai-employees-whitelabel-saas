
import AboutSectionOne from "@/components/home2/About/AboutSectionOne";
import AboutSectionTwo from "@/components/home2/About/AboutSectionTwo";
import Blog from "@/components/home2/Blog";
import Brands from "@/components/home2/Brands";
import ScrollUp from "@/components/home2/Common/ScrollUp";
import Contact from "@/components/home2/Contact";
import Features from "@/components/home2/Features";
import Hero from "@/components/home2/Hero";
import Pricing from "@/components/home2/Pricing";
import Testimonials from "@/components/home2/Testimonials";
import Video from "@/components/home2/Video";
import { LandingContent } from "@/components/landing-content";
import { SubscriptionPlan } from "@/components/subscription-plan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitelabel Genius",
  description: "Own Genius like it's yours",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      {/* <Video /> */}
      {/* <Features /> */}
      {/* <Brands /> */}

      <div className="grid grid-cols-1  text-center ">
      <p className="font-bold text-5xl">More than just <p className="text-transparent bg-clip-text  bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 inline">AI Chatbots </p> 🤖</p>
      <p className="text-lg mt-4 ">Users can create personalized AI agents that can answer questions, have pre-knowledge of their businesses and more.</p>         
        </div>

      <AboutSectionOne />

      <div className="grid grid-cols-1 mt-10  text-center ">
      <p className="font-bold text-5xl">Fully <p className="text-transparent bg-clip-text  bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 inline">White Label AI </p> SAAS 📋</p>
      <p className="text-lg mt-4 ">Rebrand the entire Genius AI platform as your own SaaS and sell directly to your clients.</p>         
        </div>

      <AboutSectionTwo />

      <div className="grid grid-cols-1  text-center ">
      <p className="font-bold text-5xl">More than just <p className="text-transparent bg-clip-text  bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 inline">AI Chatbots </p> 🤖</p>
      <p className="text-lg mt-4 ">Users can create personalized AI agents that can answer questions, have pre-knowledge of their businesses and more.</p>         
        </div>

      <AboutSectionOne />

      <div className="grid grid-cols-1  text-center ">
      <p className="font-bold text-5xl ">Main Features</p>
      <p className="text-lg mt-4 ">Genius packs a wide varienty of features among which following are our top offerings.</p>         
        </div>
      <LandingContent /> 
      <Testimonials />
      {/* <Pricing /> */}

      <div className="grid grid-cols-1  text-center py-20 ">
            <p className="text-lg ">Sign-up today with a free trial</p>
            <p className="text-lg ">or</p>
            <p className="font-bold text-5xl ">Monthly Pricing</p>
        </div>
        
      <SubscriptionPlan  />
      {/* <Blog /> */}
      <Contact />
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

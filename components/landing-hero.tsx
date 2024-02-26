"use client";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {

    // const { isSignedIn } = useAuth();

    const isSignedIn = false;
    return (
        <div className="text-white font-bold py-36 text-center space-y-5"> 
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best AI Platform To</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Use AI Experts.",
                                "Use Custom Experts.",
                                "Use Smart Tools.",
                                "Feed Your Business Profile.",
                                "Whitelabel."
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Enhanced AI workforce to boost your business 10x.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/login"}>
                    <Button variant={"premium"} className="md:text-lg p-4 md:p-6 hover:border hover:border-white rounded-full font-semibold">
                        Start Using For Free
                    </Button>
                </Link>
            </div>

            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required.
            </div>

        </div>
    )
}
"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
           await axios.post('/api/authtenant/verifyemail', {token});
           setVerified(true);

        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
            toast.error("Email verification failed! ", error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];

        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token])


    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
        <div className="p-10 rounded-xl text-center bg-slate-300 space-y-4">

            <h1 className="text-4xl">Email Verification</h1>
            {/* <h2 className="p-2 bg-blue-400 text-sm flex-wrap rounded-lg">{token ? `${token}` : "no token"}</h2> */}
            {verified && (
                <div className="gap-2 text-center">
                    <h2 className="text-2xl p-3 bg-green-500 rounded-lg">Email Verified</h2>
                    <Link href={"/login"} className="text-blue-500">Go to Login</Link>    
                </div>
            )}

            {error && (
                <div className="">
                    <h2 className="text-2xl p-3 bg-red-600 rounded-lg">Error</h2>
                    <Link href={"/login"} className="text-blue-500 p-5">Go to Login</Link>    
                </div>
            )}
        </div>
        </div>
    )
}
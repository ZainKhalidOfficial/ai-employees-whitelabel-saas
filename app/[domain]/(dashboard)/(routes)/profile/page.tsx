"use client"

import axios from "axios"
import Link from "next/link"
import {useRouter} from "next/navigation"
import { useState } from "react";

export default function UserProfile() {

    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {

        try {
            
            await axios.get("/api/authusers/logout");

            router.push("/login");

        } catch (error: any) {
            
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/authusers/me');
        console.log(res.data);
        setData(res.data.user.id)
        
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page </p>
            <h1>{data=== 'nothing' ? "Nothing" : <Link className="m-4 text-green-500" href={`/profile/${data}`}>{data}</Link>}</h1>
            <button onClick={logout} className="p-2 rounded ml-2 mt-4 bg-blue-500 text-black">
                Logout
            </button>
            <button onClick={getUserDetails} className="p-2 rounded ml-2 mt-4 bg-green-500 text-black">
                Get User Details
            </button>
        </div>
    )
}
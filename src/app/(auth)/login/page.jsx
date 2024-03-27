import LoginForm from "@/components/LoginComponent";
import React from "react";

export default function Login() {
    return(
        <div className="flex w-full h-screen">
            <div className="w-2/6 h-full">
                <img className="h-full w-full object-cover" src="/assets/image1.png" alt = "Auth preview image" />
            </div>

            <div className="w-4/6 flex justify-center">
                <LoginForm />
            </div>
        </div>
    )
}


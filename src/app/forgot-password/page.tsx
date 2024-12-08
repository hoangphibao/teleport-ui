"use client";

import { FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
    const [error, setError] = useState();
    const router = useRouter();
    const { data: session } = useSession();

    const labelStyles = "w-full text-sm";

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/forgot-password`, {
                email: formData.get("email"),
                name: formData.get("name"),
            });
            if (res.status === 200) { 
                alert("Email sent successfully")
            }
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            }
        }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="p-6 xs:p-10	w-full max-w-[350px] flex flex-col justify-between items-center gap-2.5	
        border border-solid border-[#242424] pb-15 rounded"
            >
                {error && <div className="">{error}</div>}
                <h1 className="mb-5 w-full text-2xl	font-bold">Forgot Password</h1>

                <label className={labelStyles}>User Name:</label>
                <input
                    type="text"
                    placeholder="Fullname"
                    className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded  text-[13px]"
                    name="name"
                />

                <label className={labelStyles}>Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-8 border border-solid border-[#242424] py-1 px-2.5 rounded  text-[13px]"
                    name="email"
                />
                <button className="w-full  border border-solid border-[#242424] py-1.5 mt-2.5 rounded
        transition duration-150 ease text-[13px]">
                    Submit
                </button>
            </form>
        </section>
    );
}

export default ForgotPassword;

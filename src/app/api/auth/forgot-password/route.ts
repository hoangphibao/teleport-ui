import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
const TELEPORT_API_URL : any = process.env.TELEPORT_API_URL;

export async function POST(request: Request) {

    await connectDB();

    const { name, email } = await request.json();

    const userName = await User.findOne({ name });
    const userEmail = await User.findOne({ email });

    if (userName == null && userEmail == null) {
        return NextResponse.json(
            { message: "Email not exists" },
            { status: 409 }
        );
    } else {
        const result = await fetch(TELEPORT_API_URL, {
            method: "POST", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Inform the server about the data format
            },
            body: JSON.stringify({
                "base_command": "tctl",
                "arguments": [
                    "users",
                    "reset",
                    name,
                    `--email=${email}`
                ]
            }), // Convert the data to JSON format
        })

        console.log(result, 1111);
        return NextResponse.json(
            {message: "Success"},
            { status: 200 });
    }
};
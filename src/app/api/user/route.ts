import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
const TELEPORT_API_URL: any = process.env.TELEPORT_API_URL;

export async function GET(request: Request) {
    try {
        await connectDB();
        const users = await User.find();
        return NextResponse.json(
            {
                data: users
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        } else {
            console.error("Error during signup:", error);
            return NextResponse.error();
        }
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();

        const { userId } = await request.json();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        await fetch(TELEPORT_API_URL, {
            method: "POST", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Inform the server about the data format
            },
            body: JSON.stringify({
                "base_command": "tctl",
                "arguments": [
                    "users",
                    "rm",
                    user.name,
                    `--email=`
                ]
            }), // Convert the data to JSON format
        })

        await User.findByIdAndDelete(userId);

        return NextResponse.json(
            { message: "User deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during user/cart item deletion:", error);
        return NextResponse.error();
    }
}
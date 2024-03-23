import Image from "next/image";
import { Inter } from "next/font/google";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Instructions() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`}
        >

            <div className="flex w-full px-20 flex-col gap-6 items-center justify-center">
                <h1 className="text-2xl font-semibold">Welcome to the Bible Quiz!</h1>
                <h1 className="text-2xl">Please Login Here!</h1>
                <Card className="flex flex-col w-1/3 justify-center items-center gap-6 text-center bg-white p-4 md:p-8 rounded-lg shadow-xl">
                    <h1 className="text-2xl font-semibold">LOGIN</h1>
                    <Input placeholder="Name" />
                    <Input placeholder="Player ID" />
                    <Button className="next-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8">Login</Button>
                </Card>
            </div>

        </main>
    );
}

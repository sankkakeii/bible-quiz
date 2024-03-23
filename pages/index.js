import { Inter } from "next/font/google";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`} style={{backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>

      <div className="flex flex-col gap-6 items-center justify-center px-4 sm:px-8 md:px-20 w-full max-w-screen-lg">
        <h1 className="text-2xl font-semibold text-teal-600 text-center">Welcome to the Bible Quiz!</h1>
        <Card className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 justify-center items-center gap-6 border-none text-center bg-white rounded-lg shadow-xl">

          <div className={`w-full h-32 rounded-t-lg ${inter.className}`} style={{backgroundImage: 'url(/images/repeating-chevrons.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
          </div>

          <div className="p-4 md:p-8 w-full flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">LOGIN</h1>
            <Input placeholder="Name" className="w-full" />
            <Input placeholder="Player ID" className="w-full" />
            <Button className="next-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8">Login</Button>
          </div>
        </Card>
      </div>

    </main>
  );
}

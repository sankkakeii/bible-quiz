import { Inter } from "next/font/google";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] });

export default function Instructions() {
    const router = new useRouter();



    // Function to handle button(s) click
    const handleQuizClicked = () => {
        router.push('/quiz/bible-quiz')
    }

    const handleSpellingClicked = () => {
        router.push('/quiz/spelling-bee')
    }




    return (
        <main className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`} style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

            <div className="flex flex-col gap-6 items-center justify-center px-4 sm:px-8 md:px-20 w-full max-w-screen-lg">
                <Card className="flex flex-col p-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 justify-center items-center gap-6 border-none text-center bg-white rounded-lg shadow-xl">
                    <h1 className="text-2xl font-semibold text-teal-700 text-center">INSTRUCTIONS</h1>

                    <div>
                        <h1 className="text-2xl font-semibold text-blue-700 text-center">BIBLE QUIZ</h1>
                        <h1 className="text-xl font-semibold text-teal-400 text-center">You are to answer the following questions as fast and correctly as you can. You have 20 minutes for the quiz section.</h1>
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-blue-700 text-center">SPELLING BEE</h1>
                        <h1 className="text-xl font-semibold text-teal-400 text-center">You are to listen to the audio and spell out the words as fast as you can. You have 20 minutes for the spelling bee section.</h1>
                    </div>

                    <div className="p-4 w-full flex flex-col gap-2">
                        <Button onClick={handleQuizClicked} className="next-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8">Begin Quiz</Button>
                        <Button onClick={handleSpellingClicked} className="next-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8">Begin Spelling Bee</Button>
                    </div>
                </Card>
            </div>

        </main>
    );
}

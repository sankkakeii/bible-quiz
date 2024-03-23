import React from 'react'
import Image from 'next/image';
import { Button } from './ui/button';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ResultsComponent({ score, correctAnswers, totalQuestions, onPlayAgain, onViewLeaderboard }) {

    return (
        <main className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`} style={{backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className="flex flex-col justify-center items-center w-1/2 p-3 rounded-lg shadow-lg text-center">
                <div className="flex flex-col items-center justify-center my-6 h-96 w-fit">
                    <h1 className="text-3xl sm:text-5xl font-bold text-teal-600 my-3">Congratulations!</h1>
                    <Image src="/images/trophy.svg" alt="congrats" width={180} height={180} />
                    <Button className="next-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8" onClick={''}>FINISH</Button>
                </div>
            </div>
        </main>
    );
}


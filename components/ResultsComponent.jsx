import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Inter } from "next/font/google";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function ResultsComponent({ score, correctAnswers, totalQuestions, questionType }) {
    const router = useRouter();

    // Message based on the question type
    let message = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly!`;
    let buttonText = 'FINISH';
    let buttonAction = () => router.push('/');

    if (questionType === 'multichoice') {
        buttonText = 'FINISH';
        buttonAction = () => router.push('/');
    }

    return (
        <main className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`} style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex flex-col justify-center items-center w-1/2 p-3 rounded-lg shadow-lg text-center">
                <div className="flex flex-col items-center justify-center my-6 h-96 w-fit">
                    <h1 className="text-3xl sm:text-5xl font-bold text-teal-600 my-3">Congratulations!</h1>
                    <Image src="/images/trophy.svg" alt="congrats" width={180} height={180} />
                    <p className="text-3xl text-white mt-4">{message}</p>
                    <Button className="next-button bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-8" onClick={buttonAction}>{buttonText}</Button>
                </div>
            </div>
        </main>
    );
}

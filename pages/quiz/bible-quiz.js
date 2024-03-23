import React, { useEffect, useState } from 'react';
import ResultsComponent from '@/components/ResultsComponent';
import { Button } from '@/components/ui/button';
import bibleQuestions from '@/lib/demo-questions';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function BibleQuiz() {
    const [showResultPage, setShowResultPage] = useState(false);
    const [timer, setTimer] = useState(1200); // 20 minutes
    // const [timer, setTimer] = useState(5); // 20 minutes
    const [questionsPool, setQuestionsPool] = useState(bibleQuestions);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);

    useEffect(() => {
        if (!showResultPage && randomizedQuestions.length === 0) {
            const randomIndexes = [];
            while (randomIndexes.length < 10) {
                const randomIndex = Math.floor(Math.random() * questionsPool.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            const selectedQuestions = randomIndexes.map(index => questionsPool[index]);
            setRandomizedQuestions(selectedQuestions);
        }
    }, [showResultPage, questionsPool, randomizedQuestions]);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000); // Decrease timer by 1 second every second

        // Clear the interval when the component unmounts or when the timer reaches 0
        return () => clearInterval(countdown);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setShowResultPage(true); // Show result page when timer reaches 0
        }
    }, [timer]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(randomizedQuestions.length).fill(null));

    const handleNextQuestion = () => {
        if (currentQuestionIndex < randomizedQuestions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleAnswerSelect = (option) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = option;

        const updatedQuestions = [...randomizedQuestions];
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            selectedOption: option
        };

        setUserAnswers(updatedUserAnswers);
        setRandomizedQuestions(updatedQuestions);
    };

    const handleSubmitQuestion = () => {
        // Logic for handling question submission
    };

    if (showResultPage) {
        return <ResultsComponent />;
    }

    const currentQuestion = randomizedQuestions[currentQuestionIndex];

    // Convert timer to minutes and seconds
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const formattedTimer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return (
        <main className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`} style={{backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className="flex justify-center gap-6 items-center w-full px-10">
                <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 justify-center items-center text-center bg-white rounded-lg shadow-xl">

                    <div className="header-container flex gap-5 w-full rounded-t-lg">
                        <div className={`timer w-full h-32 rounded-t-lg ${inter.className}`} style={{backgroundImage: 'url(/images/repeating-chevrons.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                            <div className="w-full flex items-center justify-center">
                                <div className="text-4xl mt-10 text-white font-bold">{formattedTimer}</div>
                            </div>
                        </div>
                    </div>
                    <div className="quiz-container w-full p-4 md:p-8">
                        {currentQuestion && (
                            <>
                                <h1 className="quiz-text text-lg md:text-3xl font-semibold py-6 text-teal-600">{currentQuestion.question}</h1>
                                <div className="quiz-options flex flex-col space-y-4 space-x-0">
                                    {currentQuestion.options.map((option, index) => (
                                        <label
                                            key={index}
                                            className={`font-bold flex items-center space-x-2 md:space-x-4 border-2 border-green-400 p-2 md:p-2 rounded-lg ${userAnswers[currentQuestionIndex] === option ? 'text-white border-green-400 bg-orange-400' : 'text-gray-500'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="quiz-option"
                                                checked={userAnswers[currentQuestionIndex] === option}
                                                onChange={() => handleAnswerSelect(option)}
                                                className="hidden"
                                            />
                                            <span className="text-xs md:text-base">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}
                        <div className="flex gap-6 justify-center items-center">
                            <Button className="next-button bg-gray-500 text-white py-4 md:py-4 px-6 md:px-12 rounded-md mt-4" onClick={handlePreviousQuestion}>
                                Previous
                            </Button>
                            <Button className="next-button bg-orange-400 text-white py-4 md:py-4 px-6 md:px-12 rounded-md mt-4" onClick={handleNextQuestion}>
                                Next
                            </Button>
                        </div>
                        <Button className="next-button bg-green-500 text-white py-4 md:py-4 px-6 md:px-12 rounded-md mt-4" onClick={handleSubmitQuestion}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

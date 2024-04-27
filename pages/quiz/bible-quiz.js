import React, { useEffect, useState } from 'react';
import ResultsComponent from '@/components/ResultsComponent';
import { Button } from '@/components/ui/button';
import { Inter } from "next/font/google";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function BibleQuiz() {
    const [showResultPage, setShowResultPage] = useState(false);
    const [timer, setTimer] = useState(1200); // 20 minutes
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]); // Assuming 10 questions
    const [token, setToken] = useState('');
    const router = useRouter();

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

    const fetchQuestions = async () => {
        try {
            // Fetch question type and category from local storage
            const questionType = 'multichoice';
            const category = localStorage.getItem('category');

            // Check if question type and category exist
            if (!questionType || !category) {
                throw new Error('Question type or category not found in local storage');
            }

            // Fetch questions from the API endpoint
            const response = await fetch('https://sub-engine.fintecgrate.com/api/jgc/questions/retrieve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in the headers
                },
                body: JSON.stringify({
                    question_type: questionType,
                    category: category
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }

            const data = await response.json();
            console.log(data.data.questions);
            setRandomizedQuestions(data.data.questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Handle error
        }
    };


    useEffect(() => {
        // Fetch token from local storage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        // Fetch questions from the API endpoint
        fetchQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

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

    const handleSubmitQuestion = async () => {
        try {
            let score = 0;
            const answers = randomizedQuestions.map(question => {
                const isCorrect = question.selectedOption === question.correct_answer;
                if (isCorrect) {
                    score++;
                }
                return {
                    question: question.question,
                    options: JSON.parse(question.options),
                    correct_answer: question.correct_answer,
                    user_answer: question.selectedOption,
                    is_correct: isCorrect,
                };
            });

            const submissionData = {
                category: localStorage.getItem('category'), // Assuming category is stored in local storage
                question_type: 'multichoice', // Assuming it's always multichoice
                score: score,
                answers: answers
            };

            console.log(submissionData);

            const response = await fetch('https://sub-engine.fintecgrate.com/api/jgc/questions/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in the headers
                },
                body: JSON.stringify(submissionData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit answers');
            }

            // Handle success, e.g., navigate to results page
            setShowResultPage(true);
        } catch (error) {
            console.error('Error submitting answers:', error);
            // Handle error
        }
    };


    if (showResultPage) {
        // Calculate correct answers count
        const correctAnswersCount = randomizedQuestions.filter(question => question.selectedOption === question.correct_answer).length;
        // Pass props to ResultsComponent
        return <ResultsComponent score={correctAnswersCount} correctAnswers={correctAnswersCount} totalQuestions={randomizedQuestions.length} questionType="multichoice" />;
    }

    const currentQuestion = randomizedQuestions[currentQuestionIndex];

    // Convert timer to minutes and seconds
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const formattedTimer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Check if currentQuestion exists before rendering
    if (!currentQuestion) {
        return null; // Or render a loading indicator
    }

    return (
        <main className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`} style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex justify-center gap-6 items-center w-full px-10">
                <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 justify-center items-center text-center bg-white rounded-lg shadow-xl">
                    <div className="header-container flex gap-5 w-full rounded-t-lg">
                        <div className={`timer w-full h-32 rounded-t-lg ${inter.className}`} style={{ backgroundImage: 'url(/images/repeating-chevrons.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                            <div className="w-full flex items-center justify-center">
                                <div className="text-4xl mt-10 text-white font-bold">{formattedTimer}</div>
                            </div>
                        </div>
                    </div>
                    <div className="quiz-container w-full p-4 md:p-8">
                        <>
                            <h1 className="quiz-text text-lg md:text-3xl font-semibold py-6 text-teal-600">{currentQuestion.question}</h1>
                            <div className="quiz-options flex flex-col space-y-4 space-x-0">
                                {JSON.parse(currentQuestion.options).map((option, index) => (
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

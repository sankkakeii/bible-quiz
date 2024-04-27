import React, { useEffect, useState, useRef } from 'react';
import ResultsComponent from '@/components/ResultsComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';

export default function SpellingBeeQuiz() {
    const [showResultPage, setShowResultPage] = useState(false);
    const [timer, setTimer] = useState(1200); // 20 minutes
    const [fetchedQuestions, setFetchedQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(10).fill(''));
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [correctAnswersObject, setCorrectAnswersObject] = useState({
        "category": "teens",
        "question_type": "audio",
        "answers": []
    });
    const [token, setToken] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
    const audioRef = useRef(null); // Reference to the audio element
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

    useEffect(() => {
        // Fetch token from local storage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        // Fetch questions from the API endpoint
        fetchQuestions();
    }, [token]);

    useEffect(() => {
        if (fetchedQuestions.length > 0) {
            // Load the current question audio when questions are fetched
            loadCurrentQuestionAudio();
        }
    }, [fetchedQuestions]);

    const fetchQuestions = async () => {
        try {
            const questionType = 'audio';
            const category = 'teens';

            const response = await fetch('https://sub-engine.fintecgrate.com/api/jgc/questions/retrieve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
            setFetchedQuestions(data.data.questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Handle error
        }
    };

    const loadCurrentQuestionAudio = (index = currentQuestionIndex) => {
        const currentQuestion = fetchedQuestions[index];
        if (currentQuestion && audioRef.current) {
            audioRef.current.src = currentQuestion.question;
            audioRef.current.load();
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => {
            if (prevIndex < fetchedQuestions.length - 1) {
                const currentQuestion = fetchedQuestions[prevIndex];
                const userAnswer = correctAnswer;
                const isCorrect = currentQuestion.correct_answer.toLowerCase() === userAnswer.toLowerCase();

                currentQuestion.userAnswer = correctAnswer;
                currentQuestion.isCorrect = isCorrect;

                const isQuestionAlreadyAnswered = correctAnswersObject.answers.some(answer => answer.id === currentQuestion.id);

                if (!isQuestionAlreadyAnswered) {
                    setCorrectAnswersObject(prevObject => ({ ...prevObject, answers: [...prevObject.answers, currentQuestion] }));
                }

                const newIndex = prevIndex + 1;
                loadCurrentQuestionAudio(newIndex);
                return newIndex;
            } else {
                const userAnswer = correctAnswer;
                const isCorrect = currentQuestion.correct_answer.toLowerCase() === userAnswer.toLowerCase();

                currentQuestion.userAnswer = correctAnswer;
                currentQuestion.isCorrect = isCorrect;

                const isQuestionAlreadyAnswered = correctAnswersObject.answers.some(answer => answer.id === currentQuestion.id);

                if (!isQuestionAlreadyAnswered) {
                    setCorrectAnswersObject(prevObject => ({ ...prevObject, answers: [...prevObject.answers, currentQuestion] }));
                }

                console.log("You have reached the end of the quiz.");
                return prevIndex;
            }
        });
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => {
                const newIndex = prevIndex - 1;
                loadCurrentQuestionAudio(newIndex);
                return newIndex;
            });
        }
    };

    const handleAnswerChange = event => {
        const { value } = event.target;
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = value.toLowerCase();
        setUserAnswers(updatedUserAnswers);
        setCorrectAnswer(value.toLowerCase());
    };

    const handleSubmitQuestion = () => {
        const userScore = correctAnswersObject.answers.reduce((score, answer) => {
            if (answer.isCorrect) {
                return score + 1;
            } else {
                return score;
            }
        }, 0);

        setCorrectAnswers(userScore);
        setShowResultPage(true);
    };

    if (showResultPage) {
        return <ResultsComponent score={correctAnswers} correctAnswers={correctAnswers} totalQuestions={fetchedQuestions.length} questionType="audio" />;
    }

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const formattedTimer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (!fetchedQuestions.length) {
        return null;
    }

    const currentQuestion = fetchedQuestions[currentQuestionIndex];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center pt-24" style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="flex justify-center gap-6 items-center w-full px-10">
                <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 justify-center items-center text-center bg-white rounded-lg shadow-xl">
                    <div className="header-container flex gap-5 w-full rounded-t-lg">
                        <div className="timer w-full h-32 rounded-t-lg" style={{ backgroundImage: 'url(/images/repeating-chevrons.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                            <div className="w-full flex items-center justify-center">
                                <div className="text-4xl mt-10 text-white font-bold">{formattedTimer}</div>
                            </div>
                        </div>
                    </div>
                    <div className="quiz-container w-full p-4 md:p-8">
                        <>
                            <div className="w-full flex flex-col gap-6 items-center justify-center">
                                <h1 className="quiz-text text-lg md:text-3xl font-semibold py-6 text-teal-600">Listen and type what you hear, take your time</h1>
                                <audio ref={audioRef} controls>
                                    <source src={currentQuestion.question} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                                <Input
                                    className="border-2 w-1/2 border-gray-400 p-2 rounded-lg outline-none focus:border-green-500"
                                    id="areaZone"
                                    placeholder="What do you hear?"
                                    value={userAnswers[currentQuestionIndex]}
                                    onChange={handleAnswerChange}
                                />
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


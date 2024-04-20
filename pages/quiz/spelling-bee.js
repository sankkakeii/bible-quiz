import React, { useEffect, useState } from 'react';
import ResultsComponent from '@/components/ResultsComponent';
import { Button } from '@/components/ui/button';
import bibleQuestions from '@/lib/demo-questions_spelling';
import { Inter } from "next/font/google";
import { Input } from '@/components/ui/input';

const inter = Inter({ subsets: ["latin"] });

export default function BibleQuiz() {
    const [showResultPage, setShowResultPage] = useState(false);
    const [timer, setTimer] = useState(1200); // 20 minutes
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
                            <div className="w-full flex flex-col gap-6 items-center justify-center">
                                <h1 className="quiz-text text-lg md:text-3xl font-semibold py-6 text-teal-600">Listen and type what you hear</h1>
                                <audio controls>
                                    <source src={currentQuestion.audioSrc} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>

                                {/* <Input className="border-2 w-1/2 border-gray-400 p-2 rounded-lg outline-none focus:border-green-500" id="areaZone" placeholder="What do you hear?" /> */}
                                <Input className="border-2 w-1/2 border-gray-400 p-2 rounded-lg outline-none focus:border-green-500" id="areaZone" placeholder="What do you hear?" />
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















// import React, { useEffect, useState } from 'react';
// import ResultsComponent from '@/components/ResultsComponent';
// import { Button } from '@/components/ui/button';
// import { Inter } from "next/font/google";
// import { Input } from '@/components/ui/input';
// import { useRouter } from 'next/router';

// const inter = Inter({ subsets: ["latin"] });

// export default function BibleQuiz() {
//     const [showResultPage, setShowResultPage] = useState(false);
//     const [timer, setTimer] = useState(1200); // 20 minutes
//     const [questionsPool, setQuestionsPool] = useState(bibleQuestions);
//     const [randomizedQuestions, setRandomizedQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [userAnswers, setUserAnswers] = useState(Array(10).fill(null)); // Assuming 10 questions
//     const [token, setToken] = useState('');
//     const router = useRouter();

//     useEffect(() => {
//         const countdown = setInterval(() => {
//             setTimer(prevTimer => prevTimer - 1);
//         }, 1000); // Decrease timer by 1 second every second

//         // Clear the interval when the component unmounts or when the timer reaches 0
//         return () => clearInterval(countdown);
//     }, []);

//     useEffect(() => {
//         if (timer === 0) {
//             setShowResultPage(true); // Show result page when timer reaches 0
//         }
//     }, [timer]);

//     useEffect(() => {
//         // Fetch token from local storage
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//             setToken(storedToken);
//         }

//         // Fetch questions from the API endpoint
//         fetchQuestions();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [token]);

//     const fetchQuestions = async () => {
//         try {
//             // Fetch question type and category from local storage
//             const questionType = 'audio';
//             const category = localStorage.getItem('category');

//             // Check if question type and category exist
//             if (!questionType || !category) {
//                 throw new Error('Question type or category not found in local storage');
//             }

//             // Fetch questions from the API endpoint
//             const response = await fetch('https://sub-engine.fintecgrate.com/api/jgc/questions/retrieve', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}` // Include token in the headers
//                 },
//                 body: JSON.stringify({
//                     question_type: questionType,
//                     category: category
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch questions');
//             }

//             const data = await response.json();
//             console.log(data.data.questions);
//             setRandomizedQuestions(data.data.questions);
//         } catch (error) {
//             console.error('Error fetching questions:', error);
//             // Handle error
//         }
//     };

//     const handleNextQuestion = () => {
//         if (currentQuestionIndex < randomizedQuestions.length - 1) {
//             setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//         }
//     };

//     const handlePreviousQuestion = () => {
//         if (currentQuestionIndex > 0) {
//             setCurrentQuestionIndex(prevIndex => prevIndex - 1);
//         }
//     };

//     const handleSubmitQuestion = async () => {
//         // Logic for handling question submission
//     };

//     if (showResultPage) {
//         // Pass props to ResultsComponent
//         return <ResultsComponent score={0} correctAnswers={0} totalQuestions={randomizedQuestions.length} questionType="audio" />;
//     }

//     const currentQuestion = randomizedQuestions[currentQuestionIndex];

//     // Convert timer to minutes and seconds
//     const minutes = Math.floor(timer / 60);
//     const seconds = timer % 60;
//     const formattedTimer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//     // Check if currentQuestion exists before rendering
//     if (!currentQuestion) {
//         return null; // Or render a loading indicator
//     }

//     return (
//         <main className={`flex min-h-screen flex-col items-center justify-center pt-24${inter.className}`} style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//             <div className="flex justify-center gap-6 items-center w-full px-10">
//                 <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 justify-center items-center text-center bg-white rounded-lg shadow-xl">
//                     <div className="header-container flex gap-5 w-full rounded-t-lg">
//                         <div className={`timer w-full h-32 rounded-t-lg ${inter.className}`} style={{ backgroundImage: 'url(/images/repeating-chevrons.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//                             <div className="w-full flex items-center justify-center">
//                                 <div className="text-4xl mt-10 text-white font-bold">{formattedTimer}</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="quiz-container w-full p-4 md:p-8">
//                         <>
//                             <div className="w-full flex flex-col gap-6 items-center justify-center">
//                                 <h1 className="quiz-text text-lg md:text-3xl font-semibold py-6 text-teal-600">Listen and type what you hear</h1>
//                                 <audio controls>
//                                     <source src={currentQuestion.audioSrc} type="audio/mpeg" />
//                                     Your browser does not support the audio element.
//                                 </audio>
//                                 <Input className="border-2 w-1/2 border-gray-400 p-2 rounded-lg outline-none focus:border-green-500" id="areaZone" placeholder="What do you hear?" />
//                             </div>
//                         </>

//                         <div className="flex gap-6 justify-center items-center">
//                             <Button className="next-button bg-gray-500 text-white py-4 md:py-4 px-6 md:px-12 rounded-md mt-4" onClick={handlePreviousQuestion}>
//                                 Previous
//                             </Button>
//                             <Button className="next-button bg-orange-400 text-white py-4 md:py-4 px-6 md:px-12 rounded-md mt-4" onClick={handleNextQuestion}>
//                                 Next
//                             </Button>
//                         </div>
//                         <Button className="next-button bg-green-500 text-white py-4 md:py-4 px-6 md:px-12 rounded-md mt-4" onClick={handleSubmitQuestion}>
//                             Submit
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

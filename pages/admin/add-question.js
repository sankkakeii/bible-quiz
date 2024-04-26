// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { Inter } from "next/font/google";
// import { Card } from "@/components/ui/card";
// import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });

// export default function AddQuestionForm({ onSubmit }) {
//     const [question, setQuestion] = useState("");
//     const [options, setOptions] = useState(["", "", ""]);
//     const [correctAnswer, setCorrectAnswer] = useState("");
//     const [type, setType] = useState("multiple-choice");
//     const [audioFile, setAudioFile] = useState(null);
//     const [category, setCategory] = useState("9-12");

//     const handleOptionChange = (index, value) => {
//         const updatedOptions = [...options];
//         updatedOptions[index] = value;
//         setOptions(updatedOptions);
//     };

//     const handleAddQuestion = () => {
//         const newQuestion = {
//             question,
//             options,
//             correctAnswer,
//             type,
//             audioFile,
//             category
//         };
//         onSubmit(newQuestion);
//         // Reset form after submission
//         setQuestion("");
//         setOptions(["", "", "", ""]);
//         setCorrectAnswer("");
//         setType("multiple-choice");
//         setAudioFile(null);
//         setCategory("9-12");
//     };

//     return (
//         <main className={`flex min-h-screen flex-col items-center justify-center mx-auto pt-24${inter.className}`} style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
//             <Card className="p-4 md:p-8 w-1/2 flex flex-col gap-3">
//                 {type === 'multiple-choice' && (
//                     <>
//                         <div className="text-left">
//                             <label className="text-teal-600 font-semibold">Question</label>
//                             <Input
//                                 placeholder="Enter the question"
//                                 value={question}
//                                 onChange={(e) => setQuestion(e.target.value)}
//                                 className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
//                             />
//                         </div>
//                         {options.map((option, index) => (
//                             <div className="text-left" key={index}>
//                                 <label className="text-teal-600 font-semibold">{`Option ${index + 1}`}</label>
//                                 <Input
//                                     placeholder={`Enter option ${index + 1}`}
//                                     value={option}
//                                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                                     className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
//                                 />
//                             </div>
//                         ))}
//                         <div className="text-left">
//                             <label className="text-teal-600 font-semibold">Select Correct Answer</label>
//                             <select
//                                 value={correctAnswer}
//                                 onChange={(e) => setCorrectAnswer(e.target.value)}
//                                 className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
//                             >
//                                 {options.map((option, index) => (
//                                     <option key={index} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="text-left">
//                             <label className="text-teal-600 font-semibold">Category</label>
//                             <select
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                                 className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
//                             >
//                                 <option value="9-12">9-12</option>
//                                 <option value="teens">Teens</option>
//                             </select>
//                         </div>
//                     </>
//                 )}
//                 {type === 'spelling-bee' && (
//                     <>
//                         <div className="text-left">
//                             <label className="text-teal-600 font-semibold">Audio File</label>
//                             <Input
//                                 type="file"
//                                 onChange={(e) => setAudioFile(e.target.files[0])}
//                                 className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
//                             />
//                         </div>
//                         <div className="text-left">
//                             <label className="text-teal-600 font-semibold">Correct Answer</label>
//                             <Input
//                                 placeholder="Enter the correct answer"
//                                 value={correctAnswer}
//                                 onChange={(e) => setCorrectAnswer(e.target.value)}
//                                 className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
//                             />
//                         </div>
//                         <div className="text-left">
//                             <label className="text-teal-600 font-semibold">Category</label>
//                             <select
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                                 className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
//                             >
//                                 <option value="9-12">9-12</option>
//                                 <option value="teens">Teens</option>
//                             </select>
//                         </div>
//                     </>
//                 )}
//                 <div className="text-left">
//                     <label className="text-teal-600 font-semibold">Type</label>
//                     <select
//                         value={type}
//                         onChange={(e) => setType(e.target.value)}
//                         className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
//                     >
//                         <option value="multiple-choice">Multiple Choice</option>
//                         <option value="spelling-bee">Spelling Bee</option>
//                     </select>
//                 </div>
//                 <Button onClick={handleAddQuestion} className="bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8">Add Question</Button>
//             </Card>
//         </main>
//     );
// }














































import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";

export default function AddQuestionForm({ onSubmit }) {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [questionType, setQuestionType] = useState("audio");
    const [audioFile, setAudioFile] = useState(null);
    const [category, setCategory] = useState("9-12");

    const router = useRouter();

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleAddQuestion = async () => {
        const formData = new FormData();
        formData.append("category", category);
        formData.append("question_type", questionType);

        if (questionType === "audio") {
            formData.append("question", audioFile);
        } else {
            formData.append("question", question);
            formData.append("options", JSON.stringify(options));
            formData.append("correct_answer", correctAnswer);
        }

        try {
            const response = await fetch("https://sub-engine.fintecgrate.com/api/jgc/questions/upload", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                // Do something with the response if needed
                console.log("Question uploaded successfully!");
                // Reset form after successful submission
                setQuestion("");
                setOptions(["", "", ""]);
                setCorrectAnswer("");
                setQuestionType("audio");
                setAudioFile(null);
                setCategory("9-12");
            } else {
                console.error("Error uploading question:", response.status);
            }
        } catch (error) {
            console.error("Error uploading question:", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center mx-auto pt-24" style={{ backgroundImage: 'url(/images/flat-mountains.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <Card className="p-4 md:p-8 w-1/2 flex flex-col gap-3">
                <div className="text-left">
                    <label className="text-teal-600 font-semibold">Question Type</label>
                    <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                        className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
                    >
                        <option value="audio">Audio</option>
                        <option value="multichoice">Multiple Choice</option>
                    </select>
                </div>
                {questionType === 'audio' ? (
                    <>
                        <div className="text-left">
                            <label className="text-teal-600 font-semibold">Audio File</label>
                            <Input
                                type="file"
                                onChange={(e) => setAudioFile(e.target.files[0])}
                                className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-left">
                            <label className="text-teal-600 font-semibold">Question</label>
                            <Input
                                placeholder="Enter the question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
                            />
                        </div>
                        {options.map((option, index) => (
                            <div className="text-left" key={index}>
                                <label className="text-teal-600 font-semibold">{`Option ${index + 1}`}</label>
                                <Input
                                    placeholder={`Enter option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
                                />
                            </div>
                        ))}
                        <div className="text-left">
                            <label className="text-teal-600 font-semibold">Select Correct Answer</label>
                            <select
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                <div className="text-left">
                    <label className="text-teal-600 font-semibold">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded-md mt-1 border-gray-300 shadow"
                    >
                        <option value="9-12">9-12</option>
                        <option value="teens">Teens</option>
                    </select>
                </div>
                <Button onClick={handleAddQuestion} className="bg-green-500 text-white py-4 md:py-6 px-6 md:px-12 rounded-md mt-4 md:mt-8">Add Question</Button>
            </Card>
        </main>
    );
}

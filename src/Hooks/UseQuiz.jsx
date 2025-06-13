import { useState } from 'react';


const useQuiz = () => {

    const [quizData , setQuizData] = useState([]);
    const fetchQuizData = async (url) => {
        try{
            const res = await fetch(url);
            const data = await res.json();
            const formatted = data.results.map(q =>({
                question: q.question,
                options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
                answer: q.correct_answer,

            }));
            setQuizData(formatted);
        }
        catch(err){
            console.error('Failed to fetch Quiz Data',err)
        }
    };
    const shuffleArray = (arr)=> arr.sort(() =>Math.random() - 0.5);

    return{quizData , fetchQuizData};
    
};
export default useQuiz
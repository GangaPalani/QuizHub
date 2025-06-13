import './App.css';
import React from 'react';
import Nav from './Components/Nav/Nav'
import useQuiz from './Hooks/UseQuiz'
import Index from './Pages/Index'; 



function App() {
  
  const { quizData , fetchQuizData} = useQuiz();
  return (
    <>
      <Nav onGenerate={fetchQuizData}/>
      <Index quizData = {quizData}/>
    </>
  )
}

export default App

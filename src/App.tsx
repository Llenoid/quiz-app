import React, { useState } from 'react';
import { fetchQuestions } from './API'
// Components
import QuestionCard from './components/QuestionCard'
// types
import { QuestionState, Difficulty } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

// we export this to use in the QuestionCards component
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean; //  boolean will tell if the person answered correctly
  correctAnswer: string; // this will tell what the correct answer was
}

const TOTAL_NO_OF_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuestions(TOTAL_NO_OF_QUESTIONS, Difficulty.EASY));
  console.log(questions);
  const startGame = async () => {
    // when we click the start button, we trigger the fetch API

    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(
      TOTAL_NO_OF_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // get the users answer
      const answer = e.currentTarget.value;
      // compare answer 
      const correct = questions[number].correct_answer === answer;
      // add score
      if (correct) setScore(prev => prev + 1);
      // save answer in the user answer array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move to next question if not in last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_NO_OF_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  // scaffold out the jsx

  return (
    // jsx can only return one element so we fragment our code by using <> and </> at the end then using the GlobalStyle
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_NO_OF_QUESTIONS ? (
          <button className='start' onClick={startGame}>Start</button>) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading && <p>Loading Questions ... </p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestions={TOTAL_NO_OF_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_NO_OF_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>) : null}
      </Wrapper>
    </>
  );
}

export default App;

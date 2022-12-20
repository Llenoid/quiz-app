import React from 'react';
// Types
import { AnswerObject } from '../App';
// styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQuestions: number;
}

// React.FC makes this a functional component
const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNo, totalQuestions }) =>
(<Wrapper>
  {/* We get the can get the variables in javacript then display then as such because we are in JSX*/}
  <p className='number'>
    Question: {questionNo} / {totalQuestions};
  </p>
  <p dangerouslySetInnerHTML={{ __html: question }} />
  <div>
    {answers.map((answer) => (
      <ButtonWrapper
      key={answer}
      // we use optional chaining here because we don't know what if the user answer is correct or whether the user has answered yet so we make it optional so TS won't throw an error
      correct={userAnswer?.correctAnswer === answer}
      userClicked={userAnswer?.answer === answer}
      >
        <button disabled={!!userAnswer} value={answer} onClick={callback}>
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      </ButtonWrapper>
    ))}
  </div>
</Wrapper>);

export default QuestionCard;

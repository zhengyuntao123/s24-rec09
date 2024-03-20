import React, { useEffect, useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
}

const Quiz: React.FC = () => {
  const quizCore=new QuizCore();
  const [currentQuestion,setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [selectedAnswer,setSelectedAnswer] = useState<string|null>(null);

  // const [score,setScore] = useState(quizCore.getScore());
  // const initialQuestions: QuizQuestion[] = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['London', 'Berlin', 'Paris', 'Madrid'],
  //     correctAnswer: 'Paris',
  //   },
  // ];
  // const [state, setState] = useState<QuizState>({
  //   questions: initialQuestions,
  //   currentQuestionIndex: 0,  // Initialize the current question index.
  //   selectedAnswer: null,  // Initialize the selected answer.
  //   score: 0,  // Initialize the score.
  // });

  // { ...prevState, selectedAnswer: option }这行代码创建了一个新的状态对象，
  // 它通过展开运算符...复制了prevState中的所有状态，然后更新selectedAnswer这一状态为函数参数option的值。
  // 这样做的目的是在保留其他状态不变的前提下，更新特定的状态selectedAnswer。
  const handleOptionSelect = (option: string): void => {
    // setState((prevState) => ({ ...prevState, selectedAnswer: option }));
    setSelectedAnswer(option);
  };


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if (selectedAnswer !== null){
      quizCore.answerQuestion(selectedAnswer);
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
      setSelectedAnswer(null);
      // setScore(quizCore.getScore());
      
    }
  };

  // const { questions, currentQuestionIndex, selectedAnswer, score } = state;
  // const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion){
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }
  // if (!currentQuestion) {
  //   return (
  //     <div>
  //       <h2>Quiz Completed</h2>
  //       <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>{quizCore.hasNextQuestion()?'Next Question':'Submit'}</button>
    </div>
  );
};

export default Quiz;
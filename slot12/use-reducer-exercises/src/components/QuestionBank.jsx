import React, { useReducer, useEffect, useState } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  timeLeft: 10,
  quizStarted: false,
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "START_QUIZ":
      return { ...state, quizStarted: true };

    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "SHOW_FEEDBACK":
      const isCorrect = state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        showFeedback: true,
        isCorrect: isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
      };

    case "NEXT_QUESTION":
      const isLastQuestion = state.currentQuestion + 1 === state.questions.length;
      const newScore = state.isCorrect ? state.score : state.score;
      
      // Lưu điểm cao vào localStorage nếu cần
      if (isLastQuestion) {
        const currentHighScore = parseInt(localStorage.getItem('quizHighScore') || '0');
        if (newScore > currentHighScore) {
          localStorage.setItem('quizHighScore', newScore.toString());
        }
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showFeedback: false,
        timeLeft: 10,
        showScore: isLastQuestion,
        highScore: isLastQuestion ? Math.max(state.highScore, newScore) : state.highScore,
      };

    case "UPDATE_TIME":
      return { ...state, timeLeft: action.payload };

    case "TIME_UP":
      const isCorrectOnTimeUp = state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        showFeedback: true,
        isCorrect: isCorrectOnTimeUp,
        score: isCorrectOnTimeUp ? state.score + 1 : state.score,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: parseInt(localStorage.getItem('quizHighScore') || '0'),
      };

    default:
      return state;
  }
}
// Component chính
function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, {
    ...initialState,
    highScore: parseInt(localStorage.getItem('quizHighScore') || '0')
  });
  
  const { 
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    showFeedback, 
    isCorrect, 
    timeLeft, 
    quizStarted,
    highScore 
  } = state;

  // Timer effect
  useEffect(() => {
    if (quizStarted && !showScore && !showFeedback) {
      const timer = setInterval(() => {
        if (state.timeLeft > 0) {
          dispatch({ type: "UPDATE_TIME", payload: state.timeLeft - 1 });
        } else {
          dispatch({ type: "TIME_UP" });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.timeLeft, quizStarted, showScore, showFeedback]);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption && !showFeedback) {
      dispatch({ type: "SHOW_FEEDBACK" });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  const handleStartQuiz = () => {
    dispatch({ type: "START_QUIZ" });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {!quizStarted ? (
          <div className="text-center">
            <h2>Quiz Challenge</h2>
            <p>Test your knowledge with {questions.length} questions!</p>
            <p className="text-muted">High Score: {highScore}/{questions.length}</p>
            <Button variant="primary" size="lg" onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          </div>
        ) : showScore ? (
          <div className="text-center">
            <h2>Quiz Complete! 🎉</h2>
            <h3 className="mb-3">
              Your Score: {score} / {questions.length}
            </h3>
            {score > highScore && (
              <Alert variant="success" className="mb-3">
                <strong>🎊 New High Score! 🎊</strong>
              </Alert>
            )}
            <p className="text-muted">High Score: {Math.max(score, highScore)}/{questions.length}</p>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Play Again
            </Button>
          </div>
        ) : (
          <div>
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span className={`fw-bold ${timeLeft <= 5 ? 'text-danger' : 'text-primary'}`}>
                  Time: {timeLeft}s
                </span>
              </div>
              <ProgressBar 
                now={(currentQuestion + 1) / questions.length * 100} 
                variant="primary"
                className="mb-3"
              />
            </div>

            <h4 className="mb-4">
              {questions[currentQuestion].question}
            </h4>

            <div className="mb-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option 
                      ? (showFeedback ? (isCorrect ? "success" : "danger") : "primary")
                      : (showFeedback && option === questions[currentQuestion].answer ? "success" : "outline-secondary")
                  }
                  className="m-2 d-block w-100"
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <Alert variant={isCorrect ? "success" : "danger"} className="mb-3">
                <div className="d-flex align-items-center">
                  {isCorrect ? (
                    <>
                      <FaCheckCircle className="me-2" size={20} />
                      <strong>Correct! 🎉</strong>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="me-2" size={20} />
                      <strong>Incorrect! The correct answer is: {questions[currentQuestion].answer}</strong>
                    </>
                  )}
                </div>
              </Alert>
            )}

            <div className="d-flex gap-2">
              {!showFeedback ? (
                <Button
                  variant="primary"
                  className="flex-grow-1"
                  disabled={!selectedOption}
                  onClick={handleSubmitAnswer}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="flex-grow-1"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
// import { quizStore } from "../store/quizStore";
import {
  Button,
  Typography,
  Box,
  Paper,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import QuestionCard from "@/components/QuestionCard";
// import  questions  from "@/data/questions";

const questions = [
  {
    id: 1,
    category: "Who Am I?",
    hints: [
      "I won the Ballon d'Or 5 times.",
      "I have played in the Premier League, La Liga, and Serie A.",
      "I am the all-time top scorer in the UEFA Champions League.",
    ],
    answer: "Cristiano Ronaldo",
  },
  {
    id: 2,
    category: "Who Am I?",
    hints: [
      "I have won the World Cup as both a player and a coach.",
      "I am known for my 'headbutt' in the 2006 World Cup final.",
      "I won the Ballon d'Or in 1998.",
    ],
    answer: "Zinedine Zidane",
  },
  {
    id: 3,
    category: "Who Am I?",
    hints: [
      "I played my entire club career at one club.",
      "I have won 7 Ballon d'Ors.",
      "I am the all-time top scorer for both club and country.",
    ],
    answer: "Lionel Messi",
  },
];

const getRandomQuestions = (questions: any[], num: number) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5); // Shuffle array
  console.log("Shuffled", shuffled.slice(0, num));
  return shuffled.slice(0, num); // Pick first `num` questions
};

const Quiz = observer(() => {
  const [twentyQuestions, setTwentyQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //   const currentQuestion = twentyQuestions[currentQuestionIndex];
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setTwentyQuestions(getRandomQuestions(questions, 3));
  }, []);

  const currentQuestion =
    twentyQuestions.length > 0 ? twentyQuestions[currentQuestionIndex] : null;

  useEffect(() => {
    if (!currentQuestion) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          handleSkipQuestion();
          return 20;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion]);

  useEffect(() => {
    if (timer === 0) {
      handleSkipQuestion();
    }
  }, [timer]);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimer(20);
  };

  useEffect(() => {
    console.log("Updated index is", currentQuestionIndex);
  }, [currentQuestionIndex]);

  const submitAnswer = () => {
    if (
      userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      setScore((prev) => prev + 10);
    }
    setSnackbarMessage("Question Answered");
    setSnackbarOpen(true);
    setUserAnswer("");
    nextQuestion();
  };

  const handleSkipQuestion = () => {
    setSnackbarMessage("Question Skipped");
    setSnackbarOpen(true);
    nextQuestion();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }} // Green gradient background
    >
      <Paper
        sx={{
          p: 4,
          width: "80%",
          maxWidth: 600,
          background: "rgba(255, 255, 255, 0.1)", // Transparent effect
          backdropFilter: "blur(10px)", // Blurred glass effect
          //   backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "12px",
          color: "white",
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Question {currentQuestionIndex}/{20}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: timer <= 5 ? "red" : "white",
              fontWeight: "bold",
            }}
          >
            ⏳ {timer}s
          </Typography>
        </Box>

        {currentQuestion && <QuestionCard question={currentQuestion} />}

        {/* Answer Input Box */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your answer..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          sx={{
            mt: 3,
            bgcolor: "white",
            borderRadius: "8px",
          }}
        />

        <Button
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "#FFD700",
            color: "black",
            fontWeight: "bold",
          }} // Gold button
          onClick={submitAnswer}
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Answer
        </Button>
      </Paper>
    </Box>
  );
});

export default Quiz;

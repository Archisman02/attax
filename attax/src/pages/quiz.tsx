import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
// import { quizStore } from "../store/quizStore";
import { Button, Typography, Box, Paper, TextField } from "@mui/material";
import { motion } from "framer-motion";

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

const Quiz = observer(() => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [gameOver, setGameOver] = useState(false);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Timer Logic
  useEffect(() => {
    if (timer === 0) {
      submitAnswer(); // Auto-submit when timer reaches 0
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Answer Submission
  const submitAnswer = () => {
    if (
      userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      setScore((prev) => prev + 10); // Award points for correct answer
    }

    setUserAnswer(""); // Reset input
    nextQuestion();
  };

  // Move to the next question or end game
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(15); // Reset timer for new question
    } else {
      setGameOver(true);
    }
  };

  // Restart the game
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswer("");
    setTimer(15);
    setGameOver(false);
  };

  // const [timer, setTimer] = React.useState<number>(15);
  // const currentQuestion = questions[0];

  return (
    // <Box
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   height="100vh"
    //   textAlign="center"
    // >
    //   <Paper
    //     sx={{
    //       p: 4,
    //       width: "80%",
    //       maxWidth: 600,
    //       background: "rgba(255, 255, 255, 0.1)", // Transparent effect
    //       backdropFilter: "blur(10px)", // Blurred effect
    //       borderRadius: "12px",
    //     }}
    //   >
    //     {/* Timer */}
    //     <Typography variant="h6" sx={{ color: timer <= 5 ? "red" : "white" }}>
    //       ⏳ {timer}s
    //     </Typography>

    //     {/* Question Category */}
    //     <Typography variant="h5" fontWeight="bold" mb={2}>
    //       Who Am I?
    //     </Typography>

    //     {/* Hints (Reveal Hints One by One) */}
    //     {currentQuestion.hints.map((hint, index) => (
    //       <Typography
    //         key={index}
    //         variant="body1"
    //         component={motion.p}
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         transition={{ delay: index * 2 }}
    //         mb={1}
    //       >
    //         {hint}
    //       </Typography>
    //     ))}

    //     {/* Answer Input Box */}
    //     <TextField
    //       fullWidth
    //       variant="outlined"
    //       placeholder="Type your answer..."
    //       // value={quizStore.userAnswer}
    //       // onChange={(e) => quizStore.setUserAnswer(e.target.value)}
    //       sx={{ mt: 2, bgcolor: "white", borderRadius: "8px" }}
    //     />

    //     {/* Submit Button */}
    //     <Button
    //       variant="contained"
    //       sx={{ mt: 2 }}
    //       // onClick={() => quizStore.submitAnswer()}
    //       component={motion.button}
    //       whileHover={{ scale: 1.05 }}
    //       whileTap={{ scale: 0.95 }}
    //     >
    //       Submit Answer
    //     </Button>

    //     {/* Score Display */}
    //     <Typography mt={2}>Score: 1</Typography>
    //   </Paper>
    // </Box>

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
          borderRadius: "12px",
          color: "white",
        }}
      >
        {gameOver ? (
          <>
            <Typography variant="h4">Game Over! 🎉</Typography>
            <Typography variant="h6">Your Score: {score}</Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#FFD700",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={resetGame}
            >
              Play Again
            </Button>
          </>
        ) : (
          <>
            {/* Timer */}
            <Typography
              variant="h6"
              sx={{
                color: timer <= 5 ? "red" : "white",
                fontWeight: "bold",
              }}
            >
              ⏳ {timer}s
            </Typography>

            {/* Question Category */}
            <Typography variant="h5" fontWeight="bold" mt={2} mb={3}>
              Who Am I?
            </Typography>

            {/* Hints (All Three Hints Visible) */}
            {currentQuestion.hints.map((hint, index) => (
              <Typography
                key={index}
                variant="body1"
                fontSize="1.2rem"
                sx={{
                  mb: 1,
                  p: 1,
                  background: "rgba(255, 255, 255, 0.2)", // Slightly transparent background
                  borderRadius: "8px",
                }}
              >
                {hint}
              </Typography>
            ))}

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

            {/* Submit Button */}
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

            {/* Score Display */}
            <Typography mt={2} fontWeight="bold">
              Score: {score}
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
});

export default Quiz;

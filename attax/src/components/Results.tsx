import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

const Results = ({
  score,
  userResponses,
}: {
  score: number;
  userResponses: any[];
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }}
    >
      <Paper
        sx={{
          p: 4,
          width: "80%",
          maxWidth: 600,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          color: "white",
        }}
      >
        {/* Show Final Score & Title */}
        <Typography variant="h4" fontWeight="bold">
          {score}
        </Typography>
        <Typography variant="h6" mt={2}>
          Final Score: {score} / 20
        </Typography>

        {/* Show User Responses */}
        <Box mt={3} textAlign="left">
          <Typography variant="h5" fontWeight="bold">
            Review Your Answers:
          </Typography>
          {userResponses.map((response: any, index: number) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                p: 2,
                borderRadius: "8px",
                background: response.isCorrect
                  ? "rgba(0, 255, 0, 0.2)"
                  : "rgba(255, 0, 0, 0.2)",
              }}
            >
              <Typography fontWeight="bold">
                {index + 1}. {response.question}
              </Typography>
              <Typography>
                Your Answer:{" "}
                <b style={{ color: response.isCorrect ? "green" : "red" }}>
                  {response.userAnswer}
                </b>
              </Typography>
              <Typography>
                Correct Answer: <b>{response.correctAnswer}</b>
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Restart Quiz Button */}
        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: "#FFD700", color: "black", fontWeight: "bold" }}
          // onClick={onRestart}
        >
          Play Again
        </Button>
      </Paper>
    </Box>
  );
};

export default Results;

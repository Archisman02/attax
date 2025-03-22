import React from "react";
import { observer } from "mobx-react-lite";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import quizStore from "../stores/quizStore";

const Result = observer(() => {
  const score = quizStore.score;
  const resultMessage = score > 10 ? "Great Job!" : "Better Luck Next Time!";
  const userResponses = quizStore.userResponses;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ background: "linear-gradient(135deg, #006400, #81e58e)" }}
    >
      {/* Top Half */}
      <Box
        width="50%"
        textAlign="center"
        mb={4}
        sx={{ backgroundColor: "#006432", borderRadius: 2, p: 3 }}
      >
        <Typography
          variant="h4"
          color="white"
          fontWeight="bold"
          fontStyle="italic"
          mb={2}
          sx={{ margin: 0, padding: 0 }}
        >
          You got {score} out of 20 correct!
        </Typography>
        <Typography variant="h5" color="white" sx={{ margin: 0, padding: 0 }}>
          {resultMessage}
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#643200",
              color: "white",
              fontWeight: "bold",
              mr: 2,
            }}
            onClick={() => window.location.reload()}
          >
            Play Again
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#FFD700",
              color: "#FFD700",
              fontWeight: "bold",
            }}
            onClick={() => (window.location.href = "/")}
          >
            Home
          </Button>
        </Box>
      </Box>

      {/* Bottom Half */}
      <Box width="50%">
        {userResponses.map((userResponse, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: "#006432", // Set accordion background color
              color: "white", // Set text color to white
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />} // Set expand icon color to white
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography component="span">
                {userResponse.category === "Who Said It?"
                  ? `Who said ${userResponse.question}`
                  : userResponse.category === "Career Path Challenge"
                  ? `Which player has this career path? ${
                      Array.isArray(userResponse.question)
                        ? userResponse.question.map((q) => q).join(" -> ")
                        : userResponse.question
                    }`
                  : `Who is this player? ${
                      Array.isArray(userResponse.question)
                        ? userResponse.question.map((q) => q).join(",")
                        : userResponse.question
                    }`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Your Answer:</strong> {userResponse.userAnswer}
              </Typography>
              <Typography>
                <strong>Correct Answer:</strong> {userResponse.correctAnswer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
});

export default Result;

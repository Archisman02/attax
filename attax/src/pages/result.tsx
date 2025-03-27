import React from "react";
import { observer } from "mobx-react-lite";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import quizStore from "../stores/quizStore";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HomeIcon from "@mui/icons-material/Home";
import router from "next/router";

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
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #006400, #00a000)",
        overflowY: "auto",
        px: 2,
      }}
    >
      {/* Top Half */}
      <Box
        // width="50%"
        width={{ xs: "90%", sm: "70%", md: "50%" }}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={4}
        sx={{
          borderRadius: 2,
          p: 3,
          background: "rgba(255, 255, 255, 0.1)", // Transparent effect
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          color="white"
          fontWeight="bold"
          fontStyle="italic"
          mb={2}
          sx={{ margin: 0, padding: 0, fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          You got {score} out of 20 correct!
        </Typography>
        <Typography
          variant="h5"
          color="white"
          sx={{ margin: 0, padding: 0, fontSize: { xs: "1rem", sm: "1.5rem" } }}
        >
          {resultMessage}
        </Typography>
        <Box
          mt={3}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#643200",
              color: "white",
              fontWeight: "bold",
              // mr: 2,
            }}
            endIcon={<RestartAltIcon />}
            onClick={() => {
              quizStore.clear();
              router.replace("/quiz");
            }}
          >
            Restart quiz
          </Button>
          <Button
            variant="text"
            sx={{
              // borderColor: "#FFD700",
              color: "#000064",
              fontWeight: "bold",
            }}
            endIcon={<HomeIcon />}
            onClick={() => {
              quizStore.clear();
              router.replace("/");
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Box>

      {/* Bottom Half */}
      <Box width={{ xs: "90%", sm: "70%", md: "50%" }}>
        <Typography
          variant="h5"
          color="white"
          sx={{
            mb: 1,
            textAlign: "center",
            fontSize: { xs: "1rem", sm: "1.5rem" },
          }}
        >
          Here are the answers!
        </Typography>
        {userResponses.map((userResponse, index) => (
          <Accordion
            key={index}
            sx={{
              background: "rgba(255, 255, 255, 0.1)", // Transparent effect
              backdropFilter: "blur(10px)",
              color: "white", // Set text color to white
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />} // Set expand icon color to white
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography component="span" sx={{ marginRight: 1 }}>
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
              <Chip
                label={
                  userResponse.isAnswerCorrect === "correct"
                    ? "Correct"
                    : userResponse.isAnswerCorrect === "skipped"
                    ? "Skipped"
                    : "Incorrect"
                }
                color={
                  userResponse.isAnswerCorrect === "correct"
                    ? "success"
                    : userResponse.isAnswerCorrect === "skipped"
                    ? "info"
                    : "error"
                }
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {userResponse.userAnswer !== "" && "Your Answer: "}
                <strong>
                  {userResponse.userAnswer === ""
                    ? "Question skipped"
                    : userResponse.userAnswer}
                </strong>
              </Typography>
              <Typography>
                Correct Answer: <strong>{userResponse.correctAnswer}</strong>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
});

export default Result;

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

interface Question {
  id: number;
  category: string;
  answer: string;
  hints?: string[]; // For "Who Am I?"
  clubs?: string[]; // For "Career Path Challenge"
  quote?: string; // For "Who Said It?"
  status?: string;
}

const QuestionCard: React.FC<{
  question: Question;
}> = ({ question }) => {
  //   console.log("Question Received is", question);
  return (
    <>
      {question.category === "Who Am I?" && (
        <Box>
          <Typography variant="h5" fontWeight="bold" mt={2} mb={3}>
            Which player am I?
          </Typography>

          {question.hints &&
            question.hints.map((hint, index) => (
              <Typography
                key={index}
                variant="body1"
                fontSize="1.2rem"
                sx={{
                  mb: 1,
                  p: 1,
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
              >
                {hint}
              </Typography>
            ))}
        </Box>
      )}

      {question.category === "Career Path Challenge" && (
        <Box>
          <Typography variant="h5" fontWeight="bold" mt={2} mb={3}>
            {question.status == "Retired"
              ? "Which retired player had this career path?"
              : "Which active player has this career path?"}
          </Typography>

          {question.clubs &&
            question.clubs.map((club, index) => (
              <Typography
                key={index}
                variant="body1"
                fontSize="1.2rem"
                sx={{
                  mb: 1,
                  p: 1,
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
              >
                {club}
              </Typography>
            ))}
        </Box>
      )}

      {question.category === "Who Said It?" && (
        <Box>
          <Typography variant="h5" fontWeight="bold" mt={2} mb={3}>
            Who said this?
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            fontStyle="italic"
            // sx={{ mb: 3, color: "white" }}
          >
            "{question.quote}"
          </Typography>
        </Box>
      )}
    </>
  );
};

export default QuestionCard;

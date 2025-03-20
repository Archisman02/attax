import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const Results = ({
  score,
  userResponses,
  resultMessage,
}: {
  score: number;
  userResponses: any[];
  resultMessage: string;
}) => {
  return (
    // <Box
    //   // display="flex"
    //   // flexDirection="column"
    //   // justifyContent="space-between"
    //   // alignItems="center"
    //   // height="100vh"
    //   // textAlign="center"
    //   sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }}
    // >
    <>
      <Typography
        variant="h5"
        color="white"
        mb={2}
        sx={{ margin: 0, padding: 0 }}
      >
        Your Score: {score}/20
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        fontStyle="italic"
        sx={{ margin: 0, padding: 0 }}
        // sx={{ mb: 3, color: "white" }}
      >
        {resultMessage}
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#FFD700",
          color: "black",
          fontWeight: "bold",
        }}
        onClick={() => window.location.reload()} // Restart the quiz
      >
        Play Again
      </Button>
    </>
    // </Box>
  );
};

export default Results;

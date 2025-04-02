import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Typography, Button, Box } from "@mui/material";

const RulesDialog = ({
  open,
  onClose,
  onQuizStart,
}: {
  open: boolean;
  onClose: () => void;
  onQuizStart: () => void;
}) => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (open && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [open, timer]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }}
    >
      {/* <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        📢 Welcome to the Ultimate Football Quiz! ⚽
      </DialogTitle> */}
      <DialogContent sx={{ background: "#238b45" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "white" }}
          gutterBottom
        >
          🔹 How to Play
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: "white" }}>
          - <strong>Career Path Challenge</strong> → Guess the player from their
          club history.
          <br />- <strong>Who Said It?</strong> → Identify the player/coach from
          their famous quote.
          <br />- <strong>Who Am I?</strong> → Identify the player based on
          career hints.
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "white" }}
          gutterBottom
        >
          🏆 Scoring Rules
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: "white" }}>
          - <strong>1 point</strong> for every correct answer.
          <br />- Enter <strong>
            first name, last name, or full name
          </strong>{" "}
          (spelling must be correct).
          <br />- Example: &quot;Virgil van Dijk&quot; → &quot;Virgil&quot;,
          &quot;van Dijk&quot;, or &quot;Virgil van Dijk&quot; are correct.
          <br />- Nicknames (e.g., &quot;Lewa&quot; for &quot;Lewandowski&quot;)
          are incorrect.
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "white" }}
          gutterBottom
        >
          ⏳ Time Limit
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: "white" }}>
          - You have <strong>30 seconds</strong> per question.
          <br />- If time runs out, you automatically move to the next question.
        </Typography>

        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={onQuizStart}
            disabled={timer > 0}
            sx={{
              backgroundColor: "#FFD700",
              color: "black",
              "&:hover": { backgroundColor: "#ffc107" },
            }}
          >
            {timer > 0
              ? `Starting in ${timer}s...`
              : "Clear with the rules. Let’s Start!"}
          </Button>
        </Box>
      </DialogContent>
      {/* </DialogTitle> */}
    </Dialog>
  );
};

export default RulesDialog;

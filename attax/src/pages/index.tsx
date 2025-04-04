import { useRouter } from "next/router";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import RulesDialog from "@/components/RuleBox";

export default function Home() {
  const router = useRouter();
  const [showRules, setShowRules] = useState(false);

  const handleStartGame = () => {
    setShowRules(false);
    router.push("./quiz");
  };

  return (
    <>
      <RulesDialog
        open={showRules}
        onClose={handleStartGame}
        // startGame={handleStartGame}
      />
      {!showRules && (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundImage: "linear-gradient(to bottom right, #4caf50, #81c784)"
            background: "linear-gradient(135deg, #006400, #00a000)",
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: "center" }}>
            {/* <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        > */}
            {/* <Box
            sx={{
              textAlign: "center",
              p: 4,
              backgroundColor: "#006432",
              borderRadius: 2,
            }}
          > */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Bungee, sans-serif",
                  fontWeight: "700",
                  fontSize: {
                    xs: "2rem",
                    sm: "3rem",
                    md: "3.5rem",
                    lg: "4rem",
                  },
                  color: "white",
                  mb: 2,
                  letterSpacing: 2,
                }}
                gutterBottom
              >
                Are you a true Football fan?
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Bungee, sans-serif",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                    md: "1.5rem",
                    lg: "1.5rem",
                  },
                  mb: 4,
                  letterSpacing: 4,
                  color: "white",
                }}
                gutterBottom
              >
                Prove It with 10 Questions!
              </Typography>
            </motion.div>

            {/* <ToggleButtonGroup
              value={category}
              exclusive
              onChange={(event, newCategory) => setCategory(newCategory)}
              sx={{ mb: 1 }}
            >
              <ToggleButton value="football" sx={{ fontSize: "1.2rem", px: 3 }}>
                ⚽ Football
              </ToggleButton>
              <ToggleButton value="cricket" sx={{ fontSize: "1.2rem", px: 3 }}>
                🏏 Cricket
              </ToggleButton>
            </ToggleButtonGroup> */}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#FFD700",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#ffc107",
                  },
                  fontFamily: "Bungee, sans-serif",
                }}
                size="large"
                onClick={() => setShowRules(true)}
                endIcon={<ArrowForwardIcon />}
              >
                Start Football Quiz
              </Button>
            </motion.div>
            {/* </Box> */}
            {/* </motion.div> */}
          </Container>
        </Box>
      )}
    </>
  );
}

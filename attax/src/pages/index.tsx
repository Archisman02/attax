import { useRouter } from "next/router";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import RulesDialog from "@/components/RuleBox";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import NameBox from "@/components/NameBox";

export default function Home() {
  const router = useRouter();
  const [showRules, setShowRules] = useState(false);
  const [showNameBox, setShowNameBox] = useState(false);

  const handleStartGame = () => {
    setShowRules(false);
    router.push("./quiz");
  };

  const handleNameBoxClose = () => {
    setShowNameBox(false);
  };

  const handleRoomBoxClose = () => {
    setShowRules(false);
  };

  return (
    <>
      <RulesDialog
        open={showRules}
        onClose={handleRoomBoxClose}
        onQuizStart={handleStartGame}
        // startGame={handleStartGame}
      />
      <NameBox
        open={showNameBox}
        handleNameBoxClose={handleNameBoxClose}
      ></NameBox>
      {!showRules && (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            background: "linear-gradient(135deg, #006400, #00a000)",
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "pink",
            }}
          >
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

            <Box
              sx={{
                width: { xs: "90%", sm: "65%" },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#ffc107",
                  },
                  fontFamily: "Bungee, sans-serif",
                }}
                size="large"
                onClick={() => setShowNameBox(true)}
                startIcon={<GroupIcon />}
              >
                Challenge a Friend
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#ffc107",
                  },
                  fontFamily: "Bungee, sans-serif",
                }}
                size="large"
                onClick={() => setShowRules(true)}
                startIcon={<PersonIcon />}
              >
                Play Solo Quiz
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}

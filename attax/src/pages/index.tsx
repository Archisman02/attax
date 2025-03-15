import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Home() {
  const router = useRouter();
  const [category, setCategory] = useState("football");

  const getTitle = () => {
    if (category === "football") return "Are You a True Football Fan?";
    if (category === "cricket") return "Are You a True Cricket Fan?";
  };

  const handleStartGame = () => {
    if (!category)
      return alert("Please enter your name and select a category!");
    router.push("./quiz");
  };

  return (
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
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: "center",
              p: 4,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 2,
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
                  mb: 2,
                }}
                gutterBottom
              >
                {getTitle()}
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
                  mb: 5,
                }}
                gutterBottom
              >
                Prove It with 20 Questions!
              </Typography>
            </motion.div>

            <ToggleButtonGroup
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
            </ToggleButtonGroup>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#ffd700",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#ffc107",
                  },
                  fontFamily: "Bungee, sans-serif",
                }}
                size="large"
                onClick={handleStartGame}
                endIcon={<ArrowForwardIcon />}
              >
                Test your knowledge
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

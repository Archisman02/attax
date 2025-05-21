import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Container,
  Paper,
  Avatar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import playerStore from "@/stores/playerStore";

export default function QuizLobby() {
  const router = useRouter();
  //   const { roomId } = router.query;
  const { roomId, creator } = router.query;

  const [copied, setCopied] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!router.isReady || !roomId || creator === "true") return;

    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("🟢 Connected to server");
      socket.send(JSON.stringify({ type: "JOIN_ROOM", roomId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "GAME_START") {
        console.log("🎮 Game starting!");
        router.push(`/quiz-game?roomId=${roomId}`);
      }

      if (data.type === "ROOM_CLOSED") {
        alert(data.message);
        router.push("/");
      }

      if (data.type === "ERROR") {
        alert(data.message);
        router.push("/");
      }
    };

    return () => {
      socket.close();
    };
  }, [router.isReady, roomId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roomId as string);
    setCopied(true);
  };

  const handleExit = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "CLOSE_ROOM", roomId }));
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }}
    >
      <Paper
        sx={{
          p: 4,
          width: "80%",
          maxWidth: 600,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          // backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "12px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Waiting for your friend...
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          width="75%"
          // sx={{ backgroundColor: "pink" }}
        >
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">Share this Room No:</Typography>
            <Typography variant="h5" fontWeight="bold">
              {roomId}
            </Typography>
          </Box>
          <Button
            onClick={handleCopy}
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{ backgroundColor: "#FFD700", color: "black" }}
          >
            Copy
          </Button>
        </Box>

        <Box
          width="80%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          mt={4}
          // sx={{ backgroundColor: "pink" }}
        >
          <Box display="flex" flexDirection="row" gap={1}>
            <Avatar>{playerStore.playerOne.charAt(0)}</Avatar>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{playerStore.playerOne}</Typography>
              <Typography variant="body2">Owner</Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            <Avatar>{playerStore.playerTwo.charAt(0)}</Avatar>
            <Typography variant="body1">
              {playerStore.playerTwo
                ? playerStore.playerTwo
                : "Waiting for Player 2"}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" gap={2}>
          <Button
            onClick={handleExit}
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{ backgroundColor: "#FFD700", color: "black" }}
          >
            Exit
          </Button>
          <Button
            onClick={handleCopy}
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{ backgroundColor: "#FFD700", color: "black" }}
          >
            Start Quiz
          </Button>
        </Box>
      </Paper>
      {/* <Container maxWidth="sm" sx={{ textAlign: "center", color: "white" }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Waiting for your friend to join...
        </Typography>
        <Typography variant="body1" gutterBottom>
          Share this Room ID:
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            background: "#fff",
            color: "#000",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          {roomId}
        </Typography>
        <Button
          onClick={handleCopy}
          variant="contained"
          startIcon={<ContentCopyIcon />}
          sx={{ mt: 2, backgroundColor: "#FFD700", color: "black" }}
        >
          Copy Room ID
        </Button>
        <Snackbar
          open={copied}
          autoHideDuration={2000}
          onClose={() => setCopied(false)}
          message="Room ID copied!"
        />
      </Container> */}
    </Box>
  );
}

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography, Snackbar, Container } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center", color: "white" }}>
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
      </Container>
    </Box>
  );
}

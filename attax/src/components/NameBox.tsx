import playerStore from "@/stores/playerStore";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

const NameBox = ({
  open,
  handleNameBoxClose,
  joinRoom,
}: {
  open: boolean;
  handleNameBoxClose: () => void;
  joinRoom: () => void;
}) => {
  const [name, setName] = useState<string>("");
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = () => {
    console.log("Emitting create-room...");
    socket.emit("create-room");
  };

  useEffect(() => {
    socket.on("room-created", (code) => {
      console.log("Room created with code:", code);
      setRoomCode(code);
    });

    socket.on("room-joined", ({ players }) => {
      console.log("Players in room:", players);
    });

    socket.on("start-quiz", (questions) => {
      console.log("Game started with questions:", questions);
      // Navigate to quiz page
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleNameBoxClose}
      maxWidth="sm"
      fullWidth
      sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }}
    >
      <DialogTitle>Enter Your Name</DialogTitle>
      <DialogContent>
        {/* <DialogContentText> */}
        {/* </DialogContentText> */}
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setName(e.target.value);
            playerStore.setPlayerOne(e.target.value);
          }}
        />
      </DialogContent>
      <Box
        sx={{
          alignSelf: "center",
          display: "flex",
          width: { sm: "100%", md: "80%" },
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
          marginTop: 2,
          marginBottom: 2,
          //   backgroundColor: "pink",
        }}
        textAlign="center"
      >
        <Button
          variant="contained"
          color="primary"
          // onClick={onClose}
          disabled={name.length === 0}
          sx={{
            backgroundColor: "#FFD700",
            color: "black",
            "&:hover": { backgroundColor: "#ffc107" },
          }}
        >
          Join a Room
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateRoom}
          disabled={name.length === 0}
          sx={{
            backgroundColor: "#FFD700",
            color: "black",
            "&:hover": { backgroundColor: "#ffc107" },
          }}
        >
          Create a Room
        </Button>
      </Box>
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default NameBox;

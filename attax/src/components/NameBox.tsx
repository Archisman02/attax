import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

const NameBox = ({
  open,
  handleNameBoxClose,
  createRoom,
}: {
  open: boolean;
  handleNameBoxClose: () => void;
  createRoom: () => void;
}) => {
  const [name, setName] = useState<string>("");

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
          onChange={(e) => setName(e.target.value)}
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
          onClick={createRoom}
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

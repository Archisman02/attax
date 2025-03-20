import React from "react";
import { observer } from "mobx-react-lite";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import quizStore from "../stores/quizStore";

const Result = observer(() => {
  const score = quizStore.score;
  const resultMessage = score > 10 ? "Great Job!" : "Better Luck Next Time!";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      //   textAlign="center"
      sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }}
    >
      <Box>
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
          onClick={() => window.location.reload()}
        >
          Play Again
        </Button>
      </Box>

      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">Accordion Actions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      </div>
    </Box>
  );
});

export default Result;

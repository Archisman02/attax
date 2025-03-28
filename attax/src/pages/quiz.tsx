import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import quizStore from "../stores/quizStore";
import {
  Button,
  Typography,
  Box,
  Paper,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import QuestionCard from "@/components/QuestionCard";
import router from "next/router";

type Question = {
  id: number;
  category: string;
  answer: string;
  hints?: string[];
  clubs?: string[];
  quote?: string;
  status?: string;
};

const questions = [
  {
    id: 1,
    category: "Who Am I?",
    hints: [
      "I won the Ballon d'Or 5 times.",
      "I have played in the Premier League, La Liga, and Serie A.",
      "I am the all-time top scorer in the UEFA Champions League.",
    ],
    answer: "Cristiano Ronaldo",
  },
  {
    id: 2,
    category: "Who Am I?",
    hints: [
      "I have won the World Cup as both a player and a coach.",
      "I am known for my 'headbutt' in the 2006 World Cup final.",
      "I won the Ballon d'Or in 1998.",
    ],
    answer: "Zinedine Zidane",
  },
  {
    id: 3,
    category: "Who Am I?",
    hints: [
      "I played my entire club career at one club.",
      "I have won 7 Ballon d'Ors.",
      "I am the all-time top scorer for both club and country.",
    ],
    answer: "Lionel Messi",
  },
  {
    id: 4,
    category: "Career Path Challenge",
    clubs: [
      "Sporting CP",
      "Manchester United",
      "Real Madrid",
      "Juventus",
      "Al-Nassr",
    ],
    status: "Playing",
    answer: "Cristiano Ronaldo",
  },
  {
    id: 5,
    category: "Career Path Challenge",
    clubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami"],
    status: "Playing",
    answer: "Lionel Messi",
  },
  {
    id: 6,
    category: "Career Path Challenge",
    clubs: ["Santos", "Barcelona", "Paris Saint-Germain", "Al Hilal", "Santos"],
    status: "Playing",
    answer: "Neymar",
  },
  {
    id: 7,
    category: "Career Path Challenge",
    clubs: ["Everton", "Manchester United", "DC United"],
    status: "Retired",
    answer: "Wayne Rooney",
  },
  {
    id: 8,
    category: "Career Path Challenge",
    clubs: ["Liverpool"],
    status: "Retired",
    answer: "Steven Gerrard",
  },
  {
    id: 9,
    category: "Career Path Challenge",
    clubs: ["Chelsea", "Manchester City"],
    status: "Retired",
    answer: "Frank Lampard",
  },
  {
    id: 10,
    category: "Career Path Challenge",
    clubs: ["Arsenal", "Barcelona", "Vissel Kobe"],
    status: "Retired",
    answer: "Andres Iniesta",
  },
  {
    id: 11,
    category: "Career Path Challenge",
    clubs: [
      "Manchester United",
      "Real Madrid",
      "LA Galaxy",
      "AC Milan",
      "Paris Saint-Germain",
    ],
    status: "Retired",
    answer: "David Beckham",
  },
  {
    id: 12,
    category: "Career Path Challenge",
    clubs: ["Borussia Dortmund", "Bayern Munich", "Barcelona"],
    status: "Playing",
    answer: "Robert Lewandowski",
  },
  {
    id: 13,
    category: "Career Path Challenge",
    clubs: [
      "Malmö FF",
      "Ajax",
      "Juventus",
      "Inter Milan",
      "FC Barcelona",
      "AC Milan",
      "Paris Saint-Germain",
      "Manchester United",
      "Los Angeles Galaxy",
      "AC Milan",
    ],
    status: "Retired",
    answer: "Zlatan Ibrahimovic",
  },
  {
    id: 14,
    category: "Career Path Challenge",
    clubs: ["Ajax", "Real Madrid"],
    status: "Retired",
    answer: "Clarence Seedorf",
  },
  {
    id: 15,
    category: "Career Path Challenge",
    clubs: ["River Plate", "West Ham", "Manchester United", "Manchester City"],
    status: "Retired",
    answer: "Carlos Tevez",
  },
  {
    id: 16,
    category: "Career Path Challenge",
    clubs: ["Leeds United", "Newcastle United", "Manchester United"],
    status: "Retired",
    answer: "Alan Smith",
  },
  {
    id: 17,
    category: "Career Path Challenge",
    clubs: ["Lyon", "Real Madrid", "Al-Ittihad"],
    status: "Playing",
    answer: "Karim Benzema",
  },
  {
    id: 18,
    category: "Career Path Challenge",
    clubs: ["Feyenoord", "Celtic", "Barcelona"],
    status: "Retired",
    answer: "Giovanni van Bronckhorst",
  },
  {
    id: 19,
    category: "Career Path Challenge",
    clubs: [
      "Internacional",
      "Shakhtar Donetsk",
      "Manchester United",
      "Fenerbahçe",
    ],
    status: "Playing",
    answer: "Fred",
  },
  {
    id: 20,
    category: "Career Path Challenge",
    clubs: ["Sevilla", "Barcelona", "Juventus", "Paris Saint-Germain"],
    status: "Retired",
    answer: "Dani Alves",
  },
  {
    id: 21,
    category: "Career Path Challenge",
    clubs: ["Atlético Madrid", "Liverpool", "Chelsea", "AC Milan"],
    status: "Retired",
    answer: "Fernando Torres",
  },
  {
    id: 22,
    category: "Career Path Challenge",
    clubs: ["Flamengo", "Udinese", "Watford", "Everton", "Tottenham"],
    status: "Playing",
    answer: "Richarlison",
  },
  {
    id: 23,
    category: "Career Path Challenge",
    clubs: ["Everton", "Arsenal", "Barcelona", "Chelsea"],
    status: "Retired",
    answer: "Samuel Eto'o",
  },
  {
    id: 24,
    category: "Career Path Challenge",
    clubs: ["Nottingham Forest", "Manchester United", "Real Madrid"],
    status: "Retired",
    answer: "David Beckham",
  },
  {
    id: 25,
    category: "Career Path Challenge",
    clubs: ["Fluminense", "Shakhtar Donetsk", "Manchester City"],
    status: "Retired",
    answer: "Fernandinho",
  },
  {
    id: 26,
    category: "Career Path Challenge",
    clubs: ["Newell's Old Boys", "Atletico Madrid", "Barcelona"],
    status: "Retired",
    answer: "Diego Simeone",
  },
  {
    id: 27,
    category: "Career Path Challenge",
    clubs: ["River Plate", "Real Madrid"],
    status: "Retired",
    answer: "Javier Saviola",
  },
  {
    id: 28,
    category: "Career Path Challenge",
    clubs: [
      "Red Bull Salzburg",
      "RB Leipzig",
      "Borussia Dortmund",
      "Manchester City",
    ],
    status: "Playing",
    answer: "Erling Haaland",
  },
  {
    id: 29,
    category: "Career Path Challenge",
    clubs: ["River Plate", "Manchester City", "Atletico Madrid"],
    status: "Playing",
    answer: "Julian Alvarez",
  },
  {
    id: 30,
    category: "Career Path Challenge",
    clubs: ["Chelsea", "AC Milan"],
    status: "Playing",
    answer: "Fikayo Tomori",
  },
  {
    id: 31,
    category: "Career Path Challenge",
    clubs: ["Monaco", "Paris Saint-Germain", "Real Madrid"],
    status: "Playing",
    answer: "Kylian Mbappe",
  },
  {
    id: 32,
    category: "Career Path Challenge",
    clubs: ["Benfica", "Chelsea"],
    status: "Playing",
    answer: "Enzo Fernandez",
  },
  {
    id: 33,
    category: "Career Path Challenge",
    clubs: ["Vasco da Gama", "Real Madrid"],
    status: "Playing",
    answer: "Vinicius Jr",
  },
  {
    id: 34,
    category: "Who Said It?",
    quote:
      "I just hate losing and that gives you an extra determination to work harder.",
    answer: "Wayne Rooney",
  },
  {
    id: 35,
    category: "Who Said It?",
    quote:
      "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
    answer: "Lionel Messi",
  },
  {
    id: 36,
    category: "Who Said It?",
    quote: "I learned all about life with a ball at my feet.",
    answer: "Ronaldinho",
  },
  {
    id: 37,
    category: "Who Said It?",
    quote:
      "Football is the most important of the less important things in the world.",
    answer: "Carlo Ancelotti",
  },
  {
    id: 38,
    category: "Who Said It?",
    quote: "There is no pressure when you are making a dream come true.",
    answer: "Neymar",
  },
  {
    id: 39,
    category: "Who Said It?",
    quote:
      "It is not the strongest or the most intelligent who will survive but those who can best manage change.",
    answer: "Johan Cruyff",
  },
  {
    id: 40,
    category: "Who Said It?",
    quote:
      "Some people tell me that we professional players are obliged to set an example to young people. But in my opinion, the best example you can set is to be true to yourself.",
    answer: "Zlatan Ibrahimovic",
  },
  {
    id: 41,
    category: "Who Said It?",
    quote: "You have to learn to live with success and failure.",
    answer: "Alan Shearer",
  },
  {
    id: 42,
    category: "Who Said It?",
    quote: "Sometimes in football you have to score goals.",
    answer: "Thierry Henry",
  },
  {
    id: 43,
    category: "Who Said It?",
    quote:
      "The ball is round, the game lasts ninety minutes, and everything else is just theory.",
    answer: "Sepp Herberger",
  },
  {
    id: 54,
    category: "Who Said It?",
    quote:
      "Football is simple, but the hardest thing is to play simple football.",
    answer: "Johan Cruyff",
  },
  {
    id: 55,
    category: "Who Said It?",
    quote:
      "The more difficult the victory, the greater the happiness in winning.",
    answer: "Pele",
  },
  {
    id: 56,
    category: "Who Said It?",
    quote:
      "It is better to fail with your own vision than to succeed with another man's.",
    answer: "Johan Cruyff",
  },
  {
    id: 57,
    category: "Who Said It?",
    quote: "When you buy me, you are buying a Ferrari.",
    answer: "Zlatan Ibrahimovic",
  },
  {
    id: 58,
    category: "Who Said It?",
    quote: "To be the best, you have to work the hardest.",
    answer: "David Beckham",
  },
  {
    id: 59,
    category: "Who Said It?",
    quote:
      "If you do not believe you can do it, then you have no chance at all.",
    answer: "Arsène Wenger",
  },
  {
    id: 60,
    category: "Who Said It?",
    quote:
      "Before kids can play like a pro, they must enjoy playing the game like a kid.",
    answer: "Pep Guardiola",
  },
  {
    id: 61,
    category: "Who Said It?",
    quote:
      "Everything I know about morality and the obligations of men, I owe it to football.",
    answer: "Albert Camus",
  },
  {
    id: 62,
    category: "Who Said It?",
    quote:
      "I never tried to compare myself to anyone else. I just tried to be myself.",
    answer: "Andres Iniesta",
  },
  {
    id: 63,
    category: "Who Said It?",
    quote:
      "In football, you win as a team, you lose as a team, and you also celebrate as a team.",
    answer: "Didier Drogba",
  },
  {
    id: 64,
    category: "Who Said It?",
    quote: "Mountains are there to be climbed, aren't they?",
    answer: "Ole Gunnar Solskjaer",
  },
  {
    id: 65,
    category: "Who Said It?",
    quote: "But eras come to an end",
    answer: "Erik Ten Hag",
  },
  {
    id: 66,
    category: "Who Said It?",
    quote:
      "If they don't want me anymore, I'll go somewhere else and win trophies. That's what I have done my whole career.",
    answer: "Erik Ten Hag",
  },
  {
    id: 66,
    category: "Who Said It?",
    quote: "Coaches can't perform magic",
    answer: "Erik Ten Hag",
  },
  {
    id: 67,
    category: "Who Said It?",
    quote:
      "Please don’t call me arrogant, but I’m European champion and I think I’m a special one.",
    answer: "Jose Mourinho",
  },
  {
    id: 68,
    category: "Who Said It?",
    quote: "I prefer not to speak. If I speak, I am in big trouble.",
    answer: "Jose Mourinho",
  },
  {
    id: 69,
    category: "Who Said It?",
    quote: "Respect. Respect, man. Respect. Respect.",
    answer: "Jose Mourinho",
  },
  {
    id: 70,
    category: "Who Said It?",
    quote: "They brought the bus and they left the bus in front of the goal.",
    answer: "Jose Mourinho",
  },
  {
    id: 71,
    category: "Who Said It?",
    quote: "They brought the bus and they left the bus in front of the goal.",
    answer: "Jose Mourinho",
  },
  {
    id: 73,
    category: "Who Said It?",
    quote: "Football, bloody hell!",
    answer: "Alex Ferguson",
  },
  {
    id: 74,
    category: "Who Said It?",
    quote: "Attack wins you games, defence wins you titles.",
    answer: "Alex Ferguson",
  },
  {
    id: 75,
    category: "Who Said It?",
    quote:
      "My greatest challenge was knocking Liverpool right off their f*****g perch.",
    answer: "Alex Ferguson",
  },
  {
    id: 76,
    category: "Who Said It?",
    quote:
      "Give me Zidane and 10 pieces of wood, and I'll win you the Champions League.",
    answer: "Alex Ferguson",
  },
  {
    id: 77,
    category: "Who Said It?",
    quote: "Let's talk about six, baby!",
    answer: "Jürgen Klopp",
  },
  {
    id: 78,
    category: "Who Said It?",
    quote: "I'm a normal guy from the Black Forest. I'm the Normal One.",
    answer: "Jürgen Klopp",
  },
  {
    id: 78,
    category: "Who Said It?",
    quote:
      "You can change your wife, your politics, your religion, but never, never can you change your favourite football team.",
    answer: "Eric Cantona",
  },
  {
    id: 79,
    category: "Who Said It?",
    quote: "It’s getting tickly now – squeaky-bum time, I call it.",
    answer: "Alex Ferguson",
  },
  {
    id: 80,
    category: "Who Said It?",
    quote:
      "First, I went left; he did too. Then I went right, and he did, too. Then I went left again, and he went to buy a hot dog.",
    answer: "Zlatan Ibrahimaovic",
  },
  {
    id: 81,
    category: "Who Said It?",
    quote: "Sunday, the king plays.",
    answer: "Cristiano Ronaldo",
  },
];

const getRandomQuestions = (questions: Question[], num: number) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5); // Shuffle array
  console.log("Shuffled", shuffled.slice(0, num));
  return shuffled.slice(0, num); // Pick first `num` questions
};

const Quiz = observer(() => {
  const [twentyQuestions, setTwentyQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timer, setTimer] = useState(20);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  let isAnswerCorrect = "";

  useEffect(() => {
    setTwentyQuestions(getRandomQuestions(questions, 20));
  }, []);

  const currentQuestion =
    twentyQuestions.length > 0 ? twentyQuestions[currentQuestionIndex] : null;

  useEffect(() => {
    if (!currentQuestion) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          handleSkipQuestion();
          return 20;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion]);

  useEffect(() => {
    if (timer === 0) {
      handleSkipQuestion();
    }
  }, [timer]);

  const nextQuestion = () => {
    if (
      currentQuestion &&
      currentQuestion.quote &&
      currentQuestion.category === "Who Said It?"
    ) {
      quizStore.addUserResponse(
        currentQuestion.category,
        currentQuestion.quote,
        userAnswer,
        currentQuestion.answer,
        isAnswerCorrect
      );
    } else if (
      currentQuestion &&
      currentQuestion.clubs &&
      currentQuestion.category === "Career Path Challenge"
    ) {
      quizStore.addUserResponse(
        currentQuestion.category,
        currentQuestion.clubs,
        userAnswer,
        currentQuestion.answer,
        isAnswerCorrect
      );
    } else if (
      currentQuestion &&
      currentQuestion.hints &&
      currentQuestion.category === "Who Am I?"
    ) {
      quizStore.addUserResponse(
        currentQuestion.category,
        currentQuestion.hints,
        userAnswer,
        currentQuestion.answer,
        isAnswerCorrect
      );
    }

    if (currentQuestionIndex != 19) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      router.replace("/result");
    }
    setTimer(20);
  };

  useEffect(() => {
    console.log("Updated index is", currentQuestionIndex);
  }, [currentQuestionIndex]);

  const submitAnswer = () => {
    const correctAnswer = currentQuestion?.answer?.toLowerCase() || "";
    const userAnswerTrimmed = userAnswer.trim().toLowerCase();
    const [firstName, lastName] = correctAnswer.split(" ");

    if (
      userAnswerTrimmed === correctAnswer ||
      userAnswerTrimmed === firstName ||
      userAnswerTrimmed === lastName
    ) {
      quizStore.setScore(quizStore.score + 1);
      isAnswerCorrect = "correct";
    } else if (userAnswerTrimmed === "") {
      isAnswerCorrect = "skipped";
    } else {
      isAnswerCorrect = "wrong";
    }

    setSnackbarMessage("Question Answered");
    setSnackbarOpen(true);
    setUserAnswer("");
    nextQuestion();
  };

  const handleSkipQuestion = () => {
    setSnackbarMessage("Question Skipped");
    setSnackbarOpen(true);
    isAnswerCorrect = "skipped";
    nextQuestion();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      sx={{ background: "linear-gradient(135deg, #006400, #00a000)" }} // Green gradient background
    >
      {/* {gameOver ? (
        <Results
          score={quizStore.score}
          userResponses={userResponses}
          resultMessage={getResultMessage(quizStore.score)} // Pass the result message
          // onRestart={resetGame}
        />
      ) : (
        <> */}
      <Paper
        sx={{
          p: 4,
          width: "80%",
          maxWidth: 600,
          background: "rgba(255, 255, 255, 0.1)", // Transparent effect
          backdropFilter: "blur(10px)", // Blurred glass effect
          //   backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "12px",
          color: "white",
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
          >
            Question {currentQuestionIndex + 1}/{20}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: timer <= 5 ? "red" : "white",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
          >
            ⏳ {timer}s
          </Typography>
        </Box>

        {currentQuestion && <QuestionCard question={currentQuestion} />}

        {/* Answer Input Box */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter the first name, last name, or full name..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          sx={{
            mt: 3,
            bgcolor: "white",
            borderRadius: "8px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitAnswer();
            }
          }}
        />
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={1}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#FFD700",
              color: "black",
              "&:hover": {
                backgroundColor: "#ffc107",
              },
              fontWeight: "bold",
            }}
            onClick={submitAnswer}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </Button>

          <Button
            variant="text"
            onClick={handleSkipQuestion}
            sx={{
              // borderColor: "#FFD700",
              color: "#000064",
              fontWeight: "bold",
            }}
          >
            Skip
          </Button>
        </Box>
      </Paper>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* </>
      )} */}
    </Box>
  );
});

export default Quiz;

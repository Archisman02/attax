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
import RulesDialog from "@/components/RuleBox";
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
    clubs: ["Barcelona", "Vissel Kobe"],
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
    clubs: [
      "West Brom",
      "Everton",
      "Manchester United",
      "Inter Milan",
      "Chelsea",
      "Roma",
      "Napoli",
    ],
    status: "Playing",
    answer: "Romelu Lukaku",
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
    category: "Who Am I?",
    hints: [
      "I started my professional career in Belgium before moving to the Premier League at a young age.",
      "After multiple spells at different English clubs, I found my best form in Italy, where I won a league title as part of a dominant strike partnership.",
      "I later returned to England for a record transfer fee but struggled to replicate my success before making another move back to Italy.",
    ],
    answer: "Romelu Lukaku",
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
    id: 40,
    category: "Who Am I?",
    hints: [
      "I formed a deadly strike partnership with a powerful Belgian forward at Inter Milan.",
      "We helped the club win a long-awaited league title, breaking a rival's dominance.",
      "I am also a World Cup winner with Argentina.",
    ],
    answer: "Lautaro Martínez",
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
    category: "Who Am I?",
    hints: [
      "I arrived in Spain as a young striker from France and spent over a decade leading the line for one of the world’s biggest clubs.",
      "I spent years supporting another legendary forward but became the main man after his departure.",
      "I won multiple league titles and was instrumental in my club's recent European success, even winning the Ballon d’Or.",
    ],
    answer: "Karim Benzema",
  },
  {
    id: 41,
    category: "Who Am I?",
    hints: [
      "I made my name as a clinical forward in Spain before making a high-profile move to a rival club.",
      "Though my time there was challenging, I found my way back to my former team and rediscovered my form.",
      "I am also a World Cup winner with France.",
    ],
    answer: "Antoine Griezmann",
  },
  {
    id: 42,
    category: "Who Said It?",
    quote: "Sometimes in football you have to score goals.",
    answer: "Thierry Henry",
  },
  {
    id: 43,
    category: "Who Am I?",
    hints: [
      "I am a goalkeeper from Belgium who has played in the Premier League and La Liga.",
      "I won league titles in both England and Spain and have been named the best goalkeeper in the world.",
      "In the 2022 Champions League final, I made multiple crucial saves to help my team lift the trophy.",
    ],
    answer: "Thibaut Courtois",
  },
  {
    id: 44,
    category: "Who Am I?",
    hints: [
      "I made my professional debut for Everton as a teenager and quickly became one of the most exciting young strikers in English football.",
      "I spent most of my career at one of the biggest clubs in England, where I became its all-time top scorer.",
      "I was also known for my aggressive playing style and spectacular goals, including a famous bicycle kick in a derby match.",
    ],
    answer: "Wayne Rooney",
  },
  {
    id: 44,
    category: "Who Am I?",
    hints: [
      "I started my career in the Netherlands before moving to the Premier League, where I played for two of England’s biggest clubs.",
      "I won the Golden Boot multiple times and was known for my technical ability and powerful left foot.",
      "One of my most famous goals came in a World Cup match, where I scored a stunning diving header.",
    ],
    answer: "Robin van Persie",
  },
  {
    id: 45,
    category: "Who Am I?",
    hints: [
      "I am a striker from an African nation who became a legend at a Premier League club.",
      "I won multiple league titles and domestic cups during my time there and made a dramatic return for one final season.",
      "One of my most famous moments was scoring a late equalizer and the winning penalty in a Champions League final, securing the club's first-ever title in the competition.",
    ],
    answer: "Didier Drogba",
  },
  {
    id: 46,
    category: "Who Am I?",
    hints: [
      "I was a legendary midfielder in the Premier League, known for my goal-scoring ability from midfield.",
      "I won multiple league titles and European trophies with my club before moving to another Premier League team late in my career.",
      "After retiring, I became a coach and later managed the very club where I made my name as a player.",
    ],
    answer: "Frank Lampard",
  },
  {
    id: 47,
    category: "Who Am I?",
    hints: [
      "I shot to global fame after an incredible performance in a World Cup for Colombia, where I won the Golden Boot. My stunning volley in that tournament is still remembered as one of the best goals in history.",
      "After that, I secured a high-profile move to one of Europe’s biggest clubs, where I won multiple league titles and Champions League trophies.",
      "I later had spells in Germany, England, and beyond.",
    ],
    answer: "James Rodriguez",
  },
  {
    id: 48,
    category: "Who Am I?",
    hints: [
      "I am a Brazilian midfielder who made a name for myself in England, with my free-kicks, long-range strikes, and playmaking skills.",
      "My performances led to a big-money move to a Spanish giant, but things didn’t go as planned.",
      "Interestingly, while on loan, I helped another club win the Champions League—against my parent club!",
    ],
    answer: "Philippe Coutinho",
  },
  {
    id: 49,
    category: "Who Am I?",
    hints: [
      "I rose from non-league football to become a Premier League champion, proving that dreams do come true.",
      "Known for my blistering pace and relentless pressing, I set a record by scoring in 11 consecutive Premier League games.",
      "Despite my late start at the top level, I became a key center forward, even helping my underdog team pull off one of the greatest title wins in football history.",
    ],
    answer: "Jamie Vardy",
  },
  {
    id: 50,
    category: "Who Am I?",
    hints: [
      "I am a strong and aggressive defender from Germany known for my relentless energy and tough tackling. I won multiple trophies in England, including a European title where I put in a dominant defensive display to help my team keep a clean sheet in the final.",
      "After that, I moved to Spain to join one of the biggest clubs in the world.",
      "In one famous moment, I wore a protective mask and still played fearlessly, earning praise for my warrior-like mentality.",
    ],
    answer: "Antonio Rudiger",
  },
  {
    id: 51,
    category: "Who Am I?",
    hints: [
      "I started my Premier League journey at a London club but made my name after leaving England for Germany.",
      "When I returned, I became one of the best midfielders in the league, known for my vision and pinpoint passing.",
      "I have won multiple league titles, and my link-up play with a certain Norwegian striker is feared by defenders.",
    ],
    answer: "Kevin De Bruyne",
  },
  {
    id: 52,
    category: "Who Am I?",
    hints: [
      "I struggled to make an impact in my first spell in England and had to prove myself in Italy.",
      "But when I returned, I became one of the deadliest wingers in football, breaking scoring records for my club and helping them to both domestic and European glory.",
      "I was also the first player in my club’s history to score 30+ goals in multiple Premier League seasons.",
    ],
    answer: "Mohamed Salah",
  },
  {
    id: 53,
    category: "Who Am I?",
    hints: [
      "I was born in Asia but became one of the Premier League's biggest stars.",
      "My speed, dribbling, and two-footed finishing have made me a nightmare for defenders.",
      "I won the Golden Boot without taking a single penalty, proving my lethal touch in front of goal.",
    ],
    answer: "Son Heung min",
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
    category: "Who Am I?",
    hints: [
      "I started my professional career in my home country before moving to the Premier League, where I played for a London club.",
      "After a slow start at my next club, I became a key part of one of football’s greatest midfields, winning multiple Champions League titles.",
      "In 2018, I became the first player in over a decade to break the Messi-Ronaldo dominance by winning the Ballon d'Or.",
    ],
    answer: "Luka Modric",
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
    category: "Who Am I?",
    hints: [
      "I am a Brazilian midfielder known for my tough tackles and ability to protect the defense.",
      "I won multiple Champions League titles with Real Madrid before moving to the Premier League.",
      "I spent a season on loan at FC Porto, where I gained valuable experience in European football.",
    ],
    answer: "Casemiro",
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
    category: "Who Am I?",
    hints: [
      "I was born in Germany and started my career at a club famous for its youth academy.",
      "I won my first Champions League title with a German club before moving to Spain, where I became a key part of a legendary midfield trio.",
      "I have lifted multiple UCL trophies and a World Cup, and I’m also remembered for a last-minute free-kick goal against Japan that kept my country’s hopes alive in a major tournament.",
    ],
    answer: "Tony Kroos",
  },
  {
    id: 62,
    category: "Who Am I?",
    hints: [
      "I am a Spanish midfielder known for my incredible dribbling and passing.",
      "I spent most of my career at Barcelona, where I won multiple league titles and Champions League trophies.",
      "My most famous moment came in 2010 when I scored the winning goal in the World Cup final for Spain.",
    ],
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
    category: "Who Am I?",
    hints: [
      "I was once the most expensive footballer in history.",
      "I am known for a stunning bicycle kick goal in a Champions League final.",
      "I started my career as a left-back but became a world-class winger. But off the pitch, some say I love golf more than football!",
    ],
    answer: "Gareth Bale",
  },
  {
    id: 72,
    category: "Who Said It?",
    quote: "Football, bloody hell!",
    answer: "Alex Ferguson",
  },
  {
    id: 73,
    category: "Who Said It?",
    quote: "Attack wins you games, defence wins you titles.",
    answer: "Alex Ferguson",
  },
  {
    id: 74,
    category: "Who Said It?",
    quote:
      "My greatest challenge was knocking Liverpool right off their f*****g perch.",
    answer: "Alex Ferguson",
  },
  {
    id: 75,
    category: "Who Said It?",
    quote:
      "Give me Zidane and 10 pieces of wood, and I'll win you the Champions League.",
    answer: "Alex Ferguson",
  },
  {
    id: 76,
    category: "Who Said It?",
    quote: "Let's talk about six, baby!",
    answer: "Jürgen Klopp",
  },
  {
    id: 77,
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
    answer: "Zlatan Ibrahimovic",
  },
  {
    id: 81,
    category: "Who Said It?",
    quote: "Sunday, the king plays.",
    answer: "Cristiano Ronaldo",
  },
  {
    id: 82,
    category: "Career Path Challenge",
    clubs: ["Liverpool", "Bayern Munich", "Al-Nassr"],
    status: "Playing",
    answer: "Sadio Mané",
  },
  {
    id: 83,
    category: "Career Path Challenge",
    clubs: ["Hull City", "Leicester City", "Manchester United"],
    status: "Playing",
    answer: "Harry Maguire",
  },
  {
    id: 84,
    category: "Career Path Challenge",
    clubs: [
      "Saint-Étienne",
      "Borussia Dortmund",
      "Arsenal",
      "Barcelona",
      "Chelsea",
      "Marseille",
    ],
    status: "Playing",
    answer: "Pierre-Emerick Aubameyang",
  },
  {
    id: 85,
    category: "Career Path Challenge",
    clubs: [
      "River Plate",
      "Real Madrid",
      "Napoli",
      "Juventus",
      "AC Milan",
      "Chelsea",
      "Inter Miami",
    ],
    status: "Retired",
    answer: "Gonzalo Higuaín",
  },
  {
    id: 86,
    category: "Career Path Challenge",
    clubs: ["Benfica", "Chelsea", "Atletico Madrid", "Chelsea", "AC Milan"],
    status: "Playing",
    answer: "Joao Felix",
  },
  {
    id: 87,
    category: "Career Path Challenge",
    clubs: [
      "Napoli",
      "Paris Saint-German",
      "Manchester United",
      "Valencia",
      "Boca Juniors",
    ],
    status: "Playing",
    answer: "Edinson Cavani",
  },
  // {
  //   id: 88,
  //   category: "Career Path Challenge",
  //   clubs: [
  //     "Napoli",
  //     "Paris Saint-German",
  //     "Manchester United",
  //     "Valencia",
  //     "Boca Juniors",
  //   ],
  //   status: "Playing",
  //   answer: "João Félix",
  // },
  {
    id: 89,
    category: "Career Path Challenge",
    clubs: ["Independiente", "Atletico Madrid", "Manchester City", "Barcelona"],
    status: "Retired",
    answer: "Sergio Aguero",
  },
  {
    id: 90,
    category: "Career Path Challenge",
    clubs: ["Genk", "Chelsea", "Wolfsburg", "Manchester City"],
    status: "Playing",
    answer: "Kevin De Bruyne",
  },
  {
    id: 91,
    category: "Who Am I?",
    hints: [
      "I started my professional career in England but left after struggling for game time. In Italy, I developed into one of the world’s best midfielders, winning multiple league titles.",
      "My performances earned me a return to my former club for a record transfer fee.",
      "I have also won international silverware, playing a key role in my country’s World Cup triumph.",
    ],
    answer: "Paul Pogba",
  },
  {
    id: 92,
    category: "Who Am I?",
    hints: [
      "I began my career in Germany before moving to one of the country’s biggest clubs.",
      "Known for my incredible reflexes and ability to play outside the box, I redefined the role of a modern goalkeeper.",
      "I have won multiple league titles, European trophies, and a World Cup, where I was awarded the tournament’s best goalkeeper.",
    ],
    answer: "Manuel Neuer",
  },
  {
    id: 92,
    category: "Who Am I?",
    hints: [
      "I began my career in Germany before moving to one of the country’s biggest clubs.",
      "Known for my incredible reflexes and ability to play outside the box, I redefined the role of a modern goalkeeper.",
      "I have won multiple league titles, European trophies, and a World Cup, where I was awarded the tournament’s best goalkeeper.",
    ],
    answer: "Manuel Neuer",
  },
  {
    id: 93,
    category: "Who Am I?",
    hints: [
      "I am an Italian goalkeeper who played for many years at one of the country’s biggest clubs.",
      "I won multiple league titles and was part of the team that lifted the World Cup in 2006.",
      "I also had a short spell in France before returning to my home club.",
    ],
    answer: "Gianluigi Buffon",
  },
  {
    id: 94,
    category: "Who Am I?",
    hints: [
      "I started my professional career in Brazil before moving to Europe, where I played in Italy before earning a big transfer to the Premier League.",
      "I became one of the best goalkeepers in the world, winning league titles and European trophies.",
      "I also scored a memorable last-minute goal in a league match, making history as the first goalkeeper to do so for my club.",
    ],
    answer: "Alisson Becker",
  },
  {
    id: 95,
    category: "Who Am I?",
    hints: [
      "I started my professional career in the Netherlands before moving to a smaller club in the Premier League, where I impressed with my dominant defending.",
      "This earned me a record-breaking transfer to one of the league’s biggest teams, where I became a leader and helped them win both domestic and European trophies.",
      "I was also the first defender in many years to come close to winning the Ballon d’Or.",
    ],
    answer: "Virgil van Dijk",
  },
];

const getRandomQuestions = (questions: Question[], num: number) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  console.log("Shuffled", shuffled.slice(0, num));
  return shuffled.slice(0, num);
};

const Quiz = observer(() => {
  const [tenQuestions, setTenQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timer, setTimer] = useState(30);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [showRules, setShowRules] = useState(true);
  let isAnswerCorrect = "";

  useEffect(() => {
    setTenQuestions(getRandomQuestions(questions, 10));
  }, []);

  const currentQuestion =
    tenQuestions.length > 0 ? tenQuestions[currentQuestionIndex] : null;

  useEffect(() => {
    if (!currentQuestion) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          handleSkipQuestion();
          return 30;
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

    if (currentQuestionIndex != 9) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      router.replace("/result");
    }
    setTimer(30);
  };

  useEffect(() => {
    console.log("Updated index is", currentQuestionIndex);
  }, [currentQuestionIndex]);

  const submitAnswer = () => {
    const correctAnswer = currentQuestion?.answer?.toLowerCase() || "";
    const userAnswerTrimmed = userAnswer.trim().toLowerCase();
    // const [firstName, lastName] = correctAnswer.split(" ");
    // const nameParts = correctAnswer.split(" ");

    // Split the correct answer into words
    const nameParts = correctAnswer.split(" ");
    const firstName = nameParts[0]; // First word
    const lastName = nameParts.slice(1).join(" "); // Everything else is the last name

    if (
      userAnswerTrimmed === correctAnswer || // Full name match
      userAnswerTrimmed === firstName || // First name match
      userAnswerTrimmed === lastName // Multi-word last name match (e.g., "De Bruyne")
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
      minHeight="100vh"
      textAlign="center"
      sx={{
        background: "linear-gradient(135deg, #006400, #00a000)",
        overflowY: "auto",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: "80%",
          maxWidth: 600,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
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
            Question {currentQuestionIndex + 1}/{10}
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

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your answer..."
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default Quiz;

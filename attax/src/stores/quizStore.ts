import { makeAutoObservable } from "mobx";

type UserResponse = {
  category: string;
  question: string | string[];
  userAnswer: string;
  correctAnswer: string;
  isAnswerCorrect: string;
};

class QuizStore {
  score = 0;
  userResponses: UserResponse[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setScore(newScore: number) {
    this.score = newScore;
  }

  addUserResponse(
    category: string,
    question: string | string[],
    userAnswer: string,
    correctAnswer: string,
    isAnswerCorrect: string
  ) {
    this.userResponses.push({
      category,
      question,
      userAnswer,
      correctAnswer,
      isAnswerCorrect,
    });
  }

  // Add a clear function
  clear() {
    this.userResponses = [];
    this.score = 0; // Reset score if needed
  }
}

const quizStore = new QuizStore();
export default quizStore;

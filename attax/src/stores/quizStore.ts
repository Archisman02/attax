import { makeAutoObservable } from "mobx";

type UserResponse = {
  category: string;
  // quote?: string;
  // clubs?: string[];
  // hints?: string[];
  question: string | string[];
  userAnswer: string;
  correctAnswer: string;
  // isCorrect: boolean;
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
    question: string,
    userAnswer: string,
    correctAnswer: string
    // isCorrect: boolean
  ) {
    this.userResponses.push({
      category,
      question,
      userAnswer,
      correctAnswer,
      // isCorrect,
    });
  }
}

const quizStore = new QuizStore();
export default quizStore;

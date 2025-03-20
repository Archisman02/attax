import { makeAutoObservable } from "mobx";

class QuizStore {
  score = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setScore(newScore: number) {
    this.score = newScore;
  }
}

const quizStore = new QuizStore();
export default quizStore;

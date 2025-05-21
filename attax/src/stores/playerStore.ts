import { makeAutoObservable } from "mobx";

class PlayerStore {
  playerOne: string;
  playerTwo: string;

  constructor() {
    this.playerOne = "";
    this.playerTwo = "";
    makeAutoObservable(this);
  }

  setPlayerOne(playerOne: string) {
    this.playerOne = playerOne;
  }

  setPlayerTwo(playerTwo: string) {
    this.playerTwo = playerTwo;
  }
}

const playerStore = new PlayerStore();
export default playerStore;

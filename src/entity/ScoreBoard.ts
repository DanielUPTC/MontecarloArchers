import { SCORE } from "../common/Values";

export class ScoreBoard {
  private total: number;
  private selectedTimes: number;
  private hasLuky: boolean;
  private scoreList: any[];
  constructor() {
    this.total = 0;
    this.selectedTimes = 0;
    this.hasLuky = false;
    this.scoreList = [];
  }

  public get getTotal(): number {
    return this.total;
  }
  public get getTimes(): number {
    return this.selectedTimes;
  }
  public get getHasLuky(): boolean {
    return this.hasLuky;
  }

  public set setTotal(total: number) {
    this.total = total;
  }
  public set setLucky(hasLuky: boolean) {
    this.hasLuky = hasLuky;
  }
  public set setTimes(selectedTimes: number) {
    this.selectedTimes = selectedTimes;
  }
  public addTimes() {
    this.selectedTimes++;
  }

  public addScore(score: SCORE | null, round: string, luckyShot = false) {
    if (score) this.scoreList.push({ score, round, luckyShot });
  }

  public get getScoreList(): {
    score: SCORE | null;
    round: string;
    luckyShot: boolean;
  }[] {
    return this.scoreList;
  }
}

import {
  COMPARE,
  FEMALE_SHOT,
  GENDER,
  GENDERS,
  MALE_SHOT
} from "../common/Values";
import { ScoreBoard } from "../entity/ScoreBoard";
const pushid = require("pushid");

export class Archer {
  private ORIGINAL_RESISTENCE;
  private individualScore = 0;
  private resistence: number;
  private exp: number;
  private lucky: number;
  private gender: GENDERS;
  private shot: COMPARE;
  private team: string;
  private plays: number;
  private scoreBoard: ScoreBoard;
  private individualWins: number = 0;
  constructor(team = "", resistence?: number, lucky?: number, exp = 10) {
    this.scoreBoard = new ScoreBoard();
    this.team = team + " " + pushid();
    this.ORIGINAL_RESISTENCE = resistence || 40;
    this.gender = Math.random() < 0.5 ? GENDER.MALE : GENDER.FEMALE;
    this.shot = this.gender === GENDER.MALE ? MALE_SHOT : FEMALE_SHOT;
    this.resistence = resistence || 40;
    this.exp = exp;
    this.lucky = lucky || 3;
    this.plays = 0;
  }

  public get getResistence(): number {
    return this.resistence;
  }

  public get getExp(): number {
    return this.exp;
  }

  public get getLucky(): number {
    return this.lucky;
  }

  public get getShot(): COMPARE {
    return this.shot;
  }

  public setLucky(lucky: number): void {
    this.lucky = lucky;
  }

  public get getIndividualScore(): number {
    return this.individualScore;
  }

  public setIndividualScore(individualScore: number): void {
    this.individualScore = individualScore;
  }

  public setResistence(resistence: number): void {
    this.resistence = resistence;
  }

  public addPlay() {
    this.plays++;
  }

  public resetResistence() {
    this.resistence = this.ORIGINAL_RESISTENCE;
  }

  public get getScoreBoard(): ScoreBoard {
    return this.scoreBoard;
  }

  public set setExp(exp: number) {
    this.exp = exp;
  }

  public get getIndividualWin(): number {
    return this.individualWins;
  }

  public plussWins() {
    this.individualWins++;
  }

  public showInfo() {
    console.log(`Equipo: ${this.team}
Genero: ${this.gender}
Resistencia: ${this.resistence}
Experiencia: ${this.exp}
suerte: ${this.lucky}`);
  }
}

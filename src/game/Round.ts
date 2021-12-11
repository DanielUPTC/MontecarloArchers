import { Archer } from "../entity/Archer";
import { TeamManager } from "../tools/TeamManager";
import { Rm } from "../tools/RandomManager";
import { COMPARE, SCORE } from "../common/Values";
const pushid = require("pushid");

export class Round {
  private ROUNDS_PER_GAME = 10;
  private FATIGUE = 5;
  private WIN_EXP = 3;
  private tm = new TeamManager();
  private archerA: Archer = new Archer();
  private archerB: Archer = new Archer();
  private rm: Rm = new Rm();

  constructor() {
    for (let index = 0; index < 100; index++) {
      for (let roundID = 0; roundID < this.ROUNDS_PER_GAME; roundID++) {
        this.playRound(pushid());
      }
      this.tm.resetTeamResistence(this.tm.getTemaA);
      this.tm.resetTeamResistence(this.tm.getTemaB);
    }
    this.showTeamWinner();
    this.showIndividualWinner();
  }

  private playRound(roundID: string): void {
    for (const player of this.tm.getTemaA) {
      const originalResistenceA = player.getResistence;
      while (player.getResistence >= this.FATIGUE) {
        player.setResistence(player.getResistence - this.FATIGUE);
        player.getScoreBoard.addScore(this.shoot(player.getShot), roundID);
      }
      player.setResistence(originalResistenceA - this.rm.getRm(1, 2));
    }

    for (const player of this.tm.getTemaB) {
      const originalResistenceA = player.getResistence;
      while (player.getResistence >= this.FATIGUE) {
        player.setResistence(player.getResistence - this.FATIGUE);
        player.getScoreBoard.addScore(this.shoot(player.getShot), roundID);
      }
      player.setResistence(originalResistenceA - this.rm.getRm(1, 2));
    }

    this.archerA = this.selectArcher(this.tm.getTemaA);
    this.archerA.getScoreBoard.addScore(
      this.shoot(this.archerA.getShot),
      roundID
    );
    this.archerA.getScoreBoard.addTimes();
    this.archerB = this.selectArcher(this.tm.getTemaB);
    this.archerB.getScoreBoard.addScore(
      this.shoot(this.archerB.getShot),
      roundID
    );
    this.archerB.getScoreBoard.addTimes();
    this.tm.resetTeamLucky(this.tm.getTemaA);
    this.tm.resetTeamLucky(this.tm.getTemaB);
    this.upgradeMVP(this.tm.getTemaA, roundID);
    this.upgradeMVP(this.tm.getTemaB, roundID);
  }

  private shoot(compare: COMPARE): SCORE | null {
    const shoot = this.rm.getRm(1, 100);
    let score = null;
    for (const val of compare) {
      if (shoot < val.PERCENTAGE) {
        score = val;
      }
    }
    return score;
  }

  private upgradeMVP(teamList: Archer[], roundID: any) {
    let score = 0;
    let individualScore = 0;
    for (const archer of teamList) {
      archer.setIndividualScore(0);
      individualScore = 0;
      for (const score of archer.getScoreBoard.getScoreList) {
        if (score.round === roundID && !score.luckyShot) {
          individualScore += score.score?.POINT || 0;
        }
      }
      archer.setIndividualScore(individualScore);
    }
    let winer = new Archer();
    for (const archer of teamList) {
      if (score < archer.getIndividualScore) {
        score = archer.getIndividualScore;
        winer = archer;
      }
    }
    winer.setExp = winer.getExp + this.WIN_EXP;
    winer.plussWins();
  }

  private showTeamWinner() {
    let totalTeamA = 0;
    let totalTeamB = 0;
    for (const arch of this.tm.getTemaA) {
      for (const points of arch.getScoreBoard.getScoreList) {
        totalTeamA += points.score?.POINT || 0;
      }
    }
    for (const arch of this.tm.getTemaB) {
      for (const points of arch.getScoreBoard.getScoreList) {
        totalTeamB += points.score?.POINT || 0;
      }
    }
    if (totalTeamA > totalTeamB) {
      this.showTeamPlayers(this.tm.getTemaA);
    } else {
      this.showTeamPlayers(this.tm.getTemaB);
    }
  }

  private showIndividualWinner() {
    let winerA = new Archer();
    let winerB = new Archer();
    let higger = 0;
    for (const arch of this.tm.getTemaA) {
      if (higger < arch.getIndividualWin) {
        higger = arch.getIndividualWin;
        winerA = arch;
      }
    }
    higger = 0;
    for (const arch of this.tm.getTemaB) {
      if (higger < arch.getIndividualWin) {
        higger = arch.getIndividualWin;
        winerB = arch;
      }
    }
    console.log("Ganador individual");

    if (winerA?.getIndividualWin > winerB?.getIndividualWin) {
      winerA.showInfo();
    } else {
      winerB.showInfo();
    }
  }

  private showTeamPlayers(teamList: Archer[]) {
    for (const arch of teamList) {
      arch.showInfo();
    }
  }

  private selectArcher(list: any[]) {
    let higger = 0;
    let selectArcher = new Archer();
    for (const archer of list) {
      if (higger < archer.getLucky) {
        higger = archer.getLucky;
        selectArcher = archer;
      }
    }
    return selectArcher;
  }
}

import { Archer } from "../entity/Archer";
const PRNG = require("prng");
export class TeamManager {
  private ran: any;
  private teamA: Archer[];
  private teamB: Archer[];
  constructor() {
    this.teamA = [];
    this.teamB = [];
    this.ran = new PRNG(Number(Math.random() * 1000));
    this.builtTeam(this.teamA, "Alpha");
    this.builtTeam(this.teamB, "Beta");
  }

  public get getTemaA(): Archer[] {
    return this.teamA;
  }

  public get getTemaB(): Archer[] {
    return this.teamB;
  }

  public resetTeamLucky(teamList: Archer[]): void {
    for (const archer of teamList) {
      archer.setLucky(Number((Math.random() * 4 + 1).toFixed(1)));
    }
  }

  public resetTeamResistence(teamList: Archer[]): void {
    for (const archer of teamList) {
      archer.resetResistence();
    }
  }

  private builtTeam(teamList: Archer[], team: string) {
    for (let index = 0; index < 6; index++) {
      teamList.push(
        new Archer(
          team,
          this.ran.rand(40, 50),
          Number((Math.random() * 4 + 1).toFixed(1))
        )
      );
    }
  }
}

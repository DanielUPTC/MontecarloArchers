const PRNG = require("prng");
export class Rm {
  private ran: any;
  public getRm(dw?: number, up?: number) {
    this.ran = new PRNG(Number(Math.random() * 1000));
    return this.ran.rand(dw, up);
  }
}

export type GENDERS = "Hombre" | "Mujer";
export const GENDER: { [_: string]: GENDERS } = {
  MALE: "Hombre",
  FEMALE: "Mujer"
};
export type SCORE = { POINT: number; PERCENTAGE: number };
export type COMPARE = SCORE[];
export const MALE_SHOT: COMPARE = [
  {
    POINT: 8,
    PERCENTAGE: 40
  },
  {
    POINT: 9,
    PERCENTAGE: 33
  },
  {
    POINT: 10,
    PERCENTAGE: 20
  },
  {
    POINT: 0,
    PERCENTAGE: 7
  }
];

export const FEMALE_SHOT: COMPARE = [
  {
    POINT: 9,
    PERCENTAGE: 38
  },
  {
    POINT: 10,
    PERCENTAGE: 30
  },
  {
    POINT: 8,
    PERCENTAGE: 27
  },
  {
    POINT: 0,
    PERCENTAGE: 5
  }
];

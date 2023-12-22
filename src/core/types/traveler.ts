export interface Traveler {
  id?: string | null;
  travelerId?: string;
  fullName: string;
  rg: string;
  rgValidUntil: string;
  rgIssuer: string;
  cpf: string;
  email: string;
  gender: string;
  birthDate: string;
}

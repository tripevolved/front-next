import { sendAnswers, sendAnswersByTravelerId } from "./answers";
import { getDestinations, getPublicDestinations } from "./destinations";
import { getQuestions } from "./questions";
import { getResult } from "./result";

export const ProfileApiService = {
  getDestinations,
  getPublicDestinations,
  getQuestions,
  sendAnswers,
  sendAnswersByTravelerId,
  getResult,
};

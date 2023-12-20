import { sendAnswers, sendAnswersByTravelerId } from "./answers";
import { getDestinations, getPublicDestinations, sendDestinationSuggestion } from "./destinations";
import { getQuestions } from "./questions";
import { getResult } from "./result";

export const ProfileApiService = {
  getDestinations,
  getPublicDestinations,
  getQuestions,
  sendAnswers,
  sendAnswersByTravelerId,
  getResult,
  sendDestinationSuggestion,
};

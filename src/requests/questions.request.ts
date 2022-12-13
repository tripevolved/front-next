import { newApiRequest } from "./api.request";
import { QuestionPages } from "@/models";

const api = newApiRequest();

export const getQuestions = async () =>
  api
    .get<QuestionPages>("questions")
    .then((result) => result.data)
    .catch((error) => ({ error: JSON.stringify(error) }));

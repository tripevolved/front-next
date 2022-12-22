import Repository from "./Repository";
import { QuestionPages } from "@/models";

class QuestionRepository {
	async getQuestions() {
		const response =  await Repository.get<QuestionPages>("/questions")
			.then((result) => result.data)
			.catch((error) => ({ error: JSON.stringify(error) }));
		
		return response;
	}
}

export default new QuestionRepository();

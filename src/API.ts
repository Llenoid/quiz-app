import { shuffleArray } from "./utils";

// type for each question that is retrieved
export type Question = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
}

// will use the type from the Question type but will add the answers object property to it and will create QuestionState type
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard",
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
	const endPoint = `https://opentdb.com/api.php?amount=${amount}&category=20&difficulty=${difficulty}&type=multiple`;
	// we use double await since we need to await to fetch the endpoint first then await to convert to json
	const data = await (await fetch(endPoint)).json();
	return data.results.map((question: Question) => (
		{
			...question,
			answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
		}
	));
};

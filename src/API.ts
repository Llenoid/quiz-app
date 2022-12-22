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
// category for the questions ranges from 9-32 so we make the max value 33 so 32 is included
var category = function(min:number,max:number) {
	return Math.floor(Math.random()*(max-min) + min);
};

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
<<<<<<< HEAD
	const endPoint = `https://opentdb.com/api.php?amount=${amount}&category=${category(9,33)}&difficulty=${difficulty}&type=multiple`;
=======
	const endPoint = `https://opentdb.com/api.php?amount=${amount}&category=23&difficulty=${difficulty}&type=multiple`;
>>>>>>> 2847631d4b94fb0e4d124735b7b3d52b3c0b59b7
	// we use double await since we need to await to fetch the endpoint first then await to convert to json
	const data = await (await fetch(endPoint)).json();
	return data.results.map((question: Question) => (
		{
			...question,
			answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
		}
	));
};

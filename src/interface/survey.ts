export type SurveyStatus = "DRAFT" | "PUBLIC" | "PRIVATE" | "CLOSED";
export type StatusCfg = { status: SurveyStatus, color: string };

export type QuestionType = "TEXT" | "SCALE" | "MULTIPLE_CHOICE" | "SINGLE_CHOICE";

export interface IAnswerOption {
    id: string;
    title: string;
    no: number;
}

export interface IQuestion {
    id: string;
    title: string;
    optional: boolean;
    no: number;
    type: QuestionType;
    answer_options: IAnswerOption[];
}
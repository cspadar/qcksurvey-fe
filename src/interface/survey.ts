export type SurveyStatus = "DRAFT" | "PUBLIC" | "PRIVATE" | "CLOSED";
export type StatusCfg = { status: SurveyStatus, color: string };

export type QuestionType = "TEXT" | "SCALE" | "MULTIPLE_CHOICE" | "SINGLE_CHOICE";
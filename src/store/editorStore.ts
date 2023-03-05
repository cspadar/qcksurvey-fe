import create from 'zustand';
import { QuestionType, SurveyStatus } from '../interface/survey';

interface IAnswerOption {
    id: string;
    title: string;
    no: number;
}

interface IQuestion {
    id: string;
    title: string;
    optional: boolean;
    no: number;
    type: QuestionType;
    answer_options: IAnswerOption[];
}

interface IEditorState {
    title: string;
    status: SurveyStatus;
    questions: IQuestion[];
    setTitle: (newTitle: string) => void;
    setStatus: (newStatus: SurveyStatus) => void;
}

export const useEditorState = create<IEditorState>((set) => ({
    title: "Survey title",
    status: "DRAFT",
    questions: [],
    setTitle: (newTitle: string) => set({ title: newTitle }),
    setStatus: (newStatus: SurveyStatus) => set({ status: newStatus })
}));
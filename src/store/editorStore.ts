import create from 'zustand';
import { QuestionType, SurveyStatus } from '../interface/survey';
import uuid from 'react-uuid';

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
    addQuestion: () => void;
    deleteQuestion: (qId: string) => void;
    updateQuestion: (qId: string, property: keyof IQuestion, value: any) => void;
    // moveQuestion: (qId: string, direction:MoveDirection) => void;
}

enum MoveDirection {
    Up = 1,
    Down
}

const EMPTY_QUESTION: IQuestion = { id: "", no: 1, answer_options: [], optional: false, title: "", type: 'TEXT' };

export const useEditorState = create<IEditorState>((set, get) => ({
    title: "Survey title",
    status: "DRAFT",
    questions: [],
    setTitle: (newTitle: string) => set({ title: newTitle }),
    setStatus: (newStatus: SurveyStatus) => set({ status: newStatus }),
    addQuestion: () => set((state: IEditorState) => ({ questions: [...state.questions, { ...EMPTY_QUESTION, id: uuid() }] })),
    deleteQuestion: (qId: string) => set((state: IEditorState) => ({ questions: state.questions.filter(q => q.id !== qId) })),
    updateQuestion: (qId: string, property: keyof IQuestion, value: any) => {
        const questions = get().questions;
        const toUpdate = questions.find(q => q.id === qId);
        if (!toUpdate) return;
        toUpdate[property] = value as never;
        const newArray = structuredClone(questions);
        set(() => ({ questions: newArray }));
    },
}));
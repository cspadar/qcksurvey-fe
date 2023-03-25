import create from 'zustand';
import { IAnswerOption, IQuestion, QuestionType, SurveyStatus } from '../interface/survey';
import uuid from 'react-uuid';

interface IEditorState {
    hasUnsavedChange: boolean;
    title: string;
    status: SurveyStatus;
    questions: IQuestion[];
    setTitle: (newTitle: string) => void;
    setStatus: (newStatus: SurveyStatus) => void;
    setQuestions: (newQuestions: IQuestion[]) => void;
    addQuestion: () => void;
    deleteQuestion: (qId: string) => void;
    updateQuestion: (qId: string, property: keyof IQuestion, value: any) => void;
    changeQuestionType: (qId: string, newType: QuestionType) => void;
    upsertAnswer: (qId: string, answerText: string, answerId?: string) => void;
    deleteAnswer: (qId: string, answerId: string) => void;
    // moveQuestion: (qId: string, direction:MoveDirection) => void;
}

enum MoveDirection {
    Up = 1,
    Down
}

const getEmptyQuestion = (): IQuestion => {
    return {
        id: uuid(),
        answer_options: [],
        no: 1,
        title: "",
        optional: true,
        type: "SINGLE_CHOICE"
    }
}

const getDefaultScaleAnswers = (): IAnswerOption[] => [
    { id: uuid(), no: 1, title: "1 - Strongly disagree" },
    { id: uuid(), no: 2, title: "2 - Disagree" },
    { id: uuid(), no: 3, title: "3 - Neutral" },
    { id: uuid(), no: 4, title: "4 - Agree" },
    { id: uuid(), no: 5, title: "5 - Strongly agree" },
];

export const useEditorState = create<IEditorState>((set, get) => ({
    hasUnsavedChange: true,
    title: "Survey title",
    status: "DRAFT",
    questions: [],

    setTitle: (newTitle: string) => set({ title: newTitle }),

    setStatus: (newStatus: SurveyStatus) => set({ status: newStatus }),

    setQuestions: (newQuestions: IQuestion[]) => set({ questions: newQuestions }),

    addQuestion: () => set((state: IEditorState) => ({
        questions: [
            ...state.questions,
            getEmptyQuestion()
        ]
    })),
    deleteQuestion: (qId: string) => set((state: IEditorState) => ({ questions: state.questions.filter(q => q.id !== qId) })),

    updateQuestion: (qId: string, property: keyof IQuestion, value: any) => {
        const questions = get().questions;
        const toUpdate = questions.find(q => q.id === qId);
        if (!toUpdate) return;
        toUpdate[property] = value as never;
        const newArray = [...questions];
        set(() => ({ questions: newArray }));
    },


    changeQuestionType: (qId: string, newType: QuestionType) => {
        const questions = get().questions;
        const toUpdate = questions.find(q => q.id === qId);
        if (!toUpdate) return;
        if (newType === "SCALE") {
            toUpdate.answer_options = getDefaultScaleAnswers();
        }
        else if (toUpdate.type === "SCALE") {
            toUpdate.answer_options = [];
        }
        toUpdate.type = newType;
        const newArray = [...questions];
        set(() => ({ questions: newArray }));
    },

    upsertAnswer: (qId: string, answerText: string, answerId?: string) => {
        const questions = get().questions;
        const toUpdateQuestion = questions.find(q => q.id === qId);
        if (!toUpdateQuestion) return;
        /* Add new empty answer*/
        if (!answerId) {
            toUpdateQuestion.answer_options.push({ id: uuid(), no: 1, title: answerText });
        }
        /* Update answer*/
        else {
            const answer = toUpdateQuestion.answer_options.find(a => a.id === answerId);
            if (!answer) return;
            answer.title = answerText;
        }
        const newArray = [...questions];
        set(() => ({ questions: newArray }))
    },

    deleteAnswer: (qId: string, answerId: string) => {
        const questions = get().questions;
        const toUpdateQuestion = questions.find(q => q.id === qId);
        if (!toUpdateQuestion) return;
        /* Add new empty answer*/
        const newAnswers = toUpdateQuestion.answer_options.filter(ao => ao.id !== answerId);
        toUpdateQuestion.answer_options = newAnswers;
        const newArray = [...questions];
        set(() => ({ questions: newArray }))
    }
}));
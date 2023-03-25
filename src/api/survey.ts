import { IQuestion } from '../interface/survey';
import axiosClient from '../utils/axiosClient';

interface ISurvey {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    status: string;
    createdBy: string;
    questions: IQuestion[];
}

const findAllMine = async () => {
    const response = await axiosClient.get<ISurvey[]>(`/survey`);
    return response.data;
}

const getSurvey = async (id: string) => {
    const response = await axiosClient.get<ISurvey>(`/survey/${id}`);
    return response.data;
}

const deleteSurvey = async (id: string) => {
    const response = await axiosClient.delete<ISurvey>(`/survey/${id}`);
    return response.data;
}

const SurveyService = {
    findAllMine,
    getSurvey,
    deleteSurvey
}

export default SurveyService;
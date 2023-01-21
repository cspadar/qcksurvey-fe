import axiosClient from '../utils/axiosClient';

interface ISurvey {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    status: string;
    createdBy: string;
}

const findAllMine = async () => {
    const response = await axiosClient.get<ISurvey[]>(`/survey`);
    return response.data;
}

const SurveyService = {
    findAllMine
}

export default SurveyService;
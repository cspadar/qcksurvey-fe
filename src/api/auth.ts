import axiosClient from '../utils/axiosClient';

interface ISignInResponse {
    email: string;
    access_token: string;
}

const signIn = async (email: string, password: string) => {
    const response = await axiosClient.post<ISignInResponse>(`/auth/signin`, { email, password });
    return response.data;
}

const signUp = async (email: string, password: string) => {
    const response = await axiosClient.post<ISignInResponse>(`/auth/signup`, { email, password });
    return response.data;
}

const AuthService = {
    signIn,
    signUp
}

export default AuthService;
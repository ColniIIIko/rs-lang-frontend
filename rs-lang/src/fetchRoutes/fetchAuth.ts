import { instance } from '../axios/axiosConfig';
import { FormLoginInputs, FormRegisterInputs } from '../pages/Auth/types';

type AuthResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export const fetchLogin = async (userData: FormLoginInputs): Promise<AuthResponse> => {
  const response = await instance.post<AuthResponse>('/signin', userData);
  return response.data;
};

export const fetchRegister = async (userData: FormRegisterInputs): Promise<FormRegisterInputs> => {
  const response = await instance.post<FormRegisterInputs>('/user', userData);

  return response.data;
};

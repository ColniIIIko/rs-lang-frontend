import { instance, removeToken } from '../axios/axiosConfig';
import { FormLoginInputs, FormRegisterInputs } from '../pages/Auth/types';

type AuthResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

type TokenResponse = {
  token: string;
  refreshToken: string;
};

type RegisterResponse = {
  id: string;
  email: string;
  name: string;
};

export const fetchIsTokenValid = async (user: AuthResponse) => {
  try {
    await instance.get<RegisterResponse>(`/users/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return user;
  } catch {
    const newTokens = await fetchToken(user);
    return { ...user, ...newTokens };
  }
};

export const fetchUser = async (userId: string): Promise<RegisterResponse | undefined> => {
  try {
    const response = await instance.get<RegisterResponse>(`/users/${userId}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchToken = async ({ refreshToken, userId }: AuthResponse): Promise<TokenResponse> => {
  removeToken();
  const response = await instance.get(`/users/${userId}/tokens`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return response.data;
};

export const fetchLogin = async (userData: FormLoginInputs): Promise<AuthResponse> => {
  const response = await instance.post<AuthResponse>('/signin', userData);
  return response.data;
};

export const fetchRegister = async (userData: FormRegisterInputs): Promise<RegisterResponse> => {
  const response = await instance.post<RegisterResponse>('/users', userData);

  return response.data;
};

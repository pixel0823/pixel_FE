import type { AxiosResponse } from "axios";
import axios from "axios";
import type { ResponseDto } from "./response";
import type { SignInRequestDto, SignUpRequestDto, IdCheckRequestDto } from "./request/auth";
import type { SignInResponseDto, SignUpResponseDto, IdCheckResponseDto } from "./response/auth";

const responseHandler = <T>(response: AxiosResponse<any, any>) => {
    const responseBody: T = response.data;
    return responseBody
};

const errorHandler = (error: any) => {
    if (!error.response || !error.response.data) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
};


const AUTH_API_DOMAIN = import.meta.env.VITE_AUTH_API_DOMAIN_ENV;

const SIGN_IN_URL = () => `${AUTH_API_DOMAIN}/sign-in`;
const SIGN_UP_URL = () => `${AUTH_API_DOMAIN}/sign-up`;
const ID_CHECK_URL = () => `${AUTH_API_DOMAIN}/id-check`;

export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(responseHandler<SignInResponseDto>)
        .catch(errorHandler);
    return result;
}

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(responseHandler<SignUpResponseDto>)
        .catch(errorHandler);
    return result;
}

export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_URL(), requestBody)
        .then(responseHandler<IdCheckResponseDto>)
        .catch(errorHandler);
    return result;
};
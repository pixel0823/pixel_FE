import InputBox from "@/components/InputBox";
import React, { type ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseCode, ResponseMessage } from "@/types/constants";
import type { ResponseBody } from "@/types";
import { useCookies } from "react-cookie";
import type { SignInResponseDto } from "@/apis/response/auth";
import type { SignInRequestDto } from "@/apis/request/auth";
import { signInRequest } from "@/apis";
import '@styles/pages/Auth/SignIn.css';

const SignIn: React.FC = () => {

    const idRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [Cookies, setCookie] = useCookies();

    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [message, setMessage] = useState<string>("");

    const navigate = useNavigate();

    const signInResponse = (responseBody: ResponseBody<SignInResponseDto>) => {
        if (!responseBody) return;

        const { code } = responseBody;
        if (code === ResponseCode.USER_NOT_FOUND) alert('아이디와 비밀번호를 입력하세요.');
        if (code === ResponseCode.SIGN_IN_FAIL) setMessage(ResponseMessage.SF);
        if (code === ResponseCode.DATABASE_ERROR) alert(ResponseMessage.DBE);
        if (code !== ResponseCode.SUCCESS) return;

        const { token, expirationTime } = responseBody as SignInResponseDto;

        const now = (new Date().getTime()) * 1000;
        const expires = new Date(now + expirationTime);

        setCookie(`accessToken`, token, { expires, path: '/' });
        navigate('/auth/sign-up');

    }

    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserId(value);
        setMessage('');
    };
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
        setMessage('');
    };

    const onSignUpButtonClickHandler = () => {
        navigate('/auth/sign-up');
    };
    const onSignInButtonClickHandler = () => {
        if (!userId || !password) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }
        const requestBody: SignInRequestDto = { userId, password };
        signInRequest(requestBody).then(signInResponse);
    };

    const onIdKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (!passwordRef.current) return;
        passwordRef.current.focus();
    };
    const onPasswordKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler();
    };


    return (
        <div id='sign-in-wrapper'>
            <div className='sign-in-container'>
                <div className='sign-in-box'>
                    <div className='sign-in-title'>
                        <div className='sign-in-content-box'>
                            <div className='sign-in-content-input-box'>
                                <InputBox ref={idRef} title="아이디" placeholder="아이디를 입력해주세요" type="text" value={userId} onChange={onIdChangeHandler} onKeyDown={onIdKeyDownHandler} />
                                <InputBox ref={passwordRef} title="비밀번호" placeholder="비밀번호를 입력해주세요" type="password" value={password} onChange={onPasswordChangeHandler} isErrorMessage message={message} onKeyDown={onPasswordKeyDownHandler} />
                            </div>
                            <div className='sign-in-content-button-box'>
                                <div className='primary-button-lg full-width' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                                <div className='text-link-lg full-width' onClick={onSignUpButtonClickHandler} >{'회원가입'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

};

export default SignIn;
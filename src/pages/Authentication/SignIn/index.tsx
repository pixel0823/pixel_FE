import InputBox from "@/components/InputBox";
import React, { type ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseCode, ResponseMessage } from "@/types/constants";
import type { ResponseBody } from "@/types";
import type { SignInResponseDto } from "@/apis/response/auth";
import type { SignInRequestDto } from "@/apis/request/auth";
import { signInRequest, getUserInfo } from "@/apis";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import '@styles/pages/Auth/SignIn.css';

const SignIn: React.FC = () => {

    const idRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [message, setMessage] = useState<string>("");

    const { setAccessToken } = useAuthStore.getState();
    const { setUser } = useUserStore.getState();

    const navigate = useNavigate();

    const signInResponse = async (responseBody: ResponseBody<SignInResponseDto>) => {
        if (!responseBody) return;

        const { code } = responseBody;
        if (code === ResponseCode.USER_NOT_FOUND) {
            alert('아이디와 비밀번호를 입력하세요.');
            return;
        }
        if (code === ResponseCode.SIGN_IN_FAIL) {
            setMessage(ResponseMessage.SF);
            return;
        }
        if (code === ResponseCode.DATABASE_ERROR) {
            alert(ResponseMessage.DBE);
            return;
        }
        if (code !== ResponseCode.SUCCESS) return;

        const { token, expirationTime } = responseBody as SignInResponseDto;

        const now = new Date().getTime();
        const expires = new Date(now + expirationTime);

        setAccessToken(token);

        try {
            const userInfo = await getUserInfo(token);
            setUser(userInfo); // 잊지 말고 user store에 저장
            console.log(userInfo);
            navigate('/home'); // 예시로 홈 이동
        } catch (error) {
            alert("사용자 정보 조회 중 오류가 발생했습니다.");
        }
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
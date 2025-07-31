import InputBox from "@/components/InputBox";
import React, { type ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseCode, ResponseMessage } from "@/types/constants";
import type { ResponseBody } from "@/types";
import { useCookies } from "react-cookie";
import type { SignInResponseDto } from "@/apis/response/auth";
import type { SignInRequestDto } from "@/apis/request/auth";
import { signInRequest } from "@/apis";


const SignUp: React.FC = () => {
    return(
        <div className="sign-up-wapper">ㅇㅇ</div>
    );

    
};

export default SignUp;
import ResponseCode from "./response-code";

type ResponseCodeType = typeof ResponseCode[keyof typeof ResponseCode];

const ResponseMessage: Record<ResponseCodeType, string> = {
    SU: '성공',
    DI: '중복된 아이디입니다.',
    SF: '로그인 정보가 일치하지 않습니다.',
    DBE: '데이터베이스 오류입니다.',
    UF: '사용자를 찾을 수 없습니다.',
};

export default ResponseMessage;
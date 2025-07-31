import { ResponseCode, ResponseMessage } from "@/types/constants";

type ResponseCodeType = typeof ResponseCode[keyof typeof ResponseCode];
type ResponseMessageType = typeof ResponseMessage[ResponseCodeType];

export default interface ResponseDto {
    code: ResponseCodeType;
    message: ResponseMessageType;
}
import type ResponseDto from "../response.dto";

export default interface SignInResponseDto extends ResponseDto {
    token: string;
    expirationTime: number;
}
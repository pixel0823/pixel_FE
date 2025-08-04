import type ResponseDto from "../response.dto";

export default interface UserInfoResponseDto extends ResponseDto {
    userId: string;
    nickname: string;
    email: string;
    profileImageUrl?: string;
}
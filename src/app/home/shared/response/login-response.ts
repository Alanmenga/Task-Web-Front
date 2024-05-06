export interface LoginResponse {
    csrfToken: string;
    message: string;
    sessionId: string;
    success: boolean;
    user_id: number;
}
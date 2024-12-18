export interface IRegisterUser {
    fullName?: string; socialType?: number; socialId?: string; email: string; 
}

export interface IUpdateUserData {
    fullName?: string;
    profileImage?: string;
    isDeleted?: boolean;
    boi?: string;
}

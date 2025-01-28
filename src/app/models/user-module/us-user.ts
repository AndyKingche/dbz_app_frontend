import { UsGender } from "./us-gender";
import { UsRole } from "./us-role";

export class UsUser {
    userId: number; 
    userIdentification: string; 
    userName: string; 
    userLastname: string; 
    userEmail: string; 
    userPassword: string; 
    userAddress: string; 
    userStatus: boolean; 
    gender: UsGender; 
    role: UsRole;
}
export interface UsuarioLogeado { 
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: "male" | "female",
    accessToken: string,    
}
export interface UserLoginData {
  usuEmail: string;
  usuSenha: string;
}

export interface User {
  usuId: number;
  usuNome: string;
  usuEmail: string;
  usuSenhaHash: string;
  usuAdm: boolean;
}

export interface UserLoginData {
  cliEmail: string;
  cliSenha: string;
}

export interface UserRegisterRequestBodyData {
  cliNome?: string;
  cliEmail?: string;
  cliSenha?: string;
  cliCpf?: string;
  cliRg?: string;
  cliDtNascimento?: string;
  cliAdm?: boolean;
}

export interface UserRegisterData {
  cliNome?: string;
  cliEmail: string;
  cliSenhaHash: string;
  cliCpf: string;
  cliRg?: string;
  cliDtNascimento?: string;
  cliAdm?: boolean;
}
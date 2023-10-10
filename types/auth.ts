export interface ClientLoginData {
  cliEmail: string;
  cliSenha: string;
}

export interface ClientRegisterRequestBodyData {
  cliNome?: string;
  cliEmail?: string;
  cliSenha?: string;
  cliCpf?: string;
  cliRg?: string;
  cliDtNascimento?: string;
  cliAdm?: boolean;
}

export interface ClientRegisterData {
  cliNome?: string;
  cliEmail: string;
  cliSenhaHash: string;
  cliCpf: string;
  cliRg?: string;
  cliDtNascimento?: string;
  cliAdm?: boolean;
}
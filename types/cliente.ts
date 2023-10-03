export interface Cliente {
    cliId?: number;
    cliNome?: string;
    cliEmail?: string;
    cliSenhaHash?: string;
    cliCpf?: string;
    cliRg?: null;
    cliDtNascimento?: string;
    cliAdm?: boolean;
}

export type GetClienteListResponse = Array<Cliente>;

export type CreateClienteRequestBody = Omit<Cliente, 'cliId'>;

export type UpdateClienteRequestBody = Cliente;

export interface Cliente {
    cliId?: number;
    cliNome?: string;
    cliEmail?: string;
    cliSenhaHash?: string;
    cliCpf?: string;
    cliRg?: string;
    cliDtNascimento?: string;
    cliAdm?: boolean;
}

export type GetClienteListResponse = Array<Cliente>;

export type CreateClienteRequestBody = Omit<Cliente, 'cliId'>;

export type UpdateClienteRequestBody = Cliente;

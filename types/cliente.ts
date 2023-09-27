export interface Cliente {
    cliId?: number;
    cliNome?: string;
    cliCpf?: string;
    cliRg?: null;
    cliDtNascimento?: string;
}

export type GetClienteListResponse = Array<Cliente>;

export type CreateClienteRequestBody = Omit<Cliente, 'cliId'>;

export type UpdateClienteRequestBody = Cliente;

export interface MetodoPagamento {
    metPagId: number;
    metPagNome: string;
}

export type GetMetodoPagamentoDropdownResponse = Array<{ value: number; label: string }>;

export type CreateMetodoPagamentoRequestBody = Omit<MetodoPagamento, 'metPagId'>;

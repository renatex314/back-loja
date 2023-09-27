export interface Marca {
    marcaId?: number;
    marcaNome?: string;
}

export type GetMarcaDropdownResponse = Array<{ value: number, label: string }>;

export type CreateMarcaRequestBody = Omit<Marca, 'marcaId'>;

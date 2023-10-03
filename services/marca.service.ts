import { getConnection } from "../controllers/db.controller"
import { CreateMarcaRequestBody, GetMarcaDropdownResponse, Marca } from "../types/marca";

const getMarcasDropdown = async () => {
  const connection = getConnection();

  try {
    const marcas: Array<Marca> = await connection
      .select()
      .from('marca');
  
    const dropdown: GetMarcaDropdownResponse = marcas.map((marca) => ({
      value: marca.marcaId as number,
      label: marca.marcaNome as string
    }));

    return dropdown;
  } catch (err) {   
    console.error(err);
    throw new Error('Erro ao listar o dropdown de marcas');
  }
}

const getMarca = async (marcaId: number) => {
  const connection = getConnection();

  try {
    const marca = await connection.select().from('marca').where({ marcaId }).first();

    return marca;
  } catch (err) {
    console.error(err);
    throw new Error('Erro ao retornar a marca');
  }
}

const createMarca = async (marcaData: CreateMarcaRequestBody) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .insert(marcaData)
      .into('marca')
      .transacting(trx);

    trx.commit();
  } catch (err) {
    trx.rollback();

    console.error(err);
    throw new Error('Erro ao criar marca');
  }
}

const deleteMarca = async (marcaId: number) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    await connection
      .delete()
      .from('marca')
      .where({ marcaId })
      .transacting(trx);

    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    throw new Error('Erro ao remover marca');
  }
}

export default {
  getMarcasDropdown,
  getMarca,
  createMarca,
  deleteMarca
}
import { RequestHandler } from "express";
import { getConnection } from "./db.controller";
import { CreateMarcaRequestBody, GetMarcaDropdownResponse, Marca } from "../types/marca";

const getMarcasDropdown: RequestHandler = async (req, res, next) => {
  const connection = getConnection();

  try {
    const marcas: Array<Marca> = await connection
      .select()
      .from('marca');

    const dropdown: GetMarcaDropdownResponse = marcas.map((marca) => ({
      value: marca.marcaId as number,
      label: marca.marcaNome as string
    }));

    res.json(dropdown);
  } catch (err) {
    console.error(err);

    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

const createMarca: RequestHandler = async (req, res, next) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const marcaData: CreateMarcaRequestBody = req.body;

    await connection
      .insert(marcaData)
      .into('marca')
      .transacting(trx);

    res.status(200).send('Marca criada com sucesso');
    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

const deleteMarca: RequestHandler = async (req, res, next) => {
  const connection = getConnection();
  const trx = await connection.transaction();

  try {
    const marcaId = parseInt(req.params.marcaId);

    if (Number.isNaN(marcaId)) {
      res.status(400).send('marcaId inválido')
    }

    await connection
      .delete()
      .from('marca')
      .where({ marcaId })
      .transacting(trx);

    res.status(200).send('Marca removida com sucesso');
    trx.commit();
  } catch (err) {
    console.error(err);

    trx.rollback();
    res.status(500).send('Ops, ocorreu um erro');
    next();
  }
}

export default { getMarcasDropdown, createMarca, deleteMarca };
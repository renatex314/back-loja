import { RequestHandler } from "express";
import marcaService from "../services/marca.service";
import { CreateMarcaRequestBody } from "../types/marca";

const getMarcasDropdown: RequestHandler = async (req, res, next) => {

  try {
    const dropdown = await marcaService.getMarcasDropdown();
    res.json(dropdown);
  } catch (err) {
    console.error(err);

    res.status(500).send(err);
    next();
  }
}

const getMarca: RequestHandler = async (req, res, next) => {
  try {
    const marcaId = parseInt(req.params.marcaId);

    if (Number.isNaN(marcaId)) {
      res.status(400).send('marcaId inválido');
    }

    const marca = await marcaService.getMarca(marcaId);
    res.status(200).send(marca);
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

const createMarca: RequestHandler = async (req, res, next) => {
  try {
    const marcaData: CreateMarcaRequestBody = req.body;
    await marcaService.createMarca(marcaData);

    res.status(200).send('Marca criada com sucesso');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    next();
  }
}

const deleteMarca: RequestHandler = async (req, res, next) => {
  try {
    const marcaId = parseInt(req.params.marcaId);

    if (Number.isNaN(marcaId)) {
      res.status(400).send('marcaId inválido');
    }

    await marcaService.deleteMarca(marcaId);

    res.status(200).send('Marca removida com sucesso');
  } catch (err) {
    res.status(500).send(err);
    next();
  }
}

export default { getMarcasDropdown, getMarca, createMarca, deleteMarca };
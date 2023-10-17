import { RequestHandler } from "express";
import { ClientLoginData, ClientRegisterRequestBodyData } from "../types/auth";
import bcrypt from "bcrypt";
import authService from "../services/auth.service";
import { decodeVerifyToken, generateToken } from "../utils";
import clienteService from "../services/cliente.service";
import { Cliente } from "../types/cliente";

const loginUser: RequestHandler = async (req, res) => {
  const userData: ClientLoginData = req.body;

  if (userData.cliEmail && userData.cliSenha) {
    const userDataFromDB = await authService.getUserDataByUsuEmail(
      userData.cliEmail.toLowerCase()
    );

    if (
      userDataFromDB &&
      bcrypt.compareSync(
        userData.cliSenha,
        userDataFromDB.cliSenhaHash as string
      )
    ) {
      const userToken = generateToken(userData.cliEmail);

      return res.status(200).send(userToken);
    }
  } else {
    return res.status(401).send("Email e/ou senha não informado(s)");
  }

  return res.status(401).send("Credenciais inválidas");
};

const registerUser: RequestHandler = async (req, res) => {
  const userData: ClientRegisterRequestBodyData = req.body;

  if (!userData?.cliEmail || !userData?.cliSenha || !userData?.cliCpf) {
    return res.status(400).send("É necessário fornecer E-mail, senha e CPF");
  }

  try {
    const cliSenhaHash = bcrypt.hashSync(userData.cliSenha, 10);
    await authService.registerUser({
      cliCpf: userData.cliCpf,
      cliEmail: userData.cliEmail,
      cliSenhaHash,
      cliAdm: userData.cliAdm,
      cliDtNascimento: userData.cliDtNascimento,
      cliNome: userData.cliNome,
      cliRg: userData.cliRg,
    });

    res.status(200).send(generateToken(userData.cliEmail));
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
};

const getClientMeData: RequestHandler = async (req, res) => {
  const token = req.headers?.authorization?.split(" ")?.[1] || "";

  try {
    const tokenData = decodeVerifyToken(token);

    const clientData: Cliente = await clienteService.getClienteByCliEmail(
      tokenData.usuEmail
    );

    delete clientData?.cliId;
    delete clientData?.cliSenhaHash;

    res.status(200).send(clientData);
  } catch (err) {
    console.error(err);

    res.status(500).send((err as Error)?.message);
  }
};

export default {
  loginUser,
  registerUser,
  getClientMeData,
};

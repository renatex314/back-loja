import { RequestHandler } from "express";
import { UserLoginData, UserRegisterRequestBodyData } from "../types/auth";
import bcrypt from 'bcrypt';
import authService from "../services/auth.service";
import { generateToken } from "../utils";

const loginUser: RequestHandler = async (req, res) => {
  const userData: UserLoginData = req.body;
  if (userData.cliEmail && userData.cliSenha) {
    const userDataFromDB = await authService.getUserDataByUsuEmail(userData.cliEmail.toLowerCase());

    if (userDataFromDB && bcrypt.compareSync(userData.cliSenha, userDataFromDB.cliSenhaHash as string)) {
      const userToken = generateToken(userData.cliEmail);

      return res.status(200).send(userToken);
    }
  } else {
    return res.status(401).send('Email e/ou senha não informado(s)');
  }

  return res.status(401).send('Credenciais inválidas');
}

const registerUser: RequestHandler = async (req, res) => {
  const userData: UserRegisterRequestBodyData = req.body;

  if (!userData?.cliEmail || !userData?.cliSenha || !userData?.cliCpf) {
    return res.status(400).send('É necessário fornecer E-mail, senha e CPF');
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
      cliRg: userData.cliRg
    });

    res.status(200).send(generateToken(userData.cliEmail));
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
}

export default {
  loginUser,
  registerUser
}
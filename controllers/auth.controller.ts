import { RequestHandler } from "express";
import { UserLoginData } from "../types/auth";
import * as jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authService from "../services/auth.service";

const loginUser: RequestHandler = async (req, res) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET || '';

  const userData: UserLoginData = req.body;
  if (userData.usuEmail && userData.usuSenha) {
    const userDataFromDB = await authService.getUserDataByUsuEmail(userData.usuEmail.toLowerCase());

    if (userDataFromDB && bcrypt.compareSync(userData.usuSenha, userDataFromDB.cliSenhaHash as string)) {
      const userToken = jsonwebtoken.sign(
        {
          usuEmail: userData.usuEmail
        }, 
        TOKEN_SECRET,
        {
          expiresIn: '1d'
        }
      );

      return res.status(200).send(userToken);
    }
  } else {
    return res.status(401).send('Email e/ou senha não informado(s)');
  }

  return res.status(401).send('Credenciais inválidas');
}

export default {
  loginUser
}
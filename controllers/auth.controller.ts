import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';

// const checkAuthorization: RequestHandler = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')?.[1];

//   if (!token) {
//     return res.status(400).send("O token não foi informado");
//   }

//   const decodedToken = jwt.verify(token, 'LOJA!@#', (err, decoded) => {
//     if (err) return res.status(500).send("Erro ao realizar a autenticação");

//     req
//   });

//   res.status(200).json();
// }

// export default { checkAuthorization }
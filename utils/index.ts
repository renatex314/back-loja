import * as jsonwebtoken from 'jsonwebtoken';

export const formatDate = (date: Date) => date.toISOString().replace('T', ' ').replace(/\.[0-9]+Z/g, '');

export const generateToken = (email: string) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;

  if (!TOKEN_SECRET) throw new Error('Não foi possível obter o TOKEN');
  
  return jsonwebtoken.sign(
    {
      usuEmail: email
    }, 
    TOKEN_SECRET,
    {
      expiresIn: '1d'
    }
  );
}

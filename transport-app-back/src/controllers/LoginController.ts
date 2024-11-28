import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
const crypto = require("crypto");


const prisma = new PrismaClient();

const LoginController = {
    
  login: async (req: Request, res: Response): Promise<Response> => {
    const { login, password } = req.body;
    try {
      let user = await prisma.user.findFirst({
        where: { email: String(login)},
      });
      

      console.log(user)

      if (!user) {
        return res.status(404).json({
            status: "error",
            message: "Usuário não encontrado",
        });
      }

      const isPasswordValid = (crypto.createHash('md5').update(String(password)).digest("hex") == user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
            status: "error",
            message: "Senha incorreta",
        });
      }

      return res.status(200).json({
        status: "success",
        data: {
            id: user?.id, 
            name: user?.name, 
            email: user?.email, 
            type: user?.userTypeId
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro Logar",
        error: error.message,
      });
    }
  },
  register: async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;
    try {
      let user = await prisma.user.create({
        data: {
          name: String(body.name),
          password: String(crypto.createHash('md5').update(String(body.password)).digest("hex")),
          email: String(body.email),
          userTypeId: 3
        }
      });

      console.log(user, user)
      return res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro salvar o usuário",
        error: error.message,
      });
    }
  },
};

export default LoginController;

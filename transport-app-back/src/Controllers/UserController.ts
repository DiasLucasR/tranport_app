import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const UserController = {

   index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const users: User[] = await prisma.user.findMany();
      return res.status(200).json({
        status: "success",
        message: "Usuários encontrados com sucesso",
        data: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao buscar os usuários",
        error: error.message,
      });
    }
  },


};

export default UserController;

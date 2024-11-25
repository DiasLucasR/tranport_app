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

  store: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email } = req.body;
      const newUser: User = await prisma.user.create({
        data: { name, email },
      });
      return res.status(201).json({
        status: "success",
        message: "Usuário criado com sucesso",
        data: newUser,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao criar o usuário",
        error: error.message,
      });
    }
  },


  update: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updatedUser: User = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });
      return res.status(200).json({
        status: "success",
        message: "Usuário atualizado com sucesso",
        data: updatedUser,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao atualizar o usuário",
        error: error.message,
      });
    }
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({
        status: "success",
        message: "Usuário deletado com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao deletar o usuário",
        error: error.message,
      });
    }
  },
};

export default UserController;

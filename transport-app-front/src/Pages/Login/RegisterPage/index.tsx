"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormLabel,
  Input,
} from "@mui/material";

import { Link } from "lucide-react";
import { AuthService } from "../../../Services/AuthService";
import { trackPromise } from "react-promise-tracker";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('');

  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if(urlParams.get('role') === 'driver'){
      setRole('2')
    }else if(urlParams.get('role') === 'passenger'){
      setRole('3')
    }
  }, [location]);

  const handleRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("As senhas não coincidem");
      return;
    }
    if(!password || !confirmPass || !name || !email){
      alert("Preencha todos os campos!");
      return;
    }
    trackPromise(AuthService.register({name, email, password, role}));
    navigate('/login')
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="text-2xl text-center">Criar Conta</p>
      </CardHeader>
      <CardContent className="flex justify-center">
        
        <form onSubmit={handleRegistro} className="space-y-4 w-[60%]">
          <span className=" flex row gap-[2%]">
            <div className="space-y-2 w-[49%]">
              <FormLabel htmlFor="nome">Nome Completo</FormLabel>
              <br />
              <Input
                id="nome"
                className="w-full"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 w-[49%]">
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <br />
              <Input
                id="email"
                className="w-full"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </span>
          <span className=" flex row gap-[2%]">
            <div className="space-y-2 w-[49%]">
              <FormLabel htmlFor="senha">Senha</FormLabel>
              <br />
              <Input
                id="senha"
                className="w-full"
                type="password"
                placeholder="Crie uma senha forte"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 w-[49%]">
              <FormLabel htmlFor="confirmarSenha">Confirmar Senha</FormLabel>
              <br />
              <Input
                id="confirmarSenha"
                className="w-full"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
            </div>
          </span>
          <Button type="submit" className="w-full border bg-green-300 hover:bg-green-400">
            Registrar
          </Button>
        </form>
      </CardContent>
      <CardHeader className="justify-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </CardHeader>
    </Card>
  );
}

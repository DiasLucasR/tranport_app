"use client"

import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, FormLabel, Input } from '@mui/material'

import { Link } from 'lucide-react'

export default function RegistroScreen() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const handleRegistro = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de registro
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem')
      return
    }
    console.log('Registro com:', nome, email, senha)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <p className="text-2xl text-center">Criar Conta</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegistro} className="space-y-4">
          <div className="space-y-2">
            <FormLabel htmlFor="nome">Nome Completo</FormLabel>
            <Input 
              id="nome" 
              type="text" 
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <FormLabel htmlFor="senha">Senha</FormLabel>
            <Input 
              id="senha" 
              type="password" 
              placeholder="Crie uma senha forte"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <FormLabel htmlFor="confirmarSenha">Confirmar Senha</FormLabel>
            <Input 
              id="confirmarSenha" 
              type="password" 
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Registrar</Button>
        </form>
      </CardContent>
      <CardHeader className="justify-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </CardHeader>
    </Card>
  )
}


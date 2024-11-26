import { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, TextField, Box, Typography, Checkbox, FormLabel } from '@mui/material'
import { useAuth } from '../../../Contexts/UserContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberme, setRememberme] = useState(false)
  const navigate = useNavigate();

  const { login } = useAuth() 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if(await login(username, password, rememberme)){
      navigate('/home')
    }
  }

  return (
    <Box className="flex justify-center items-center min-h-screen bg-slate-400 ">
      <Card className="w-full max-w-md shadow-lg ">
        <CardHeader className="text-center">
          <Typography variant="h4">Login</Typography>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <TextField
                id="username"
                label="Usuário"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <TextField
                id="password"
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <FormLabel>
            <Checkbox onChange={e => setRememberme(e.target.checked)} />  Lembrar de mim
            </FormLabel>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-2"
            >
              Entrar
            </Button>
          </form>
          <div className="mt-4 text-center flex justify-between">
          <Link to="/register?role=driver" className="text-sm text-blue-600 hover:underline">
              Registre-se como motorista
            </Link>
            <Link to="/register?role=passenger" className="text-sm text-blue-600 hover:underline">
              Registre-se como passageiro
            </Link>
          </div>
        </CardContent>
      </Card>
    </Box>
  )
}
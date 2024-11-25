
import { useState } from 'react'
import { Card, CardContent, CardHeader,  CardActions } from '@mui/material'
import { Button } from '@mui/material'
import { Avatar } from '@mui/material'
import { MapPin, Navigation, Phone, Star, Clock, DollarSign } from 'lucide-react'

export default function RideScreen() {
  const [isRideStarted, setIsRideStarted] = useState(false)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <title>Sua viagem</title>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <img
            src="/placeholder.svg?height=250&width=500"
            alt="Mapa da viagem"
            className="object-cover"
          />
          <div className="absolute bottom-2 left-2 flex items-center space-x-2 rounded-full bg-white/90 px-2 py-1 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Rua Exemplo, 123</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar alt="Motorista" src="/placeholder.svg?height=40&width=40" />
          <div>
            <h3 className="font-semibold">João Motorista</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 stroke-yellow-400" />
              <span>4.8</span>
            </div>
          </div>
          <Button variant="outlined" size="small" className="ml-auto">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>Tempo estimado: 15 min</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4" />
            <span>Preço estimado: R$ 25,00</span>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button 
          className="w-full" 
          onClick={() => setIsRideStarted(!isRideStarted)}
        >
          {isRideStarted ? (
            <>
              <Navigation className="mr-2 h-4 w-4" />
              Finalizar viagem
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Iniciar viagem
            </>
          )}
        </Button>
      </CardActions>
    </Card>
  )
}
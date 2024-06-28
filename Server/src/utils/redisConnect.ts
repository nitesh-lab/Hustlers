import { createClient } from "redis"

export const client=createClient({
  password: (process.env.REDIS_PW)!,
  socket: {
    host: (process.env.REDIS_HOST)!,
    port: parseInt(process.env.REDIS_PORT!)||13528
  }
});

client.on('error', (err) => console.log(err))

if (!client.isOpen) {
  client.connect()
}

 

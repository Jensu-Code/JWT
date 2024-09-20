import app from './app.js'
import { PORT_SERVER } from './config.js';

app.listen(PORT_SERVER,()=>{console.log(`listen on port: http://localhost:${PORT_SERVER}`)} );
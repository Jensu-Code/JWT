import app from "./app.js";
import { PORT_SERVER } from "./config.js";

async function main() {
  try {
    app.listen(PORT_SERVER, () => {
      console.log(`Escuchando en el puerto: http://localhost:${PORT_SERVER}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
}

main();

// reference: https://www.npmjs.com/package/dotenv
const fs = require("node:fs");
const NO_FILE_OR_DIRECTORY_ERROR = "ENOENT";
//Como value para evitar '"string"'
const getRidOffDoubleQuotes = (string) => string.replace(/^"(.*)"$/, "$1");

function config(options = {}) {
  //el path va a ser '.env' o el que este dentro de options.path
  //valorar primero si se puede acceder a path dentro de options
  const path = options?.path ?? ".env";
  //intentamos leer el archivo si no existe no hacemos nada
  try {
    /**
     * El que sea sincrono es para poder leer primero y añadir las
     * variables de entorno al process.env. Al ser sincrono bloquearia toda
     * posible ejecucion que necesitase de el valor de esas variables
     */
    const textContent = fs.readFileSync(path, "utf-8");
    //dividir en saltos de linea
    const envVariablesEntriesArray = textContent.split("\n");
    for (const envVariableEntry of envVariablesEntriesArray) {
      const [key, value] = envVariableEntry.split("=");
      //realmente solo deberia de hacerlo para los que tienen double quotes
      process.env[key] = getRidOffDoubleQuotes(value);
    }
  } catch (err) {
    if ((err.code = NO_FILE_OR_DIRECTORY_ERROR)) {
      return;
    }
  }
}

module.exports = { config };

# Utiliza una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

RUN npm run build

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]

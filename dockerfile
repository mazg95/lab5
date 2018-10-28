#################################################################
# Dockerfile para configurar aplicacion Node. JS Express 
#################################################################


# Imagen BASE
FROM node

# METADATA
LABEL maintainer="mazg95@live.com"
LABEL version="1.0"

# Crear directorio de trabajo
RUN mkdir -p /opt/app

# Establece directorio de trabajo
WORKDIR /opt/app

#Copia la aplicacion
COPY /lab5 .

RUN cd lab5

# Instala los paquetes existentes en el package.json
# Dependencias de la app
RUN npm install --quiet

# Instalar Nodemon para reiniciar el servidor al haber cambios.
RUN npm install nodemon -g --quiet


EXPOSE 8000

CMD nodemon -L --watch . app.js

# **Instalar dependencias**
## Ionic
    npm install -g @ionic/cli
## Dependencias usadas en el proyecto
    npm install 

# **Inicializar proyecto**
## Comando para inicializar el proyecto
      ionic serve
## Archivo raiz
      /src/index.html

#### Una ver arranca al proyecto se conecta el LogIn que esta en
      /src/app/pages/auth/auth.page.html

# **Diseño de la base de datos Firebase**
## Estructura:
      firebase_proyect
          |->user
          |   |-email: string
          |   |-name: string
          |   |-uid: string
          |
          |->publication
              |-description: string[]
              |-id: string
              |-image: string
              |-ingedient: {string:string}
              |-name: string
              |-time: string

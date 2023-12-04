# Projeto de Mobile

## Instalação e Inicialização

1. Clone o repositório do projeto em sua máquina local

```bash
git clone https://github.com/alcbcoelho/pi-mobile.git
```

2. Em outro diretório, clone o repositório do backend em sua máquina local

```bash
git clone https://github.com/alissons-repos/pi-mobile-backend.git
```

3. Instale as dependências em cada um dos diretórios (frontend e backend)

```bash
npm install

# ou

npx expo install (no caso do frontend do mobile)
```

4. No diretório do backend, execute

```bash
npx prisma generate

# em seguida

npm run start:dev
```

5. No diretório do front, execute

```bash
npx expo start
```

### Colaboradores:

-   Alisson Silva dos Santos - 2214290086
-   André Luís Costa Bandeira Coêlho - 2124290028
-   Pedro Henrique da Silveira Rocha - 2124290005
-   Stefany Ferreira da Silva - 2214290056

### Variáveis de Ambiente do frontend de Mobile (.env.local):

```
ACCESS_TOKEN_SECRET = 40acffd68adb0b6e95ffd2859abd93c60aa0010220875f41355b72ecb7a8440a35b95bfb3bbaaa6319973469d397a05cb2bf102ccada8e9d40c86ec783fcb7f4

REFRESH_TOKEN_SECRET = ae0ef388b6890282575bef76d44486fafce3a9768f8050bd73423831172d2e23b03ffcf1c937615d133da0bdd58ac528f7df7d64a056c7d56e5708eab15ef322

DATABASE_URL = mongodb+srv://<>:<>@thecluster.rf7trvj.mongodb.net/Meu-Amigo-PET-2?retryWrites=true&w=majority

PORT = 3500
```

### Variáveis de Ambiente do backend de Mobile (.env):

```
DATABASE_URL = "mongodb+srv://alisson3366:336699@thecluster.rf7trvj.mongodb.net/Santo-Pulinho?retryWrites=true&w=majority"

JWT_SECRET = "<}A(FPGvn?GSFtS&U.$Y]0(y\Mu./-T"

SUPABASE_URL = "https://yikpqjokhyceqwgtezef.supabase.co"

SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpa3Bxam9raHljZXF3Z3RlemVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTI3NTg5OSwiZXhwIjoyMDE0ODUxODk5fQ.D8jWpAsHRYZSTfh59oAf1-slpk7fhWIM2HhuAk4Wldk"
```

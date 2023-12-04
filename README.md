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
EXPO_PUBLIC_IP_ADDRESS="10.0.2.2"
```

### Variáveis de Ambiente do backend de Mobile (.env):

```
DATABASE_URL = "mongodb+srv://alisson3366:336699@thecluster.rf7trvj.mongodb.net/Santo-Pulinho?retryWrites=true&w=majority"

JWT_SECRET = "<}A(FPGvn?GSFtS&U.$Y]0(y\Mu./-T"

SUPABASE_URL = "https://yikpqjokhyceqwgtezef.supabase.co"

SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpa3Bxam9raHljZXF3Z3RlemVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTI3NTg5OSwiZXhwIjoyMDE0ODUxODk5fQ.D8jWpAsHRYZSTfh59oAf1-slpk7fhWIM2HhuAk4Wldk"
```

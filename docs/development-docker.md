# Ambiente de desenvolvimento com Docker

O Compose na Factory define apenas PostgreSQL, backend e frontend. A Factory não precisa de imagem própria. O serviço de banco pode iniciar agora. O backend ainda precisa do `pyproject.toml`, `uv.lock`, dependências e objeto `src.main:app` fornecidos pelo scaffold do proprietário. O frontend precisa do `package.json` e `package-lock.json` após aprovação do roadmap. O perfil `app` evita tentar construir aplicações ainda não prontas.

Na raiz da Factory:

```powershell
docker compose up -d db
docker compose --profile app up --build
```

`.env.example` documenta variáveis. `.env` contém valores locais e está ignorado pelo Git. A senha do banco deve corresponder à senha na `DATABASE_URL`. Como PostgreSQL conserva seus dados no volume `postgres_data`, mudar a senha em `.env` não altera a senha de um banco já inicializado. Nunca publicar `.env` nem colocar chaves de provedores em variáveis `VITE_`.

## Volume do banco

`postgres_data` é o único volume. Ele mantém os dados do PostgreSQL quando o container é recriado. Sem ele, o banco de desenvolvimento seria descartável. Persistência local não substitui backup.

Backend e frontend são copiados para suas imagens durante o build, sem montagens de código ou de `node_modules`. Depois de editar qualquer uma das aplicações, execute novamente `docker compose --profile app up --build` para reconstruir as imagens. Não há recarga automática de alterações feitas no host.

Quando os projetos tiverem manifests, confirmar a instalação de dependências, o nome do objeto FastAPI e o script Vite, e ajustar Dockerfiles se o scaffold do proprietário usar convenções diferentes. Docker CLI 29.9.2 e Compose 5.6.1 foram localizados e `docker compose config --quiet` passou. O motor Docker ainda não respondeu após iniciar o Desktop, portanto a construção das imagens e a subida do banco ainda precisam de validação prática.

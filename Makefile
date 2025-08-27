# Define variáveis para os nomes dos arquivos docker-compose
# DOCKER_COMPOSE_PATH = ./infra/docker
DOCKER_COMPOSE_PROD = ./infra/docker/docker-compose.yml
DOCKER_COMPOSE_DEV = ./infra/docker/docker-compose.dev.yml

# Fornece ajuda e documentação sobre os alvos disponíveis
help:
	@echo "-----------------------------------"
	@echo "Comandos Make disponíveis:"
	@echo "-----------------------------------"
	@echo "dev        - Inicia o ambiente de desenvolvimento."
	@echo "prod       - Inicia o ambiente de produção."
	@echo "down       - Para e remove os containers e redes."
	@echo "restart    - Reinicia os containers do ambiente de desenvolvimento."
	@echo "sh         - Acessa o bash do container de desenvolvimento."
	@echo "build-dev  - Constrói a imagem para desenvolvimento."
	@echo "build-prod - Constrói a imagem para produção."
	@echo "clean      - Remove as imagens e containers para uma limpeza completa."
	@echo "logs	      - Exibe os logs dos containers."
	@echo "help       - Exibe esta mensagem de ajuda."

# -----------------
# Alvos de Execução
# -----------------

dev:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) up --build -d

prod:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) up --build -d

down:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) down -v

restart:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) restart

sh:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) exec api sh

# ----------------
# Alvos de Build
# ----------------

build-dev:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) build

build-prod:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) build

# ----------------
# Alvo de Monitoramento
# ----------------

logs:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) logs -f

# ----------------
# Alvo de Limpeza
# ----------------

clean:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) down --volumes --rmi all

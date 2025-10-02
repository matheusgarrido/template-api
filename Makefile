# Define variáveis para os nomes dos arquivos docker-compose
# DOCKER_COMPOSE_PATH = ./infra/docker
DOCKER_COMPOSE_PROD = ./infra/docker/docker-compose.yml
DOCKER_COMPOSE_DEV = ./infra/docker/docker-compose.dev.yml
DATABASE_CONFIG = ./infra/database/config.js
DATABASE_MIGRATIONS = ./infra/database/migrations
DATABASE_SEEDERS = ./infra/database/seeders

# Fornece ajuda e documentação sobre os alvos disponíveis
help:
	@echo "-----------------------------------"
	@echo "Comandos Make disponíveis:"
	@echo "-----------------------------------"
	@echo "dev			- Inicia o ambiente de desenvolvimento."
	@echo "prod	   		- Inicia o ambiente de produção."
	@echo "down-dev   	- Para e remove os containers de desenvolvimento."
	@echo "down-prod  	- Para e remove os containers de produção."
	@echo "down	 		- Para os containers de ambos os ambientes (dev e prod)."
	@echo "restart		- Reinicia os containers do ambiente de desenvolvimento."
	@echo "sh	 		- Acessa o bash do container de desenvolvimento."
	@echo "build-dev  	- Constrói a imagem para desenvolvimento."
	@echo "build-prod 	- Constrói a imagem para produção."
	@echo "clean	  	- Remove as imagens e containers para uma limpeza completa."
	@echo "logs	   		- Exibe os logs dos containers de desenvolvimento."
	@echo "help	   		- Exibe esta mensagem de ajuda."

# -----------------
# Alvos de Execução
# -----------------

dev:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) up --build -d
	$(MAKE) migrate-dev

prod:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) up --build -d

# --------------------
# Alvos de Interrupção
# --------------------

down-dev:
	@echo "Parando ambiente de desenvolvimento..."
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) down -v --remove-orphans --timeout 0
	$(MAKE) kill-docker-proxy

down-prod:
	@echo "Parando ambiente de produção..."
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) down -v --remove-orphans --timeout 0
	$(MAKE) kill-docker-proxy

kill-docker-proxy:
	@echo "Verificando processos docker-proxy na porta 3000..."
	@-if command -v lsof >/dev/null 2>&1; then \
		PIDS=$$(lsof -ti:3000 2>/dev/null || true); \
		if [ -n "$$PIDS" ]; then \
			echo "Finalizando processos na porta 3000: $$PIDS"; \
			echo $$PIDS | xargs -r sudo kill -9 2>/dev/null || true; \
		else \
			echo "Nenhum processo encontrado na porta 3000"; \
		fi; \
	else \
		echo "lsof não disponível, usando método alternativo..."; \
		if ps aux | grep -q "[d]ocker-proxy.*3000"; then \
			sudo pkill -f "docker-proxy.*3000" 2>/dev/null || true; \
			echo "Processos docker-proxy finalizados"; \
		else \
			echo "Nenhum processo docker-proxy encontrado"; \
		fi; \
	fi

down:
	$(MAKE) down-dev
	$(MAKE) down-prod
	$(MAKE) kill-docker-proxy

restart:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) restart

sh:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) exec api sh

stop-all:
	@echo "Parando containers da API..."
	-docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) down -v
	@echo "Verificando containers restantes..."
	-docker ps -a | grep api | awk '{print $$1}' | xargs -r docker rm -f
	@echo "Verificando processos Node locais na porta 3000..."
	-@lsof -i :3000 | awk 'NR>1 {print $$2}' | xargs -r kill -9
	@echo "Aplicação finalizada."

# ----------------
# Mata processos Node que estejam usando a porta 3000
# ----------------
kill:
	@echo "Procurando processos na porta 3000..."
	@if command -v netstat >/dev/null 2>&1; then \
		echo "Usando netstat para encontrar processos..."; \
		netstat -tulpn | grep :3000 | awk '{print $$7}' | cut -d'/' -f1 | xargs -r sudo kill -9 2>/dev/null || true; \
	elif command -v ss >/dev/null 2>&1; then \
		echo "Usando ss para encontrar processos..."; \
		ss -lptn 'sport = :3000' | awk -F\"pid=\" '{print $$2}' | cut -d',' -f1 | xargs -r sudo kill -9 2>/dev/null || true; \
	else \
		echo "Netstat e ss não disponíveis. Tentando lsof..."; \
		lsof -ti:3000 | xargs -r sudo kill -9 2>/dev/null || true; \
	fi
	@echo "Processos na porta 3000 finalizados."	@echo "Procurando processos Node na porta 3000..."
	@lsof -i :3000 | awk 'NR>1 {print $$2}' | xargs -r sudo kill -9
	@echo "Todos os processos Node na porta 3000 foram finalizados."


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

status:
	@echo "📊 Containers:"
	docker ps -a
# 	docker ps -a --filter "name=party-stories"
	@echo ""
	@echo "🌐 Networks:"
	docker network ls --filter "name=party-stories"
	@echo ""
	@echo "📦 Volumes:"
	docker volume ls --filter "name=party-stories"

# ----------------
# Alvo de Limpeza
# ----------------

clean:
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) down --volumes --rmi all

# ----------------
# Alvos de Banco de Dados
# ----------------

migrate-dev:
	docker compose --env-file ./.env \
		-f $(DOCKER_COMPOSE_PROD) \
		-f $(DOCKER_COMPOSE_DEV) \
		exec api npx ts-node -O '{"module":"CommonJS"}' ./node_modules/.bin/sequelize-cli db:migrate \
			--migrations-path $(DATABASE_MIGRATIONS) --config $(DATABASE_CONFIG)

migration-undo-dev:
	docker compose --env-file ./.env \
		-f $(DOCKER_COMPOSE_PROD) \
		-f $(DOCKER_COMPOSE_DEV) \
		exec api npx ts-node -O '{"module":"CommonJS"}' ./node_modules/.bin/sequelize-cli db:migrate:undo \
			--migrations-path $(DATABASE_MIGRATIONS) --config $(DATABASE_CONFIG)

migration-reset-dev:
	docker compose --env-file ./.env \
		-f $(DOCKER_COMPOSE_PROD) \
		-f $(DOCKER_COMPOSE_DEV) \
		exec api npx ts-node -O '{"module":"CommonJS"}' ./node_modules/.bin/sequelize-cli db:migrate:undo:all \
			--migrations-path $(DATABASE_MIGRATIONS) --config $(DATABASE_CONFIG)
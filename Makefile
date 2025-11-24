.PHONY: dev prod sh down-dev down-prod kill-docker-proxy down restart stop-all kill \
		build-dev build-prod logs status clean migrate-dev migration-undo-dev \
		migration-reset-dev test help

# Define variáveis para os nomes dos arquivos docker-compose
# DOCKER_COMPOSE_PATH = ./infra/docker
DOCKER_COMPOSE_PROD = ./infra/docker/docker-compose.yml
DOCKER_COMPOSE_DEV = ./infra/docker/docker-compose.dev.yml
DATABASE_CONFIG = ./infra/database/config.js
DATABASE_MIGRATIONS = ./infra/database/migrations
DATABASE_SEEDERS = ./infra/database/seeders

# -----------------
# Alvos de Execução
# -----------------

dev: ## Inicia o ambiente de desenvolvimento.
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) up --build -d
	$(MAKE) migrate-dev

prod: ## Inicia o ambiente de produção.
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) up --build -d

sh: ## Acessa o bash do container de desenvolvimento.
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) exec api sh

# --------------------
# Alvos de Interrupção
# --------------------

down-dev: ## Para e remove os containers de desenvolvimento.
	@echo "Parando ambiente de desenvolvimento..."
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) down -v --remove-orphans --timeout 0
	$(MAKE) kill-docker-proxy

down-prod: ## Para e remove os containers de produção.
	@echo "Parando ambiente de produção..."
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) down -v --remove-orphans --timeout 0
	$(MAKE) kill-docker-proxy

kill-docker-proxy: ## Mata processos docker-proxy que estejam usando a porta 3000
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

down: ## Para os containers de ambos os ambientes (dev e prod).
	$(MAKE) down-dev
	$(MAKE) down-prod
	$(MAKE) kill-docker-proxy

restart: ## Reinicia os containers do ambiente de desenvolvimento.
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) restart

stop-all: ## Para todos os containers da API e mata processos Node locais na porta 3000
	@echo "Parando containers da API..."
	-docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) down -v
	@echo "Verificando containers restantes..."
	-docker ps -a | grep api | awk '{print $$1}' | xargs -r docker rm -f
	@echo "Verificando processos Node locais na porta 3000..."
	-@lsof -i :3000 | awk 'NR>1 {print $$2}' | xargs -r kill -9
	@echo "Aplicação finalizada."

# ----------------
# Mata processos que estejam usando a porta especificada (padrão: 3000)
# Use: make kill PORT=8080
# ----------------
kill: ## Mata processos que estejam usando a porta especificada (padrão: 3000).
	@echo "Procurando processos na porta $(PORT)..."
	@if command -v lsof >/dev/null 2>&1; then \
		lsof -ti:$(PORT) | xargs -r sudo kill -9 2>/dev/null || true; \
	elif command -v netstat >/dev/null 2>&1; then \
		netstat -tulpn | grep :$(PORT) | awk '{print $$7}' | cut -d'/' -f1 | xargs -r sudo kill -9 2>/dev/null || true; \
	elif command -v ss >/dev/null 2>&1; then \
		ss -lptn 'sport = :$(PORT)' | awk -F\"pid=\" '{print $$2}' | cut -d',' -f1 | xargs -r sudo kill -9 2>/dev/null || true; \
	fi
	@echo "Processos na porta $(PORT) finalizados."


# ----------------
# Alvos de Build
# ----------------

build-dev: ## Constrói a imagem para desenvolvimento.
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) build

build-prod: ## Constrói a imagem para produção.
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) build

# ----------------
# Alvo de Monitoramento
# ----------------

logs: ## Exibe os logs dos containers de desenvolvimento.
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) -f $(DOCKER_COMPOSE_DEV) logs -f

status: ## Exibe o status dos containers, redes e volumes relacionados ao projeto.
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

clean: ## Remove as imagens e containers para uma limpeza completa.
	docker compose --env-file ./.env -f $(DOCKER_COMPOSE_PROD) down --volumes --rmi all

# ----------------
# Alvos de Banco de Dados
# ----------------

migrate-dev: ## Executa as migrações do banco de dados no ambiente de desenvolvimento.
	docker compose --env-file ./.env \
		-f $(DOCKER_COMPOSE_PROD) \
		-f $(DOCKER_COMPOSE_DEV) \
		exec api npx ts-node -O '{"module":"CommonJS"}' ./node_modules/.bin/sequelize-cli db:migrate \
			--migrations-path $(DATABASE_MIGRATIONS) --config $(DATABASE_CONFIG)

migration-undo-dev: ## Desfaz a última migração do banco de dados no ambiente de desenvolvimento.
	docker compose --env-file ./.env \
		-f $(DOCKER_COMPOSE_PROD) \
		-f $(DOCKER_COMPOSE_DEV) \
		exec api npx ts-node -O '{"module":"CommonJS"}' ./node_modules/.bin/sequelize-cli db:migrate:undo \
			--migrations-path $(DATABASE_MIGRATIONS) --config $(DATABASE_CONFIG)

migration-reset-dev: ## Desfaz todas as migrações do banco de dados no ambiente de desenvolvimento.
	docker compose --env-file ./.env \
		-f $(DOCKER_COMPOSE_PROD) \
		-f $(DOCKER_COMPOSE_DEV) \
		exec api npx ts-node -O '{"module":"CommonJS"}' ./node_modules/.bin/sequelize-cli db:migrate:undo:all \
			--migrations-path $(DATABASE_MIGRATIONS) --config $(DATABASE_CONFIG)

# ----------------
# Alvos de Testes
# ----------------

test: ## Executa os testes automatizados.
	docker compose --env-file ./.env \
		-f $(DOCKER_COMPOSE_PROD) \
		-f $(DOCKER_COMPOSE_DEV) \
		exec api npm run test -- $(name) --verbose


test-coverage: ## Executa os testes automatizados com cobertura.
	docker compose --env-file ./.env \
		-f $(DOCKER_COMPOSE_PROD) \
		-f $(DOCKER_COMPOSE_DEV) \
		exec api npm run test:cov

# ----------------
# Alvos de Suporte
# ----------------

help: ## Exibe esta mensagem de ajuda
	@echo "--------------------------"
	@echo "Comandos Make disponíveis:"
	@echo "--------------------------"
	@awk '\
		BEGIN { FS=":.*##"; printf "" } \
		/^# Alvos de/ { \
			section = substr($$0, 2); \
			gsub(/^ +| +$$/, "", section); \
			printf "\n%s\n", section; \
			printf "%s\n", "--------------------------"; \
		} \
		/^[a-zA-Z0-9_-]+:.*##/ { \
			target = $$1; \
			desc = $$2; \
			gsub(/^[ \t]+|[ \t]+$$/, "", desc); \
			printf "%-25s %s\n", target, desc; \
		}' Makefile
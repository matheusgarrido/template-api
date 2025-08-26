#!/bin/bash

# Atualiza pacotes do sistema
sudo apt update && sudo apt upgrade -y

# Verifica se o Node/NPM estão instalados
if ! command -v node &> /dev/null; then
  echo "Node.js não encontrado. Instale com: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs"
  exit 1
fi

# Lê os pacotes do arquivo, remove caracteres de retorno de carro e junta tudo em uma linha
GLOBAL_PACKAGES=$(cat "$(dirname "$0")/global-packages.txt" | tr -d '\r' | xargs)

# Imprime a lista de pacotes
echo "📦 Pacotes globais que serão instalados:"
echo "$GLOBAL_PACKAGES" | tr ' ' '\n'
echo -e "\n"

# Imprime o comando que será executado (para debug)
echo "👓 Comando a ser executado: "
echo "npm install -g $GLOBAL_PACKAGES"
echo -e "\n"

echo "🔄 Instalando pacotes globais..."

# Instala os pacotes globais. A remoção das aspas é fundamental.
npm install -g $GLOBAL_PACKAGES

echo "✅ Processo de instalação finalizada (sucesso não validado)"
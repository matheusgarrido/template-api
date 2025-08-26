#!/bin/bash
# Script de inicialização para configurar o ambiente de deploy

# Saia imediatamente se um comando falhar
set -e

# Nome do usuário de deploy (pode ser passado como variável de ambiente ou parâmetro)
DEPLOY_USER="deployer"

# Chave pública SSH (será passada de forma segura via AWS, por exemplo)
# A variável AWS_USER_GITHUB_DEPLOYER_PUBKEY deve ser definida no seu ambiente de deploy
AWS_USER_GITHUB_DEPLOYER_PUBKEY=$AWS_USER_GITHUB_DEPLOYER_PUBKEY

# 1. Crie o usuário de deploy se ele não existir
if id "$DEPLOY_USER" &>/dev/null; then
    echo "Usuário '$DEPLOY_USER' já existe. Pulando a criação."
else
    echo "Criando o usuário '$DEPLOY_USER'..."
    adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi

# 2. Crie e configure o diretório .ssh para o usuário
echo "Configurando o diretório .ssh..."
HOME_DIR="/home/$DEPLOY_USER"
SSH_DIR="$HOME_DIR/.ssh"
AUTHORIZED_KEYS_FILE="$SSH_DIR/authorized_keys"

if [ ! -d "$SSH_DIR" ]; then
    mkdir -p "$SSH_DIR"
    chmod 700 "$SSH_DIR"
fi

# 3. Adicione a chave pública ao authorized_keys se ela não existir
if ! grep -q "$AWS_USER_GITHUB_DEPLOYER_PUBKEY" "$AUTHORIZED_KEYS_FILE"; then
    echo "Adicionando a chave pública..."
    echo "$AWS_USER_GITHUB_DEPLOYER_PUBKEY" >> "$AUTHORIZED_KEYS_FILE"
    chmod 600 "$AUTHORIZED_KEYS_FILE"
else
    echo "Chave pública já existe no arquivo."
fi

# 4. Ajuste as permissões de propriedade
echo "Ajustando as permissões..."
chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$HOME_DIR"

echo "Configuração inicial do ambiente de deploy concluída!"
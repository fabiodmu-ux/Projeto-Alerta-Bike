# 🚲 Alerta Bike - Sistema de Rastreabilidade e Segurança

Bem-vindo ao repositório oficial do **Alerta Bike**, um Produto Mínimo Viável (MVP) desenvolvido para combater o furto de bicicletas e a receptação na região de Itajaí - SC. 

Este projeto cria uma rede colaborativa de proteção, permitindo que ciclistas registrem o chassi de suas bicicletas, disparem alertas de furto em tempo real e que compradores ou agentes de segurança pública (Polícia Militar) consultem a procedência de um veículo instantaneamente.

## 🛠️ Tecnologias Utilizadas

A arquitetura do projeto segue o padrão Cliente-Servidor (API RESTful), garantindo um tempo de resposta rápido (inferior a 1.5s em redes 4G).
* **Linguagem:** Python 3.12
* **Back-end/API:** FastAPI
* **Validação de Dados:** Pydantic
* **Segurança e Hashes:** Passlib
* **Banco de Dados:** SQLite (com suporte a ferramentas como DBeaver/SQLiteStudio)
* **Servidor Local:** Uvicorn
* **Front-end (Interface):** HTML5, CSS3, JavaScript e Bootstrap 5 (Mobile-First)

---

## ⚙️ Pré-requisitos

Antes de iniciar a instalação, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
1. **Python 3.12** ou superior (adicione o Python ao `PATH` durante a instalação).
2. **Git** para clonar o repositório.
3. Um editor de código de sua preferência (recomendamos o **Visual Studio Code**).

---

## 🚀 Passo a Passo de Instalação e Execução

Siga rigorosamente os passos abaixo para configurar o ambiente de desenvolvimento e rodar a API na sua máquina local:

### Passo 1: Clonar o Repositório
Abra o terminal (Prompt de Comando, PowerShell ou terminal do VS Code) e clone o projeto do GitHub:
```bash
git clone [https://github.com/fabiodmu-ux/alerta-bike.git](https://github.com/fabiodmu-ux/alerta-bike.git)
cd alerta-bike

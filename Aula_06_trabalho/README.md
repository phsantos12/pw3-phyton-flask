# 🔥 Naruto World 🔥

Um sistema web completo inspirado no universo de Naruto, desenvolvido com Flask e integração com APIs de anime.

## 🍃 Sobre o Projeto

Este projeto é uma transformação completa de um sistema de jogos para um sistema temático do anime Naruto. Inclui:

- **CRUD de Personagens**: Gerenciamento completo de personagens do universo Naruto
- **CRUD de Vilas**: Sistema para gerenciar as vilas ocultas
- **API Integration**: Integração com a API do MyAnimeList para dados oficiais
- **Interface Moderna**: Design responsivo com tema visual inspirado em Naruto

## 🚀 Funcionalidades

### 👥 Gerenciamento de Personagens
- Cadastro de personagens com informações detalhadas
- Edição e exclusão de registros
- Paginação de resultados
- Campos: Nome, Vila, Jutsu Principal, Rank, Elemento

### 🏘️ Gerenciamento de Vilas
- Cadastro de vilas ocultas
- Informações sobre países e Kages
- Sistema CRUD completo

### 🌐 API de Naruto
- Integração com API do MyAnimeList (Jikan)
- Listagem de personagens oficiais
- Informações detalhadas com imagens
- Dados de dubladores (seiyuu)

## 🛠️ Tecnologias Utilizadas

- **Backend**: Flask (Python)
- **Banco de Dados**: SQLite (com SQLAlchemy)
- **Frontend**: HTML, CSS, Bootstrap 5
- **API**: MyAnimeList API (via Jikan)
- **Dependências**: Flask-SQLAlchemy, Requests

## 📦 Instalação

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd naruto-world
```

2. **Instale as dependências**:
```bash
pip install -r requirements.txt
```

3. **Execute o aplicativo**:
```bash
python app.py
```

4. **Acesse no navegador**:
```
http://localhost:5000
```

## 🗂️ Estrutura do Projeto

```
naruto-world/
├── app.py                 # Arquivo principal do Flask
├── requirements.txt       # Dependências do projeto
├── naruto_world.db       # Banco de dados SQLite
├── controllers/
│   └── routes.py         # Rotas e lógica da aplicação
├── models/
│   └── database.py       # Modelos de dados (Personagem, Vila)
├── static/
│   ├── css/
│   │   └── style.css     # Estilos customizados
│   ├── js/               # JavaScript (se necessário)
│   └── imgs/             # Imagens do projeto
└── views/
    ├── base.html         # Template base
    ├── index.html        # Página inicial
    ├── personagens.html  # Lista de personagens
    ├── cadpersonagens.html # Cadastro de personagens
    ├── personagensestoque.html # CRUD de personagens
    ├── editpersonagem.html # Edição de personagens
    ├── vilasestoque.html # CRUD de vilas
    ├── editvila.html     # Edição de vilas
    ├── apinaruto.html    # Lista da API
    └── personagemInfo.html # Detalhes da API
```

## 🎨 Design e Interface

- **Tema Visual**: Inspirado no universo Naruto
- **Cores**: Gradientes laranja/vermelho (cores do protagonista)
- **Responsivo**: Funciona em dispositivos móveis e desktop
- **Animações**: Efeitos hover e transições suaves
- **Ícones**: Emojis temáticos para melhor UX

## 🔌 API Utilizada

### MyAnimeList API (via Jikan)
- **Endpoint**: `https://api.jikan.moe/v4/anime/20/characters`
- **Dados**: Personagens oficiais de Naruto
- **Informações**: Nome, imagem, role, dubladores
- **Gratuita**: Sem necessidade de API key

## 📊 Banco de Dados

### Tabela: Personagem
- `id` (Primary Key)
- `nome` (String)
- `vila` (String)
- `jutsu_principal` (String)
- `rank` (String)
- `elemento` (String)

### Tabela: Vila
- `id` (Primary Key)
- `nome` (String)
- `pais` (String)
- `kage` (String)

## 🎯 Funcionalidades Principais

1. **Página Inicial**: Apresentação do sistema com cards de navegação
2. **Lista de Personagens**: Visualização e adição de ninjas famosos
3. **Cadastro Simples**: Formulário para adicionar personagens
4. **CRUD Completo**: Gerenciamento avançado com banco de dados
5. **API Integration**: Dados oficiais do MyAnimeList
6. **Gerenciamento de Vilas**: Sistema completo para vilas ocultas

## 🔧 Configuração

O sistema usa SQLite por padrão, não requerendo configuração adicional de banco de dados. Para usar MySQL:

1. Instale PyMySQL: `pip install PyMySQL`
2. Configure as credenciais no `app.py`
3. Altere a URI do banco de dados

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure um servidor WSGI (Gunicorn, uWSGI)
2. Use um servidor web (Nginx, Apache)
3. Configure variáveis de ambiente
4. Use um banco de dados mais robusto (PostgreSQL, MySQL)

## 📝 Licença

Este projeto é para fins educacionais. Todos os direitos sobre Naruto pertencem aos seus respectivos proprietários.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Adicionar novos personagens/vilas

---

**🍃 Dattebayo!** - Desenvolvido com paixão pelo universo de Naruto!

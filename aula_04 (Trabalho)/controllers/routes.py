from flask import render_template, request, redirect, url_for
from models.database import Game, Console, db
# Lista de jogadores
jogadores = ['Miguel José', 'Miguel Isack', 'Leaf',
             'Quemario', 'Trop', 'Aspax', 'maxxdiego']

# Array de objetos - Lista de games
gamelist = [{'Título': 'CS-GO',
            'Ano': 2012,
             'Categoria': 'FPS Online'}]


def init_app(app):
    # Criando a primeira rota do site
    @app.route('/')
    # Criando função no Python
    def home():
        return render_template('index.html')

    # Rota de games
    @app.route('/games', methods=['GET', 'POST'])
    def games():
        game = gamelist[0]
        # Tratando se a requisição for do tipo POST
        if request.method == 'POST':
            # Verificar se o campo 'jogador' existe
            if request.form.get('jogador'):
                # O append adiciona o item a lista
                jogadores.append(request.form.get('jogador'))
            return redirect(url_for('games'))

        jogos = ['Jogo 1', 'Jogo 2', 'Jogo 3', 'Jogo 4', 'Jogo 5', 'Jogo 6']
        return render_template('games.html',
                               game=game,
                               jogadores=jogadores,
                               jogos=jogos)
    
    # Rota de cadastro de jogos (em dicionário)
    @app.route('/cadgames', methods=['GET', 'POST'])
    def cadgames():
        if request.method == 'POST':
            if request.form.get('titulo') and request.form.get('ano') and request.form.get('categoria'):
                gamelist.append({'Título' : request.form.get('titulo'), 'Ano' : request.form.get('ano'), 'Categoria' : request.form.get('categoria')})
            return redirect(url_for('cadgames'))
        return render_template('cadgames.html',
                               gamelist=gamelist)

    #Rota de Estoque (CRUD)
    @app.route('/estoqueGames', methods=['GET', 'POST'])
    @app.route('/estoqueGames/<int:id>')
    def estoqueGames(id=None):
        if id:
            # buscando o jogo pela id
            jogo = Game.query.get(id)
            if jogo:
                # deletando o jogo
                db.session.delete(jogo)
                db.session.commit()
            return redirect(url_for('estoqueGames'))

        # Verificando se a requisição é POST:
        if request.method == 'POST' and request.form.get("CadastrarJogo") == "true":
            # cadastrando o novo jogo
            novoJogo = Game(
                request.form['titulo'],
                request.form['ano'],
                request.form['categoria'],
                request.form['plataforma'],
                request.form['preco'],
                request.form['quantidade']
            )
            # Enviando para o banco
            db.session.add(novoJogo)
            # Confirmando as alterações
            db.session.commit()
            return redirect(url_for('estoqueGames'))
        
        # fazendo um SELECT no banco (pegando todos os jogos da tabela)
        gamesestoque = Game.query.all()
        return render_template('estoqueGames.html', gamesestoque=gamesestoque)

    @app.route('/Consoles', methods=['GET', 'POST'])
    @app.route('/Consoles/<int:id>')
    def Consoles(id=None):
        if id:
            # buscando o console pela id
            console = Console.query.get(id)
            if console:
                # deletando o console
                db.session.delete(console)
                db.session.commit()
            return redirect(url_for('Consoles'))

        # Verificando se a requisição é POST:
        if request.method == 'POST' and request.form.get("CadastrarConsole") == "true":
            # cadastrando o novo console
            novoConsole = Console(
                request.form['nome'],
                request.form['fabricante'],
                request.form['preco'],
                request.form['quantidade']
            )
            # Enviando para o banco
            db.session.add(novoConsole)
            # Confirmando as alterações
            db.session.commit()
            return redirect(url_for('Consoles'))
        
        # fazendo um SELECT no banco (pegando todos os consoles da tabela)
        consolesestoque = Console.query.all()
        return render_template('Consoles.html', consolesestoque=consolesestoque)
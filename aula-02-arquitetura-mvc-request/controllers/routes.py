from flask import render_template, request

jogadores = ['Midna', 'Vt', 'Leaf',
                    'Quemario', 'Trop', 'Aspax', 'maxxdiego']
        


def init_app(app):
    # Criando a primeira rota do site
    @app.route('/')
    # Criando função do python
    def home():
        return render_template('index.html')


    @app.route('/games', methods=['GET','POST'])
    def games():
        # Dicionario em Python
        game = {
            'Titulo': 'CS-GO',
            'Ano': 2012,
            'Categoria': 'FPS Online'
        }

     
        #tratndo se a requisisção for do tipo POST
        if request.method == 'POST':
            #verificar se o campo jogador existe
            if request.form.get('jogador'):
                #O append adiciona o item a lista
                jogadores.append(request.form.get('jogador'))
        
        jogos = ['GTA V', 'Valorant', 'Elden Ring',
                'Sekiro', 'Free Fire', 'Mad Max', 'Dying Light']
        return render_template("games.html", game=game, jogadores=jogadores, jogos=jogos)

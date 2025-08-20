from flask import render_template, request, url_for, redirect
from models.database import db, Personagem, Vila
import requests
import json

# Lista de ninjas famosos
ninjas = ['Naruto Uzumaki', 'Sasuke Uchiha', 'Sakura Haruno', 
          'Kakashi Hatake', 'Itachi Uchiha', 'Jiraiya', 'Tsunade']

# Lista de personagens
personagens_list = [{'nome': 'Naruto Uzumaki', 'vila': 'Konoha', 'jutsu': 'Rasengan', 'rank': 'Hokage'}]

def init_app(app):
    @app.route('/')
    def home():
        return render_template('index.html')

    @app.route('/personagens', methods=['GET', 'POST'])
    def personagens():
        personagem = personagens_list[0]

        if request.method == 'POST':
            if request.form.get('ninja'):
                ninjas.append(request.form.get('ninja'))
                return redirect(url_for('personagens'))
        return render_template('personagens.html',
                               personagem=personagem,
                               ninjas=ninjas)

    @app.route('/cadpersonagens', methods=['GET', 'POST'])
    def cadpersonagens():
        if request.method == 'POST':
            if request.form.get('nome') and request.form.get('vila') and request.form.get('jutsu'):
                personagens_list.append({
                    'nome': request.form.get('nome'), 
                    'vila': request.form.get('vila'), 
                    'jutsu': request.form.get('jutsu')
                })
                return redirect(url_for('cadpersonagens'))

        return render_template('cadpersonagens.html',
                               personagens_list=personagens_list)

    # CRUD PERSONAGENS - LISTAGEM, CADASTRO E EXCLUSÃO
    @app.route('/personagens/estoque', methods=['GET', 'POST'])
    @app.route('/personagens/estoque/delete/<int:id>')
    def personagensEstoque(id=None):
        if id:
            personagem = Personagem.query.get(id)
            # Deleta o personagem cadastrado pela ID
            db.session.delete(personagem)
            db.session.commit()
            return redirect(url_for('personagensEstoque'))
        # Cadastra um novo personagem
        if request.method == 'POST':
            newpersonagem = Personagem(
                request.form['nome'], 
                request.form['vila'], 
                request.form['jutsu_principal'],
                request.form['rank'],
                request.form['elemento']
            )
            db.session.add(newpersonagem)
            db.session.commit()
            return redirect(url_for('personagensEstoque'))
        else:
            # Captura o valor de 'page' que foi passado pelo método GET
            # Define como padrão o valor 1 e o tipo inteiro
            page = request.args.get('page', 1, type=int)
            # Valor padrão de registros por página (definimos 3)
            per_page = 3
            # Faz um SELECT no banco a partir da pagina informada (page)
            # Filtrando os registro de 3 em 3 (per_page)
            personagens_page = Personagem.query.paginate(page=page, per_page=per_page)
                       
            return render_template('personagensestoque.html', personagensestoque=personagens_page)

    # CRUD PERSONAGENS - EDIÇÃO
    @app.route('/personagens/edit/<int:id>', methods=['GET', 'POST'])
    def personagemEdit(id):
        p = Personagem.query.get(id)
        # Edita o personagem com as informações do formulário
        if request.method == 'POST':
            p.nome = request.form['nome']
            p.vila = request.form['vila']
            p.jutsu_principal = request.form['jutsu_principal']
            p.rank = request.form['rank']
            p.elemento = request.form['elemento']
            db.session.commit()
            return redirect(url_for('personagensEstoque'))
        return render_template('editpersonagem.html', p=p)

    # CRUD VILAS - LISTAGEM, CADASTRO E EXCLUSÃO
    @app.route('/vilas/estoque', methods=['GET', 'POST'])
    @app.route('/vilas/estoque/delete/<int:id>')
    def vilasEstoque(id=None):
        if id:
            vila = Vila.query.get(id)
            # Deleta a vila cadastrada pela ID
            db.session.delete(vila)
            db.session.commit()
            return redirect(url_for('vilasEstoque'))
        # Cadastra uma nova vila
        if request.method == 'POST':
            newvila = Vila(request.form['nome'], request.form['pais'], request.form['kage'])
            db.session.add(newvila)
            db.session.commit()
            return redirect(url_for('vilasEstoque'))
        else:
            # Captura o valor de 'page' que foi passado pelo método GET
            # Define como padrão o valor 1 e o tipo inteiro
            page = request.args.get('page', 1, type=int)
            # Valor padrão de registros por página (definimos 3)
            per_page = 3
            # Faz um SELECT no banco a partir da pagina informada (page)
            # Filtrando os registro de 3 em 3 (per_page)
            vilas_page = Vila.query.paginate(page=page, per_page=per_page)
            return render_template('vilasestoque.html', vilasestoque=vilas_page)

    # CRUD VILAS - EDIÇÃO
    @app.route('/vilas/edit/<int:id>', methods=['GET', 'POST'])
    def vilaEdit(id):
        vila = Vila.query.get(id)
        # Edita a vila com as informações do formulário
        if request.method == 'POST':
            vila.nome = request.form['nome']
            vila.pais = request.form['pais']
            vila.kage = request.form['kage']
            db.session.commit()
            return redirect(url_for('vilasEstoque'))
        return render_template('editvila.html', vila=vila)
    
    # ROTA de Catálogo de Personagens Naruto (Consumo da API)
    @app.route('/apinaruto', methods=['GET', 'POST'])
    @app.route('/apinaruto/<int:id>', methods=['GET', 'POST'])
    def apinaruto(id=None):
        # API do Jikan (MyAnimeList) para dados de Naruto
        urlApi = 'https://api.jikan.moe/v4/anime/20/characters'  # ID 20 = Naruto
        try:
            response = requests.get(urlApi)
            response.raise_for_status()
            apiData = response.json()
            listaPersonagens = apiData.get('data', [])
            
            if id:
                personagemInfo = None
                for personagem in listaPersonagens:
                    if personagem['character']['mal_id'] == id:
                        personagemInfo = personagem
                        break
                if personagemInfo:
                    return render_template('personagemInfo.html', personagemInfo=personagemInfo)
                else:
                    return f'Personagem com a ID {id} não foi encontrado'
            return render_template('apinaruto.html', listaPersonagens=listaPersonagens)
        except requests.RequestException as e:
            return f'Erro ao acessar a API: {e}'


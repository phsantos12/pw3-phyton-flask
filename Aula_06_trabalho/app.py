# Importando o Flask
from flask import Flask, render_template
# Importando as rotas que estão nos controllers
from controllers import routes
# Importando os models
from models.database import db
import os

# Carregando o Flask na variável app
app = Flask(__name__, template_folder='views')

# Chamando as rotas
routes.init_app(app)

# Configuração do banco de dados SQLite
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'naruto_world.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Iniciando o servidor no localhost, porta 5000, modo de depuração ativado
if __name__ == '__main__':
    # Passando o flask para SQLAlchemy
    db.init_app(app=app)

    # Criando as tabelas a partir do model
    with app.test_request_context():
        db.create_all()
        print("Banco de dados SQLite criado com sucesso!")

    # Inicializando a aplicação Flask
    app.run(host='localhost', port=5000, debug=True)

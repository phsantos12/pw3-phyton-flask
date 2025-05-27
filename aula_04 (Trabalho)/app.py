# Importando o Flask
from flask import Flask, render_template
# Importando as rotas que estão nos controllers
from controllers import routes
 
# Importando o PyMySQL
import pymysql
 
#Importando o model
from models.database import db
 
# Carregando o Flask na variável app
app = Flask(__name__, template_folder='views')
 
# Definir o nome do banco de dados
# variaveis q contem dados sensíveis é interessante deixar maiúsculo (essas variaveis saem do codigo para não ficar exposto)
DB_NAME = 'games'
app.config['DATABASE_NAME'] = DB_NAME
 
# Passando o endereco do banco ao flask
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root@localhost/{DB_NAME}'
 
 
# Chamando as rotas
routes.init_app(app)
 
# Iniciando o servidor no localhost, porta 5000, modo de depuração ativado
if __name__ == '__main__':
    # Conectando ao MySql e criando o banco de dados com suas tabelas
    connection = pymysql.connect(
        host='localhost', user='root', password='', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor) # O Cursorclass chega em forma de dicionario (dict)
   
    try:
        with connection.cursor() as cursor:
            # Executando uma query para criar o banco
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            print("O banco de dados está criado!")
       
    except Exception as error:
        print(f"Erro ao criar o BD: {error}")
       
       
    finally:
        connection.close()
       
    #Criando as tabelas
   
    db.init_app(app=app)
    with app.test_request_context():
        db.create_all()
   
    #Rodando o projeto
    app.run(host='localhost', port=5000, debug=True)
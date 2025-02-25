#Importanto o flask
from flask import Flask, render_template
#Importando as rotas que estão no controller
from controllers import routes
#Carregando o flask na variavel app
app = Flask (__name__,template_folder='views')
#chamando as rotas
routes.init_app(app)
#Iniciando o servidor no localhost, porta 500, modo de depuração ativado
if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
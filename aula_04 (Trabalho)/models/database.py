from flask_sqlalchemy import SQLAlchemy
 
# Carregando o SQL Alchemy na variável Database
db = SQLAlchemy()
 
# Criando um model (Classe) omdel representa uma tabela no banco
class Game(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    titulo = db.Column(db.String(150))
    ano = db.Column(db.Integer)
    categoria = db.Column(db.String(150))
    plataforma = db.Column(db.String(150))
    preco = db.Column(db.Float)
    quantidade = db.Column(db.Integer)

        #  Método construtor da classe
    def __init__(self, titulo, ano, categoria, plataforma, preco, quantidade):
        self.titulo = titulo
        self.ano = ano
        self.categoria = categoria
        self.plataforma = plataforma
        self.preco = preco
        self.quantidade = quantidade

class Console(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nome = db.Column(db.String(150))
    fabricante = db.Column(db.String(150))
    preco = db.Column(db.Integer)
    quantidade = db.Column(db.Integer)
   

    def __init__(self, nome, fabricante, preco, quantidade):
        self.nome = nome
        self.fabricante = fabricante
        self.preco = preco
        self.quantidade = quantidade


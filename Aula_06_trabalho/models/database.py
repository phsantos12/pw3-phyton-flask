from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Classe responsável por criar a entidade "Vila" com seus atributos.
class Vila(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150))
    pais = db.Column(db.String(150))
    kage = db.Column(db.String(150))

    def __init__(self, nome, pais, kage):
        self.nome = nome
        self.pais = pais
        self.kage = kage
        

# Classe responsável por criar a entidade "Personagem" com seus atributos.
class Personagem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150))
    vila = db.Column(db.String(150))
    jutsu_principal = db.Column(db.String(150))
    rank = db.Column(db.String(50))
    elemento = db.Column(db.String(100))

    def __init__(self, nome, vila, jutsu_principal, rank, elemento):
        self.nome = nome
        self.vila = vila
        self.jutsu_principal = jutsu_principal
        self.rank = rank
        self.elemento = elemento

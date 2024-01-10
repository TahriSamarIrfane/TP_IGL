from elasticsearch import Elasticsearch
from elastic_utils import create_index, add_articles_to_index

def run_indexing_script():
    # Créer une connexion Elasticsearch
    es = Elasticsearch(['http://localhost:9200'])

    # Nom de l'index que vous souhaitez créer
    index_name = 'article7'

    # Liste d'articles à ajouter à l'index
    articles = [
        {"title": "Article 1", "content": "Contenu de l'article 1"},
        {"title": "Article 2", "content": "Contenu de l'article 2"},
        # Ajoutez d'autres articles selon vos besoins
    ]

    # Créer l'index
    create_index(es, index_name)

    # Ajouter des articles à l'index
    add_articles_to_index(es, index_name, articles)

if __name__ == "__main__":
    run_indexing_script()
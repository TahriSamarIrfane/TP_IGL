
from elasticsearch import Elasticsearch
from elasticsearch.exceptions import ElasticsearchException


def create_index(es, index_name):
    try:
        # Code pour créer un index
        es.indices.create(index=index_name, ignore=400)
        print(f"Index '{index_name}' créé avec succès.")
    except ElasticsearchException as e:
        print(f"Erreur lors de la création de l'index '{index_name}': {e}")

def add_articles_to_index(es, index_name, articles):
    try:
        # Code pour ajouter des articles à un index
        for article in articles:
            es.index(index=index_name, body=article)
        print(f"{len(articles)} articles ajoutés à l'index '{index_name}' avec succès.")
    except ElasticsearchException as e:
        print(f"Erreur lors de l'ajout des articles à l'index '{index_name}': {e}")
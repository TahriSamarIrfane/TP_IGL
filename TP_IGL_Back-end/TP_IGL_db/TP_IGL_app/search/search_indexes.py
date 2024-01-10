from elasticsearch_dsl import Document, Text, Keyword, Date

class ArticleIndex(Document):
    title = Text()
    abstract = Text()
    keywords = Keyword()
    full_text = Text()
    # Ajoutez d'autres champs Elasticsearch selon vos besoins

    class Index:
        name = 'article_7'  # Remplacez par le nom de votre index

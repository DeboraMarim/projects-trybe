from tech_news.database import find_news, search_news
from datetime import datetime


# Requisito 7
def search_by_title(title_query):
    db_news = find_news()
    # Filtra notícias cujo título contenha o título pesquisado, ignorando
    #  maiUsculas/minúsculas.
    filtered_news = [(news['title'], news['url']) for news in db_news
                     if title_query.lower() in news['title'].lower()]

    return filtered_news


# Requisito 8
def search_by_date(date_query):
    try:
        # Formata a data de entrada para o formato no banco de dados.
        formatted_date = datetime.strptime(date_query, '%Y-%m-%d').strftime(
         '%d/%m/%Y')
    except ValueError:
        raise ValueError("Data inválida")

    # Realiza a pesquisa no banco de dados com a data formatada.
    db_news = search_news({'timestamp': formatted_date})

    # Cria uma lista de tuplas com os títulos e URLs das notícias encontradas.
    result = [(news['title'], news['url']) for news in db_news]
    return result


# Requisito 9
def search_by_category(category_query):
    db_news = find_news()
    # Filtra notícias cuja categoria contenha a categoria pesquisada,
    # ignorando maiúsculas/minúsculas.
    filtered_news = [(news['title'], news['url']) for news in db_news
                     if category_query.lower() in news['category'].lower()]

    return filtered_news

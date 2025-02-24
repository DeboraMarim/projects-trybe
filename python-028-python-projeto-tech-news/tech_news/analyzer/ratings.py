from tech_news.database import find_news
from collections import Counter


def top_5_categories():
    news_data = find_news()
    news_categories = [news['category'] for news in news_data]

    counter = Counter(news_categories)
    categories = counter.most_common(5)
    top_5 = sorted(categories, key=lambda x: (-x[1], x[0]))
    top_5 = [category for category, count in top_5]

    return top_5









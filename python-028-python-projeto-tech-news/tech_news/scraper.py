import requests
import time
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url_query):
    time.sleep(1)
    try:
        response = requests.get(
            url_query,
            headers={"user-agent": "Fake user-agent"},
            timeout=3
        )
        return response.text if response.status_code == 200 else None
    except (requests.exceptions.Timeout, requests.exceptions.RequestException):
        return None


# Requisito 2
def scrape_updates(html_content_query):
    selector = Selector(html_content_query)
    news_links_query = selector.css('.cs-overlay-link::attr(href)').getall()
    return news_links_query


# Requisito 3
def scrape_next_page_link(html_content_query):
    selector = Selector(html_content_query)
    nav_links_query = selector.css('.nav-links > a::attr(href)').getall()
    next_link_query = nav_links_query[-1] if nav_links_query else None
    return next_link_query


# Requisito 4
def scrape_news(html_content_query):
    selector = Selector(html_content_query)
    result_query = {}
    result_query['url'] = selector.css('link[rel=canonical]::attr(href)').get()
    result_query['title'] = selector.css('.entry-title::text').get().strip()
    result_query['timestamp'] = selector.css('.meta-date::text').get()
    result_query['writer'] = selector.css('.author > a::text').get()
    result_query['reading_time'] = int(
     selector.css('.meta-reading-time::text').re_first(r'\d+'))
    texts_query = selector.css('.entry-content > p:first-of-type *::text') \
        .getall()
    result_query['summary'] = ''.join(texts_query).strip(' \xa0')
    result_query['category'] = selector.css('.category-style > .label::text') \
        .get()

    return result_query


# Requisito 5
def get_tech_news(amount_query):
    base_url_query = 'https://blog.betrybe.com/'
    content_query = fetch(base_url_query)
    next_page_query = scrape_next_page_link(content_query)
    news_links_query = scrape_updates(content_query)
    all_news_query = []

    while len(news_links_query) < amount_query and next_page_query:
        content_query = fetch(next_page_query)
        news_links_query.extend(scrape_updates(content_query))
        next_page_query = scrape_next_page_link(content_query)

    news_links_query = news_links_query[:amount_query]
    for link_query in news_links_query:
        new_page_query = fetch(link_query)
        news_data_query = scrape_news(new_page_query)
        all_news_query.append(news_data_query)

    create_news(all_news_query)
    return all_news_query

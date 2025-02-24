from tech_news.analyzer.reading_plan import ReadingPlanService  # noqa: F401, E261, E501
import pytest
from unittest.mock import Mock, patch


def test_reading_plan_group_news():
    # Teste se o método lança uma exceção para um valor de "available_time"
    #  igual a 0.
    with pytest.raises(ValueError,
                       match="Valor 'available_time' deve ser maior que zero"):
        ReadingPlanService.group_news_for_available_time(0)

    # Cria uma função de mock para substituir o método _db_news_proxy.
    # Esta função de mock retornará uma lista de dicionários simulando as
    #  notícias.
    mock_news_function = Mock(return_value=[
        {'title': '10 jogos para iniciantes aprenderem a programar!',
         'reading_time': 12},
        {'title': 'Endless OS: por que vale a pena usar esse sistema',
         'reading_time': 12},
    ])

    # Usa o módulo 'patch' para substituir o método _db_news_proxy pelo
    #  mock_news_function.
    with patch(
        'tech_news.analyzer.reading_plan.ReadingPlanService._db_news_proxy',
        mock_news_function
    ):
        # Chama o método group_news_for_available_time com diferentes valores
        #  de "available_time".
        returned_result = ReadingPlanService.group_news_for_available_time(10)
        none_unreadable_result = ReadingPlanService \
            .group_news_for_available_time(20)

    # Define os resultados esperados para as chamadas do método.
    returned_mock = {
        'readable': [],
        'unreadable': [
            ('10 jogos para iniciantes aprenderem a programar!', 12),
            ('Endless OS: por que vale a pena usar esse sistema', 12)
        ]
    }
    none_unreadable_mock = {
        'readable': [
            {'chosen_news': [
                ('10 jogos para iniciantes aprenderem a programar!', 12)],
             'unfilled_time': 8},
            {'chosen_news': [
                ('Endless OS: por que vale a pena usar esse sistema', 12)],
             'unfilled_time': 8}
        ],
        'unreadable': []
    }

    # Compara os resultados reais com os resultados esperados.
    assert returned_result == returned_mock
    assert none_unreadable_result == none_unreadable_mock

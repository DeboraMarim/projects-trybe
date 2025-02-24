import json
from src.models.history_model import HistoryModel


# Req. 7
def test_request_history():
    # Arrange
    json_data = HistoryModel.list_as_json()
    data = json.loads(json_data)

    # Act
    result = get_formatted_history_entries(data)

    # Assert
    expected_result = [
        {
            "text_to_translate": "Hello, I like videogame",
            "translate_from": "en",
            "translate_to": "pt",
        },
        {
            "text_to_translate": "Do you love music?",
            "translate_from": "en",
            "translate_to": "pt",
        }
    ]

    assert result == expected_result


def get_formatted_history_entries(data):
    return [
        {
            'text_to_translate': entry['text_to_translate'],
            'translate_from': entry['translate_from'],
            'translate_to': entry['translate_to']
        }
        for entry in data
    ]

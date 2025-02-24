from src.models.history_model import HistoryModel
from src.models.user_model import UserModel
import json


def test_history_delete(app_test):
    entry = HistoryModel({
        "text_to_translate": "Do you love music?",
        "translate_from": "en",
        "translate_to": "pt",
    })
    entry.save()

    entry_id = entry.id

    user = UserModel({'name': 'um nome', 'token': 'um token'})
    user.save()

    response = app_test.delete(
        f"/admin/history/{entry_id}",
        headers={
            "Authorization": 'um token',
            "User": 'um nome',
        }
    )

    history_data_after = HistoryModel.list_as_json()
    history_after = json.loads(history_data_after)

    assert response.status_code == 204
    assert len(history_after) == 0

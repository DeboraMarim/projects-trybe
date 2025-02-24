from .abstract_model import AbstractModel
from database.db import db


class LanguageModel(AbstractModel):
    _collection = db['languages']

    def __init__(self, data):
        super().__init__(data)

    # Req. 2
    def to_dict(self):
        language_dict = {
            'name': self.data.get('name', ''),
            'acronym': self.data.get('acronym', ''),
        }
        return language_dict

    # Req. 3
    @classmethod
    def list_dicts(cls):
        languages = cls.find()
        list = [language.to_dict() for language in languages]
        return list

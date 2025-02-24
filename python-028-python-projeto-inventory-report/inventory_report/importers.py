from typing import Dict, Type, List
from abc import ABC, abstractmethod
from inventory_report.product import Product
import json
import csv

class Importer(ABC):
    def __init__(self, path: str) -> None:
        self.file_path = path
        self.validate_file_extension()

    @abstractmethod
    def import_data(self) -> List[Product]:
        pass

    @property
    @abstractmethod
    def file_extension(self) -> str:
        pass

    def validate_file_extension(self) -> None:
        if not self.file_path.endswith(self.file_extension):
            raise ValueError(f"Invalid file format. Expected a {self.file_extension} file.")

    @staticmethod
    def _create_products_from_data(parsed_data: List[Dict[str, str]]) -> List[Product]:
        return [
            Product(
                id=product_data['id'],
                product_name=product_data['product_name'],
                company_name=product_data['company_name'],
                manufacturing_date=product_data['manufacturing_date'],
                expiration_date=product_data['expiration_date'],
                serial_number=product_data['serial_number'],
                storage_instructions=product_data['storage_instructions'],
            )
            for product_data in parsed_data
        ]


class JsonImporter(Importer):
    @property
    def file_extension(self) -> str:
        return ".json"

    def import_data(self) -> List[Product]:
        with open(self.file_path, 'r') as file_stream:
            parsed_data = json.load(file_stream)
        return self._create_products_from_data(parsed_data)


class CsvImporter(Importer):
    @property
    def file_extension(self) -> str:
        return ".csv"

    def import_data(self) -> List[Product]:
        loaded_data = self._load_csv_data()
        return self._create_products_from_data(loaded_data)

    def _load_csv_data(self) -> List[Dict[str, str]]:
        with open(self.file_path, mode='r') as file_stream:
            return list(csv.DictReader(file_stream))
# Não altere a variável abaixo

IMPORTERS: Dict[str, Type[Importer]] = {
    "json": JsonImporter,
    "csv": CsvImporter,
}

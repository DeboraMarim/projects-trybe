from typing import List, Optional
from inventory_report.product import Product

class Inventory:
    def __init__(self, data: Optional[List[Product]] = None) -> None:
        # _data represents the list of products in the inventory
        self._data = data if data else []

    @property
    def data(self) -> List[Product]:
        return self._data.copy()

    def add_data(self, data: List[Product]) -> None:
        """Add a list of products to the inventory."""
        self._data.extend(data)

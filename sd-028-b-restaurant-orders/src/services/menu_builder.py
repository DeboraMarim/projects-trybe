from typing import Dict, List, Optional

from services.inventory_control import InventoryMapping
from services.menu_data import MenuData

DATA_PATH = "data/menu_base_data.csv"
INVENTORY_PATH = "data/inventory_base_data.csv"


class MenuBuilder:
    def __init__(self, data_path: str = DATA_PATH, inventory_path: str = INVENTORY_PATH):
        self.menu_data = MenuData(data_path)
        self.inventory = InventoryMapping(inventory_path)

    def make_order(self, dish_name: str) -> None:
        dish = next((dish for dish in self.menu_data.dishes if dish.name == dish_name), None)
        if dish is None:
            raise ValueError("Dish does not exist")
        
        self.inventory.consume_recipe(dish.recipe)

    def get_main_menu(self, restriction: Optional[str] = None) -> List[Dict[str, str]]:
        restricted_menu = []
        for dish in self.menu_data.dishes:
            if self.inventory.check_recipe_availability(dish.recipe) and (restriction not in dish.get_restrictions()):
                restricted_menu.append({
                    'dish_name': dish.name,
                    'ingredients': list(dish.get_ingredients()),
                    'price': dish.price,
                    'restrictions': list(dish.get_restrictions())
                })
        return restricted_menu

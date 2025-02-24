from csv import DictReader
from typing import Dict

from src.models.dish import Recipe
from src.models.ingredient import Ingredient

BASE_INVENTORY = "data/inventory_base_data.csv"

Inventory = Dict[Ingredient, int]

def read_csv_inventory(inventory_file_path: str = BASE_INVENTORY) -> Inventory:
    inventory = {}
    with open(inventory_file_path, encoding="utf-8") as file:
        for row in DictReader(file):
            ingredient = Ingredient(row["ingredient"])
            inventory[ingredient] = int(row["initial_amount"])
    return inventory


class InventoryMapping:
    def __init__(self, inventory_file_path: str = BASE_INVENTORY) -> None:
        self.inventory = read_csv_inventory(inventory_file_path)

    def check_recipe_availability(self, recipe: Recipe) -> bool:
        for ingredient, required_quantity in recipe.items():
            available_quantity = self.inventory.get(ingredient, 0)
            if available_quantity < required_quantity:
                return False
        return True

    def consume_recipe(self, recipe: Recipe) -> None:
        if not self.check_recipe_availability(recipe):
            raise ValueError("Recipe can't be made with available inventory")

        for ingredient, quantity_to_consume in recipe.items():
            self.inventory[ingredient] -= quantity_to_consume

from typing import Set
from csv import DictReader
from collections import defaultdict
from src.models.dish import Dish
from src.models.ingredient import Ingredient

class MenuData:
    def __init__(self, source_path: str) -> None:
        self.dishes = self.__extract_dishes(source_path)
        
    def __extract_dishes(self, source: str) -> Set[Dish]:
        dish_dict = defaultdict(lambda: {"dish": None, "ingredients": []})
        
        with open(source, encoding="utf-8") as file:
            for row in DictReader(file):
                dish_name = row['dish']
                price = float(row['price'])
                ingredient = Ingredient(row['ingredient'])
                recipe_amount = int(row['recipe_amount'])
                
                if dish_dict[dish_name]["dish"] is None:
                    dish_dict[dish_name]["dish"] = Dish(dish_name, price)
                
                dish_dict[dish_name]["ingredients"].append((ingredient, recipe_amount))
        
        dishes = set()
        for dish_data in dish_dict.values():
            dish = dish_data["dish"]
            for ingredient, amount in dish_data["ingredients"]:
                dish.add_ingredient_dependency(ingredient, amount)
            dishes.add(dish)
        
        return dishes

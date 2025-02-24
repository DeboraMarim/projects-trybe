import pytest
from src.models.dish import Dish  # noqa: F401, E261, E501
from src.models.ingredient import Ingredient, restriction_map


# Req 2
def test_dish():
    # Test if lasagna and lasagna_too are created correctly
    lasagna = Dish('lasanha 4 queijos', 28.99)
    lasagna_too = Dish('lasanha 4 queijos', 28.99)
    assert type(lasagna) == Dish
    assert lasagna.name == 'lasanha 4 queijos'
    assert lasagna == lasagna_too

    printed_lasagna = repr(lasagna)
    assert printed_lasagna == "Dish('lasanha 4 queijos', R$28.99)"
    
    ingredients = [
        "queijo mussarela",
        "queijo gorgonzola",
        "queijo parmesão",
        "queijo provolone",
        "massa de lasanha"
    ]

    for ingredient in ingredients:
        lasagna.add_ingredient_dependency(Ingredient(ingredient), 1)
        lasagna_too.add_ingredient_dependency(Ingredient(ingredient), 1)

    assert len(lasagna.recipe) == 5

    # Test hash values
    assert hash(lasagna) == hash(lasagna_too)
    
    # Create another Dish object and test it
    lasanha = Dish('lasanha mussarela', 28.99)
    lasanha.add_ingredient_dependency(Ingredient("queijo mussarela"), 1)
    
    assert hash(lasagna) != hash(lasanha)
    assert lasanha.get_restrictions() == restriction_map().get("queijo mussarela", set())
    assert lasanha.get_ingredients() == {Ingredient("queijo mussarela")}

    # Test errors
    with pytest.raises(TypeError, match="Dish price must be float."):
        Dish("lasanha de cebola", '19')
        
    with pytest.raises(ValueError, match="Dish price must be greater then zero."):
        Dish("lasanha de cebola", -19)

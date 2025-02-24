from src.models.ingredient import Ingredient, restriction_map  # noqa: F401, E261, E501

def test_ingredient():
    # Arrange
    butter = Ingredient('manteiga')
    manteiga = Ingredient('manteiga')
    flour = Ingredient('farinha')
    
    # Act
    printed_butter = repr(butter)
    eq_butter = (butter == Ingredient('manteiga'))
    butter_is_manteiga = (butter == manteiga)
    
    # Assert: Validating Ingredient creation and attributes
    assert type(butter) == Ingredient, "Type of butter should be Ingredient"
    assert butter.name == 'manteiga', "Name of butter should be 'manteiga'"
    assert butter.restrictions == restriction_map().get('manteiga', set()), "Restrictions should match the restriction map"
    
    # Assert: Validating representation of Ingredient
    assert printed_butter == "Ingredient('manteiga')", "Representation should match the expected format"
    
    # Assert: Validating equality and hash of Ingredient
    assert eq_butter is True, "butter should be equal to a new Ingredient with name 'manteiga'"
    assert butter_is_manteiga is True, "butter should be equal to manteiga"
    assert hash(butter) == hash(manteiga), "Hash of butter should be equal to hash of manteiga"
    assert hash(butter) != hash(flour), "Hash of butter should not be equal to hash of flour"

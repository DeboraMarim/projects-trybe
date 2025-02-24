from django.core.exceptions import ValidationError


def title_validation(value):
    word = value.split()
    if len(word) < 2:
        raise ValidationError(
            'O título deve conter pelo menos 2 palavras.'
            )

import pytest
from challenges.challenge_encrypt_message import encrypt_message


def test_encrypt_message():
    array_tests1 = [
        ("ovo", 3, "ovo"),
        ("ovo", 2, "o_vo"),
        ("ovo", 0, "ovo"),
    ]
    array_tests2 = [
        ("umu", 3, "umu"),
        ("umu", 2, "u_mu"),
        ("umu", 0, "umu"),
    ]

    for message, index, expected in array_tests1:
        assert encrypt_message(message, index) == expected

    for message, index, expected in array_tests2:
        assert encrypt_message(message, index) == expected

    with pytest.raises(TypeError):
        encrypt_message(0, "ovo")

    with pytest.raises(TypeError):
        encrypt_message(2, "o_vo")

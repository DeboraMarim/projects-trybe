def is_palindrome_recursive(word, low_index, high_index):
    if word == "":
        return False
    if low_index > high_index:
        return True
    if word[low_index] != word[high_index]:
        return False

    return is_palindrome_recursive(word, low_index + 1, high_index - 1)


def is_palindrome(word):
    if not word:
        return False
    return is_palindrome_recursive(word, 0, len(word) - 1)

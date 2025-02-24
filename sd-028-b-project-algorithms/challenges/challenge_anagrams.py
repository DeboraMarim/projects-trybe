def merge_sort(string):
    if len(string) <= 1:
        return string

    size = len(string) // 2
    left = merge_sort(string[:size])
    right = merge_sort(string[size:])

    return merge(left, right)


def merge(left, right):
    done = []
    l_index, r_index = 0, 0

    while l_index < len(left) and r_index < len(right):
        if left[l_index] <= right[r_index]:
            done.append(left[l_index])
            l_index += 1
        else:
            done.append(right[r_index])
            r_index += 1

    done.extend(left[l_index:])
    done.extend(right[r_index:])
    return done


def is_anagram(first_string, second_string):

    the_first = merge_sort(first_string.lower())
    the_second = merge_sort(second_string.lower())
    if len(the_first) == 0 or len(the_second) == 0:
        return (''.join(the_first), ''.join(the_second), False)
    elif the_first == the_second:
        return (''.join(the_first), ''.join(the_second), True)
    else:
        return (''.join(the_first), ''.join(the_second), False)

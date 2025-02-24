def study_schedule(permanence_period, target_time):

    if not target_time:
        return None

    students = 0
    for start, end in permanence_period:
        if not isinstance(start, int) or not isinstance(end, int):
            return None
        if start <= target_time and end >= target_time:
            students += 1

    return students

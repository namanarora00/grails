import math

K = 25


def p(r_a, r_b):
    '''
        Calculates probability.
    '''
    return 1.0 / (1 + 1.0 * math.pow(10, 1.0 * (r_a - r_b) / 400))


def new_rating(r_a, r_b):
    '''
        Calculates new ratings where player with r_a wins and r_b loses.
    '''
    p_a = p(r_a, r_b)
    p_b = p(r_b, r_a)

    r_a += K * (1 - p_a)
    r_b += K * (-p_b)

    return round(r_a, 3), round(r_b, 3)

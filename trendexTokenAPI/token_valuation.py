def calc_stat_value(statistics):
    total_score = statistics["points"] + (1.2 * statistics["rebounds"]) + (1.5 * statistics["assists"]) + (
            3 * (statistics["steals"] + statistics["blocks"]))
    return total_score


def calc_token_price(stat_value, follower_count):
    final_token_value = (((follower_count ** (1 / 3)/521) * 0.5) + ((stat_value / 70) * 0.5)) * 100
    final_token_value = round(final_token_value, 2)
    to_return = {"follower count": follower_count, "stat value": stat_value, "final token value": final_token_value}
    return to_return

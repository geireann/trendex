import parser
import token_valuation
import soccer
import sys

if __name__ == '__main__':
    follower_count = parser.parse_followers("Caris LeVert")
    stats = parser.parse_statistics("Caris LeVert")
    # print(stats)
    stat_score = token_valuation.calc_stat_value(stats)
    # print(stat_score)
    data = token_valuation.calc_token_price(stat_score, follower_count)
    print(data["final token value"])

    # print(soccer.soccer_token_value(4, 0, 3, 2, 24))

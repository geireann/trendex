import instaloader
import pandas as pd

# Creating an instance of the Instaloader class
bot = instaloader.Instaloader()
# Loading a profile from an Instagram handle
profile = instaloader.Profile.from_username(bot.context, 'hm_son7')
print("Username: ", profile.username)
print("User ID: ", profile.userid)
print("Number of Posts: ", profile.mediacount)
print("Followers Count: ", profile.followers)
print("Following Count: ", profile.followees)
print("Bio: ", profile.biography)
print("External URL: ", profile.external_url)

follower_count = profile.followers



def soccer_token_value(position, clean_sheets, goals, assists, goals_conceded):
    stat_score = 0
    if position == 1:
        stat_score += (4 * clean_sheets) + (10 * goals) + (7 * assists) - (0.2 * goals_conceded)
    elif position == 2:
        stat_score += (2 * clean_sheets) + (4 * goals) + (3 * assists) - (0.2 * goals_conceded)
    elif position == 3:
        stat_score += (1 * clean_sheets) + (3 * goals) + (2 * assists)
    else:
        stat_score = (2 * goals) + (1.5 * assists)

    final_token_value = (((follower_count ** (1 / 3) / 521) * 0.5) + ((stat_score / 70) * 0.5)) * 100
    final_token_value = round(final_token_value, 2)
    return final_token_value

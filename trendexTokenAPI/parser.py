from bs4 import BeautifulSoup
import urllib.request
import re
import unidecode

# data = {"Mesut Ozil": 24800000, "Robert Lewandowski": 32300000, "Jamal Musiala": 2200000, "Kevin De Bruyne": 20000000, "Karim Benzema": 64500000, ""}


def parse_followers(player):
    data = urllib.request.urlopen('https://www.popularbasketballers.com/').read()
    soup = BeautifulSoup(data)
    table = soup.table
    for currentPlayer in table:
        rank = ""
        name = ""
        followers = ""
        num = 1
        for child in currentPlayer:
            str_child = str(child)
            if len(str_child) <= 1:
                continue
            info = str_child[str_child.index('>') + 1: str_child.index('<', 1, len(str_child))]
            if num == 1:
                rank = info
            if num == 2:
                name = info
            if num == 3:
                followers = re.sub(",", "", info)
            num += 1
        if player == name:
            followers = int(followers)
            print(player, " has ", str(followers), " followers")
            return followers


def parse_statistics(player):
    data = urllib.request.urlopen('https://www.basketball-reference.com/leagues/NBA_2023_per_game.html').read()
    soup = BeautifulSoup(data)
    for child in soup.table.tbody:
        if len(child) <= 1:
            continue
        if child.a is not None and child.a.contents is not None:
            name = child.a.contents
        else:
            continue
        name = name[0]
        name = unidecode.unidecode(name)
        if player == name:
            ppg = None
            orpg = None
            drpg = None
            apg = None
            spg = None
            bpg = None
            for stat in child.children:
                stat = str(stat)
                current_stat = stat[stat.index('>') + 1: stat.index('<', 1, len(stat))]
                if "pts_per_g" in stat:
                    ppg = float(current_stat)
                if "orb_per_g" in stat:
                    orpg = float(current_stat)
                if "drb_per_g" in stat:
                    drpg = float(current_stat)
                if "ast_per_g" in stat:
                    apg = float(current_stat)
                if "stl_per_g" in stat:
                    spg = float(current_stat)
                if "blk_per_g" in stat:
                    bpg = float(current_stat)
            rpg = orpg + drpg
            dictionary = {"points": ppg, "rebounds": rpg, "assists": apg, "steals": spg, "blocks": bpg}
            return dictionary

from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import pandas as pd
import json
import numpy as np

gauth = GoogleAuth()
gauth.LoadCredentialsFile("mycreds.txt")
if gauth.credentials is None:
    gauth.LocalWebserverAuth()
elif gauth.access_token_expired:
    gauth.Refresh()
else:
    gauth.Refresh()
    gauth.Authorize()
gauth.SaveCredentialsFile("mycreds.txt")
drive = GoogleDrive(gauth)

s = 800
k = 100


def updateresults():  # pull game data - scores and player names
    FILE_ID = "1A0cc-zvH_xCWQ_rHTMOlybsEpWbFV_mVD9A4aH1fE1U"
    FILE_NAME = "game_data"
    file_obj = drive.CreateFile({'id': FILE_ID})
    file_obj.GetContentFile(f"{FILE_NAME}.xls",
                            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    results1 = pd.read_excel(f"{FILE_NAME}.xls")
    columns = {
        'Timestamp': 'timestamp',
        'Email Address': 'email',
        'What is your name?': 'name',
        'How many points did you score?': 'your_points',
        'What was the name of your opponent?': 'opponent_name',
        'How many points did your opponent score?': 'opponent_points'
    }
    results1.rename(columns=columns, inplace=True)
    return results1


def updateusers():  # pull list of users who have used the registration form
    registered_sheet_id = "1v9eWUi8N56uYE7sbapvL5QRoEpD9AqfIdKdByjJYvjI"

    file_obj_2 = drive.CreateFile({'id': registered_sheet_id})
    file_obj_2.GetContentFile("registered_users.xls",
                              mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    users = pd.read_excel("registered_users.xls")
    columns_2 = {
        'Timestamp': 'timestamp',
        'Email Address': 'email',
        'What is your name?': 'name'
    }
    users.rename(columns=columns_2, inplace=True)
    return users


def registerusers():  # assigns all users who have registered an elo of 1000 and pulls the list to a json file
    with open('userlist.json', ) as f:
        data = json.load(f)
    for name1 in updateusers().name:
        name2 = name1.strip()
        data.update({name2: 1000})
    with open('userlist.json', 'w') as f2:
        json.dump(data, f2, ensure_ascii=False, indent=4)


def checkelos():  # pulls names and elos from json file without checking gdrive
    with open('userlist.json', ) as f:
        data = json.load(f)
        return data


def calculate_elo_change(game_number,
                         res):  # calculates new elos for players on a game by game basis and updates the json
    print(f"Game {game_number}")
    users = checkelos()
    player1 = res.name[game_number]
    player2 = res.opponent_name[game_number]
    p1elo = users[player1]
    p2elo = users[player2]
    p1points = res.your_points[game_number]
    p2points = res.opponent_points[game_number]
    actual = p1points / (p1points + p2points)
    ediff = p2elo - p1elo
    expected = 1 / (1 + 10 ** (ediff / s))
    p1newelo = p1elo + k * (actual - expected)
    print(f"{player1} = {p1newelo}")
    actual2 = p2points / (p2points + p1points)
    ediff = p1elo - p2elo
    expected2 = 1 / (1 + 10 ** (ediff / s))
    p2newelo = p2elo + k * (actual2 - expected2)
    print(f"{player2} = {p2newelo}")
    p1finalelo = round(p1newelo)
    p2finalelo = round(p2newelo)
    with open('userlist.json', ) as f:
        data = json.load(f)
    data.update({player1: p1finalelo})
    data.update({player2: p2finalelo})
    with open('userlist.json', 'w') as f2:
        json.dump(data, f2, ensure_ascii=False, indent=4)
    f.close()
    return data


def push_standings():  # uploads finalized elos to gdrive
    users = checkelos()
    tempdict = {}
    for user in users:
        if users[f"{user}"] == 1000:
            tempdict.update({user: 1000})
    for user in tempdict:
        del users[f"{user}"]
    standings = dict(sorted(users.items(), reverse=True, key=lambda item: item[1]))
    File_id = '1qUqAFbrqQfZnkZZqN8LvmL2RyK-YmT6R'
    file1 = drive.CreateFile({'id': File_id})
    file1.SetContentString(
        f"S = {s}, K = {k}\n\n" + "Leaderboard:\n" + str(standings) + "\n\n\n\n" + "Unchanged scores: \n" + str(
            tempdict))
    file1.Upload()


registerusers()
results = updateresults()
numgames = len(results.timestamp)
for i in range(numgames):
    if np.isnan(results.your_points[i]):
        print("no game")
    else:
        calculate_elo_change(i, results)
push_standings()

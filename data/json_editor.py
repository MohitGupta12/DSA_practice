import json

# Open the JSON file and read its contents
with open('backup.json', 'r') as file:
    data = json.load(file)


for question in data["questions"]:
    del question["URL"]

# print the updated data
# print(data)

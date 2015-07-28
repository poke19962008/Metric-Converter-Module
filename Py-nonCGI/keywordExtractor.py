__author__ = 'poke19962008'

import re

def extract(query):
    query = query.split(" ")
    StrippedQuery = []
    StopWords = open("StopWords.txt", "r").read().split("\n")
        
    for word in query:
        word = word.lower()
        word = re.sub(r"(\?|!)+", "", word)  # Remove '?', '!' from the end of the word
                    
        if word not in StopWords:
            StrippedQuery.append(word)
    return StrippedQuery

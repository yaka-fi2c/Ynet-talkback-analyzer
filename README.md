# Ynet-talkback-analyzer
ynet talkback analyzer takes talkbacks from ynet articles and arranges them in an array of object by the following key's:
1. unique id
2. Author
3. Title
4. Body
5. publish Date/Time
6. votes.

after the data is arranged is pushed into a new object contains all of the article data (URL, title, talkbacks object, the average of all votes) and then can be download as a json text file.

the code deals also with cases in which we don't have any talkbacks at all.

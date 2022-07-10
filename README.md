# PlayMyPlaylist

A new fun party game!

## Features - aka - User stories

### User

1. One must be able to create a room.
2. One must be able to join an existing room.
3. One must be able to enter their game player name.
4. One must be able to pick their game avatar.
5. One must be able to add songs to their guilty pleasure playlist.
6. One must be able to see all other players name and avatar who joined the same room.
7. One must be able to play / replay the current song played in the round.
8. One must be able to see the song name, cover thumbnail if any.
9. One must be able to vote for any other person in the room other than themselves.
10. One must be able to see their score in the game at any time.
11. One must be able to see all players score at the end of each round.
12. One must be able to search for songs to add in their playlist.
13. One must be able to play and see the selected song, delete it and add new songs to their playlist.

### Game creator

1. One must be able to create a new room.
2. One must be able to share a link to join a room.
3. One must be able to set the maximum number of players for that room.
4. One must be able to set the maximum number of songs each person can add to their playlist.
5. One must be able to set the option to play the game for fixed number of rounds. ( Has to be less than total songs )
6. One must be able to set the option to automatically take random number of rounds ( 5 and 6 are 2 options for same action )

## Game state map

1. Create a room / Join a room.
2. Wait in the lobby area until
   i. All the players have entered the game ( By checking if total count of players in room matches with room settings )
   ii. All players have entered their songs.
   iii. Game creator can start the game if and only if all the current players in the room have entered their songs.
3. Once the game starts, keep track of the number of rounds for each game.
4. For each round in a game,
   i. Pick a random song from the pool of songs given by players.
   ii. Play the song.
   iii. Collect guesses from user on who they think has that song.
   iv. Wait until every player has voted.
   v. Show the results, i.e, whose song it was and how much score each player gets for their guess.
   vi. Add the individual score to the game scoreboard.
   vii. Proceed to next round if present.
5. Once all rounds are complete, show the complete game's leaderboard and announce the winner.
6. Provide options to either exit the game ( Move players to homepage or state 1 )or continue another set of game in same room ( Move players to state 2 )

## Resources

- Design link - https://www.figma.com/file/Mhgumt1c06vVqH2eIW4B66/PlayMyPlaylist?node-id=0%3A1

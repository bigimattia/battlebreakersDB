# BattlebreakersDB
This is my first angular project.

"battlebreakersDB" is a fan-made Battle Breakers database.
You will be able to search for specific characters, filter them and order them by ID, rarity, etc.. (both ascending and descending order).

## Future features I'd like to develop:
- Damage calculator;
- Drop location tables;
- Login system;
- Characters rate system;
- Team building system (users will be able to post teams for specific content. Other users will then be able to upvote/downvote and comment).

## How to "update" the database content:
In order to populate the "database" edit the "src/app/characters-data.ts" file.
Add/edit classes -> "src/app/characterclasses-data.ts" (You'll have to update "src/app/Constants.ts" as well) .
Add/edit abilities -> "src/app/abilitysys-data.ts" (You'll have to update "src/app/Constants.ts" as well) .



## Test it out!
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Test it out using electron by running "npm run electron".

I've also included a "Dockerfile" and a "docker-compose.yml" for you to test things out.

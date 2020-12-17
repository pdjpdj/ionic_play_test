# ionic_play_test

## Development test for Go Green (SmartED-iTORS)

### Initial Creation
Used ionic for development:

```$ npm install -g @ionic/cli```

Create a blank react project: 

```$ ionic start ionic_blank_test blank --type react```

### Cloning
After cloning the project you can run it doing:
1. ```$ npm install```
2. ```$ npx ionic serve --open```

### App description
1. App load with a list of games using the url:
```https://games.directory/api/v1/play_station/games/```
2. User can navigate between the pages using the buttons at the bottom of the page.
3. User can search for a specific page using the search input at top, it auto-searches when the user pauses for 500ms. This uses the url:  ```https://games.directory/api/v1/play_station/games?query=<SEARCH_TEXT>```
4. Clicking on a game in the list shows the detail page for the game. This uses the url: ```https://games.directory/api/v1/play_station/games/<GAME_SLUG>```
5. Description shows either the first ```<b>``` html tag, or first 250 chars of the description. Clicking on the 'Show full description' button shows a modal with the full description.
6. Trophies show the first 4 trophies, if there are more the user can see them by pressing the 'Show all trophies' button.
7. Media Centre shows the first 3 medias, if there are more the user can see them by presing the 'Show all media' button.
8. Store shows the addons with names for a game, these are fetched using the url: ```https://games.directory/api/v1/play_station/games/<GAME_SLUG>/addons```
9. Clicking a store item loads the game detail page for that store item.

### TO DO:
1. Fix warning after clicking on store item.
2. Find good solution for caching images using Ionic and React, probably using [Progressive Web Apps in React](https://ionicframework.com/docs/react/pwa)
3. Get store images (probably have to get the data from ```https://games.directory/api/v1/play_station/games/<GAME_SLUG>```)

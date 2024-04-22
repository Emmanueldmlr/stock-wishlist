## Setup Instructions

1. Download the project and unzip it.
2. Open the terminal and navigate to the project directory.
3. Run `yarn` to install the dependencies.
4. Run `yarn dev` to start the application.
5. Open the browser and navigate to `http://localhost:3000` to view the application.
6. if there is no .env file in the root directory, create a .env file and add the following line `VITE_WS_URL=ws://localhost:8425/` to connect to the WebSocket server, add `VITE_WATCH_LIST_KEY=Qay0FKOgN5jYOIcrCNNO` to store the watchlist in the local storage and `VITE_FETCH_INTERVAL=5000` to set the interval to fetch the stock prices.

## Running Tests

To run the tests, run the following command in the terminal:

```bash
# npm
npm run test

# or yarn
yarn test
```

## Technologies Used

1. I have used `React.js` to build the application as I am more comfortable with it.
2. I made use of `chakra-ui` as a  ui-library for a faster development. 
3. I used the `rxjs` to connect to the WebSocket server and receive the stock prices. 
4. I have used the `react-testing-library` and `jest` libraries to write the unit tests.

## Possible Improvements / Features if I had more time
1. Notification to inform the user when the WebSocket connection is lost. Currently the last updated time is used to inform the user of stale data.
3. A confirmation dialog when the user tries to unsubscribe from a stock.
4. More unit tests to cover more scenarios.
5. I would have written the css from scratch to show my styling skills.
6. Sort features to sort the stocks based on the price.


## Questions

1. What happens in case the WebSocket disconnects? How would you go further to keep
   the live data available or inform the user? Please discuss the challenges.

Answers: In case the WebSocket disconnects, the user will not receive the latest stock prices. To keep the live data available, I would implement a reconnection strategy to reconnect to the WebSocket server when the connection is lost. I would also show a notification to the user informing them that the data is not up to date. The challenge is to handle the reconnection logic and ensure that the user is informed when the connection is lost.

2. What happens if a user adds an instrument multiple times to their list? Please discuss possible challenges and mitigations.

Answers: If a user adds an instrument multiple times to their list, they will see multiple entries for the same instrument. This can be confusing for the user as they may not know which entry to focus on. To mitigate this, I would check if the instrument is already in the list before adding it. If the instrument is already in the list, I would show a notification to the user informing them that the instrument is already in the list. This will prevent the user from adding the same instrument multiple times.

3. What potential performance issues might you face when this app scales with multiple subscriptions? How would you improve the speed and user experience?

Answers: When this app scales with multiple subscriptions, potential performance issues may arise due to the increased number of WebSocket connections and data processing. This can lead to increased server load and slower response times. To improve the speed and user experience, I would implement the following strategies:

- Implement server-side pagination to limit the number of subscriptions per page.
- Use lazy loading to load data only when it is needed.
- Optimize the data processing logic to improve performance.

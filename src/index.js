import app from './app.js';
import dotenv from 'dotenv';
// import { asyncHandler } from './utils/AsyncHandler.js';
import dbConnection from './db/index.js';

dotenv.config();

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`app is listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('Connection Error', error);
  });

// Another Methode

// dbConnection().then(() => {
//   app.listen(
//     process.env.PORT || 3000,
//     asyncHandler(async () => {
//       console.log(`App is listening on PORT: ${process.env.PORT}`);
//     }),
//   );
// });

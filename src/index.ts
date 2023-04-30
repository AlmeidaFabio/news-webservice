import 'dotenv/config'
import { connection } from './database/connections/mysql'
import { app } from "./app";

connection.connect((err) => {
    if (err) {
        console.error("Error during Data Source initialization", err);
        return;
    }
      console.log("Database has been initialized!");
})

app.listen(process.env.PORT || 2023, () => {
    console.log(`Server is running in ${process.env.URL}:${process.env.PORT}`)
})
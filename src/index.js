import { config } from "dotenv";
config();
import connectDb from "./db/index.js";
const port = process.env.PORT || 8000;
import {app} from "./app.js";



connectDb()
.then(() => {
    app.listen(port, () => {
        console.log(`Server started on ${port}`);
    });
})
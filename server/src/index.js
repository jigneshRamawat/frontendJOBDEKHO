import "dotenv/config";
import { connectDB } from "./config/db.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed", err);
    });

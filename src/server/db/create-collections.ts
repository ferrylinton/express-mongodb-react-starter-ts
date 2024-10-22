import { MONGODB_DATABASE } from "../config/constant";
import { getMongoClient } from "../config/mongodb";
import logger from "../config/winston";
import { TODO_COLLECTION } from "./db-constant";
import { createTodoSchema } from "./todo-schema";

export const initDb = async () => {

	logger.info('[MONGODB] create collection');

    try {
        
        // Create connection
        const connection = await getMongoClient();
        const db = connection.db(MONGODB_DATABASE);

        // Get existing collections
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        // Create collections if not exist

        if (!collectionNames.includes(TODO_COLLECTION)) {
            await createTodoSchema(db);
        }

        

    } catch (error) {
		logger.error(error);
		process.exit();
    }

}
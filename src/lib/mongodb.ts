import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please define the MONGODB_URI in .env.local");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Add global typing for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable to avoid multiple connections in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production: create a new client
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

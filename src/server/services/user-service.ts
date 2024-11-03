import { ObjectId } from 'mongodb';
import { USER_COLLECTION } from '../db/db-constant';
import { mapToObject } from '../utils/json-util';
import { getCollection } from '../config/mongodb';
import bcrypt from 'bcryptjs';

export const find = async (): Promise<User[]> => {
	const userCollection = await getCollection<User>(USER_COLLECTION);
	const users = await userCollection.find().sort({ createdAt: -1 }).toArray();
	return users.map(user => mapToObject(user));
};

export const count = async (): Promise<number> => {
	const userCollection = await getCollection<User>(USER_COLLECTION);
	return await userCollection.countDocuments();
};

/**
 * Find a User document by ID
 *
 * @param {string} _id - The ID of user document
 * @returns A {@link User} document
 */
export const findById = async (_id: string) => {
	const userCollection = await getCollection<User>(USER_COLLECTION);
	const user = await userCollection.findOne({ _id: new ObjectId(_id) });
	return user ? mapToObject(user) : null;
};

export const findByUsername = async (username: string) => {
	const userCollection = await getCollection<User>(USER_COLLECTION);
	const user = await userCollection.findOne({ username });
	return user ? mapToObject(user) : null;
};

export const findByEmail = async (email: string) => {
	const userCollection = await getCollection<User>(USER_COLLECTION);
	const user = await userCollection.findOne({ email });
	return user ? mapToObject(user) : null;
};

/**
 * Create a new User document.
 *
 * @param {string} task - The task
 * @returns Object of {@link InsertOneResult}
 */
export const create = async (createUser: CreateUser, createdBy?: string) => {
	createUser.password = bcrypt.hashSync(createUser.password, 10);
	const user: Omit<User, 'id'> = {
		...createUser,
		locked: false,
		createdBy: createdBy || createUser.username,
		createdAt: new Date(),
	};
	const userCollection = await getCollection<Omit<User, 'id'>>(USER_COLLECTION);
	return await userCollection.insertOne(user);
};

/**
 * Update a user document in a collection
 *
 * @param {string} _id - The ID of user document
 * @param {Object} updateData - The new data
 * @param {string} updateData.task - The new task
 * @param {boolean} updateData.done - The task status
 * @returns Object of {@link UpdateResult}.
 */
export const update = async (_id: string) => {
	const userCollection = await getCollection<User>(USER_COLLECTION);
	const updatedAt = new Date();
	const done = true;
	return await userCollection.updateOne(
		{ _id: new ObjectId(_id) },
		{ $set: { done, updatedAt } }
	);
};

/**
 * Delete a user document from a collection.
 *
 * @param {string} _id - The ID of user document
 * @returns Object of {@link DeleteResult}.
 */
export const deleteById = async (_id: string) => {
	const userCollection = await getCollection<User>(USER_COLLECTION);
	return await userCollection.deleteOne({ _id: new ObjectId(_id) });
};

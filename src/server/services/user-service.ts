import { ObjectId, WithId } from 'mongodb';
import { USER_COLLECTION } from '../db/db-constant';
import { mapToObject } from '../utils/json-util';
import { getCollection } from '../config/mongodb';
import bcrypt from 'bcryptjs';
import { getSort, PAGE_SIZE } from '../utils/pager-util';
import logger from '../config/winston';

export const find = async ({ page, column, keyword, sort }: RequestParams) => {
	sort = sort || 'createdAt,desc';
	console.log({ page, column, keyword, sort });
	const userCollection = await getCollection<User>(USER_COLLECTION);

	const pipeline = [
		{
			$match: {},
		},
		{
			$project: {
				content: 0,
			},
		},
		{
			$sort: getSort(sort),
		},
		{
			$facet: {
				data: [
					{
						$skip: (page || 0) * PAGE_SIZE,
					},
					{
						$limit: PAGE_SIZE,
					},
				],
				pagination: [
					{
						$count: 'total',
					},
				],
			},
		},
		{
			$unwind: '$pagination',
		},
	];

	if (column && keyword) {
		const regex = new RegExp(keyword, 'i');
		pipeline[0]['$match'] = {
			$and: [
				{
					columns: { $in: [column] },
				},
				{
					$or: [{ username: regex }, { email: regex }],
				},
			],
		};

		logger.info('find : ' + JSON.stringify(pipeline).replaceAll('{}', regex.toString()));
	} else if (!column && keyword) {
		const regex = new RegExp(keyword, 'i');
		pipeline[0]['$match'] = {
			$or: [{ username: regex }, { email: regex }],
		};

		logger.info('find : ' + JSON.stringify(pipeline).replaceAll('{}', regex.toString()));
	} else if (column && !keyword) {
		pipeline[0]['$match'] = {
			columns: { $in: [column] },
		};
		logger.info('find : ' + JSON.stringify(pipeline));
	} else {
		pipeline.shift();
		logger.info('POST.find : ' + JSON.stringify(pipeline));
	}

	const arr = await userCollection.aggregate<Pageable<WithId<User>>>(pipeline).toArray();

	const result: Pageable<Omit<User, 'password'>> = {
		data: [],
		pagination: {
			total: 0,
			totalPage: 0,
			page: 0,
			pageSize: PAGE_SIZE,
		},
		sort,
		keyword,
		column,
	};

	if (arr.length) {
		if (keyword) {
			result.keyword = keyword;
		}

		result.pagination.page = page || 0;
		result.pagination.totalPage = Math.ceil(arr[0].pagination.total / PAGE_SIZE);
		result.pagination.pageSize = PAGE_SIZE;
		result.pagination.total = arr[0].pagination.total;

		result.data = arr[0].data.map(item => {
			const { password, ...obj } = mapToObject(item);
			return obj;
		});

		return result;
	}

	return result;
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
export const update = async (id: string, user: Partial<User>) => {
	const userCollection = await getCollection<User>(USER_COLLECTION);
	user.updatedAt = new Date();
	console.log(user);
	return await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
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

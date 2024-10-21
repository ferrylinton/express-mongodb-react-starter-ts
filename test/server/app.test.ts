import assert from 'assert';
import request from 'supertest';
import app from '../../src/server/app';

describe('GET /api/ping', function () {
	it('should return OK', async function () {
		const response = await request(app)
			.get(`/api/ping`)
			.set('Accept', 'application/json')
			.expect(200);
		assert(response.body.message, 'OK');
	});
});

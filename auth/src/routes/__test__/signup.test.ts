import request from "supertest";
import { app } from '../../app'

it('returns 201 on succefull request', async () => {
  return request(app)
    .post('/api/user/signup')
    .send({
      email: "test@test@test",
      password: "pasword"
    })
    .expect(201);
}
)
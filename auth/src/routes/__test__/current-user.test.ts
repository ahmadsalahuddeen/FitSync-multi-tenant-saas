import request from 'supertest'
import   {app} from '../../app'


it('respond with details of current-user', async ()=>{
  const cookie = await  global.signup()

  const response = await request(app)
  .get('/api/users/currentuser')
  .send()
  .set('Cookie', cookie)
  .expect(200)
expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('returns null if the user is not logged In ', async()=>{
  const response = await request(app)
  .get('/api/users/currentuser')
  .send()
  .expect(200) 
console.log(response.body.currentUser)
  expect(response.body.currentUser).toEqual(null)
})

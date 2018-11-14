import { expect } from 'chai'
import request from 'supertest'

describe('test setup', () => {
  it('should add a document', async () => {
    const tokenResponse = await request('localhost:8081')
      .post('/login')
      .send({ username: 'user', password: '' })
      .expect(200)
    const { token } = tokenResponse.body

    await request('localhost:8082')
      .post('/tree/foobar')
      .set('Cookie', `auth-token=${token}`)
      .send({
        aspects: {
          foo: 'bar',
        }
      })
      .expect(201)

    const response = await request('localhost:8082')
      .get('/tree/foobar')
      .set('Cookie', `auth-token=${token}`)
      .expect(200)

    expect(response.body).to.eql({ aspects: { foo: 'bar' } })

    await request('localhost:8082')
      .delete('/tree/foobar')
      .set('Cookie', `auth-token=${token}`)
      .expect(204)

    await request('localhost:8082')
      .get('/tree/foobar')
      .set('Cookie', `auth-token=${token}`)
      .expect(404)
  })
})

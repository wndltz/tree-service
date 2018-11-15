import { expect } from 'chai'
import request from 'supertest'

const loginUrl = 'localhost:8081'
const treeUrl = 'localhost:8082'

describe('test setup', () => {
  it('should add a document', async () => {
    const tokenResponse = await request(loginUrl)
      .post('/login')
      .send({ username: 'user', password: '' })
      .expect(200)
    const { token } = tokenResponse.body

    await request(treeUrl)
      .post('/tree/foobar')
      .set('Cookie', `auth-token=${token}`)
      .send({
        aspects: {
          foo: 'bar',
        }
      })
      .expect(201)

    const response = await request(treeUrl)
      .get('/tree/foobar')
      .set('Cookie', `auth-token=${token}`)
      .expect(200)

    expect(response.body).to.eql({ aspects: { foo: 'bar' } })

    await request(treeUrl)
      .delete('/tree/foobar')
      .set('Cookie', `auth-token=${token}`)
      .expect(204)

    await request(treeUrl)
      .get('/tree/foobar')
      .set('Cookie', `auth-token=${token}`)
      .expect(404)
  })
})

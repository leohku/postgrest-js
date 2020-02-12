import assert from 'assert'
import { PostgrestClient } from '../../lib'

const rootUrl = 'http://localhost:3000'

describe('PostgrestClient', () => {
  it('should return basic data', async () => {
    let client = new PostgrestClient(rootUrl)
    let { body } = await client
      .from('users')
      .select(`id`)
      .eq('username', 'kiwicopple')
    assert.equal(body.length, 1)
    assert.deepEqual(body, [{ id: 2 }])
  })

  it('should return realtional joins', async () => {
    let client = new PostgrestClient(rootUrl)
    let { body } = await client
      .from('channels')
      .select(`slug, messages(message)`)
      .eq('slug', 'public')
    let hasCorrectMessages = body[0].messages.some(x => x.message == 'Hello World 👋')
    assert.equal(body[0].slug, 'public')
    assert.equal(true, hasCorrectMessages)
  })

  it('should return be able to insert data', async () => {
    let client = new PostgrestClient(rootUrl)
    let res = await client
      .from('messages')
      .insert([{ message: 'Test message', channel_id: 1, user_id: 1 }])
    assert.equal(201, res.status)
  })

  it('should insert data and return the object', async () => {
    let client = new PostgrestClient(rootUrl)
    let res = await client
      .from('messages')
      .insert([{ message: 'Test message', channel_id: 1, user_id: 1 }])
    assert.equal('Test message', res.body[0].message)
  })

  it('should return be able to update messages', async () => {
    let client = new PostgrestClient(rootUrl)
    let res = await client
      .from('messages')
      .eq('message', 'Test message')
      .update({ message: 'Test message 2', channel_id: 1, user_id: 1 })
    assert.equal('Test message 2', res.body[0].message)
  })

  it('should return be able to delete messages', async () => {
    let client = new PostgrestClient(rootUrl)
    let res = await client
      .from('messages')
      .eq('message', 'Test message')
      .delete()
    assert.equal(204, res.status)
  })
})

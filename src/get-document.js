import bucket from './bucket'

export default async function getDocument(id) {
  const result = await bucket.getAsync(id)
  return result.value
}

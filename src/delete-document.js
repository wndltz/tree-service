import bucket from './bucket'

export default async function deleteDocument(id) {
  await bucket().removeAsync(id)
}

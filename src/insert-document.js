import bucket from './bucket'

export default async function insertDocument(id, aspects) {
  await bucket.insertAsync(id, { aspects })
}

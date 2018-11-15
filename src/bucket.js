import couchbase from 'couchbase'
import Bluebird from 'bluebird'

let bucket

export default function() {
  if (bucket) {
    return bucket
  }

  const host = process.env.couchbaseHost || 'localhost'
  const defaultBucket = process.env.couchbaseBucket || 'default'

  const cluster = new couchbase.Cluster(`couchbase://${host}`)
  cluster.authenticate()

  bucket = cluster.openBucket(defaultBucket)
  Bluebird.promisifyAll(bucket)

  return bucket
}

import couchbase from 'couchbase'
import Bluebird from 'bluebird'

const host = 'localhost'
const defaultBucket = 'default'

const cluster = new couchbase.Cluster(`couchbase://${host}`)
cluster.authenticate()

const bucket = cluster.openBucket(defaultBucket)
Bluebird.promisifyAll(bucket)

export default bucket

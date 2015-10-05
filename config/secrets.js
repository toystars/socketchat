
module.exports = {
 db: process.env.MONGO_DB || process.env.MONGOLAB_URI,
 sessionSecret: process.env.SESSION_SECRET
};
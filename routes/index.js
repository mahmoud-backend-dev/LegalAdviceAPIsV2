const userRoute = require('./userRoute');
const criminalDictionaryRoute = require('./criminalDictionaryRoute');
const newRoute = require('./newRoute');
const messageRoute = require('./messageRoute');
const questionRoute = require('./questionRoute');
const orderRoute = require('./orderRoute');
const postRoute = require('./communityRoute')
const videoRoute = require('./videoRoute');
const chatRoute = require('./chatRoute');

const mountRoutes = (app) => {
  app.use('/api/v1/user', userRoute);
  app.use('/api/v1/criminalDictionary', criminalDictionaryRoute);
  app.use('/api/v1/news', newRoute);
  app.use('/api/v1/messages', messageRoute);
  app.use('/api/v1/questions', questionRoute);
  app.use('/api/v1/orders', orderRoute);
  app.use('/api/v1/posts', postRoute);
  app.use('/api/v1/videos', videoRoute);
  app.use('/api/v1/chat', chatRoute);
}

module.exports = mountRoutes;
const Router = require('koa-router');
const uploadControll = require('../controller/upload')
const router = new Router({
  prefix: '/api/app'
});
router.post('/upload-exel', uploadControll.uploadExel)

module.exports = router;
const Koa = require('koa');
const fs = require('fs');
const pdf = require('pdf-lib');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const urllib = require('urllib')
const UploadRouter= require('./router/index')
const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));

app.use(UploadRouter.routes(), UploadRouter.allowedMethods());   /*启动路由*/
app.use(koaStatic('./static'))
app.listen(3000)
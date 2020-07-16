export function handlePdf() {

}
// app.use(async ctx => {
//   const sourcePdfDoc = await pdf.PDFDocument.load(fs.readFileSync('./public/1.pdf'));
//   // 创建新的文档
//   const doc = await pdf.PDFDocument.create();
//   let arr = [0, 1, 2, 3, 4];
//   const copyPage = await doc.copyPages(sourcePdfDoc, arr);
//   // 要复制的文件列表
//   for (let page of copyPage) {
//     doc.addPage(page);
//   }
//   fs.writeFileSync('./static/test.pdf', await doc.save());
//   // console.log(sourcePdfDoc.getPageCount());
//   ctx.body = 'hello world';
// })
function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./static/test.pdf', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    });
  })
}
app.use(async (ctx, next) => {
  if (ctx.url.indexOf('test.pdf') !== -1) {
    // let file =await urllib.request('http://192.168.31.33:3000/test.pdf');
    let file = fs.createReadStream('http://192.168.31.33:3000/test.pdf');
    console.log(file);
    // 获取远程文件
    ctx.body = file;
    // 服务器本地文件
    // ctx.set('Content-disposition', 'attachment;filename=test.pdf');
    // ctx.body = await readFile();
  } else {
    await next();
  }
})
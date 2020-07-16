const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const downPath = path.resolve(__dirname, '../fileUpload')
async function uploadExel(ctx, next) {
  const file = ctx.request.files.file; //读取上传文件
  const reader = fs.createReadStream(file.path); //创建可读流
  const ext = file.name.split('.').pop();
  const filePath = `${downPath}/${Math.random().toString()}.${ext}`;
  const upStream = fs.createWriteStream(filePath); // 创建可写流
  const getRes = await getFile(reader, upStream); //等待数据存储完成

  if (!getRes) {
    const workbook = xlsx.parse(filePath);
    console.log(workbook);
    const [{data}] = workbook;
    const [tableTitle, tableHead, ...tableData] = data;


    ctx.body = {
      code: 100,
      message: 'ok',
      data: {
        titel: tableTitle,
        head: tableHead,
        data: tableData
      }
    }
  }


}
function getFile(reader, upStream) {
  return new Promise(function (result) {
    let stream = reader.pipe(upStream); // 可读流通过管道写入可写流
    stream.on('finish', function (err) {
      result(err);
    });
  });
}
module.exports = {
  uploadExel
}
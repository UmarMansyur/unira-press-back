const nodemailer = require('nodemailer');
const ejs = require('ejs')
const { MAIL_USER, MAIL_PASS } = process.env;
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});


async function sendMail(to, subject, html) {
  transport.sendMail({
    from: MAIL_USER || '',
    to,
    subject,
    html
  });
}

async function getHtml(fileName, data) {
  const pathFile = `${__dirname}/../views/${fileName}`;
  return new Promise((resolve, reject) => {
    ejs.renderFile(pathFile, data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function sendingHTMLMail(to, subject, fileName, data) {
  const html = await getHtml(fileName, data);
  sendMail(to, subject, html);
}

module.exports = {
  sendMail, getHtml, sendingHTMLMail
};
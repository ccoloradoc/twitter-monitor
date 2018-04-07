const Facebook = require('commons').Facebook;
const fb = new Facebook();

fb.post('Hey there!', 'https://contactolegislativo.com')
  .then(post => {
    console.log(post)
  })
  .catch(err => console.log(err))

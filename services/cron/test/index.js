const Facebook = require('commons').Facebook;
const fb = new Facebook();

fb.post('Hey there!')
  .then(post => {
    console.log(post)
  })
  .catch(err => console.log(err))

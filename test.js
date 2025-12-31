var generator = require('generate-password');
var password = generator.generate({
      length: 20,
      numbers: true,
      lowercase:true,
      uppercase:true
    });
console.log(password)
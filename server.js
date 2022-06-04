// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.text(), cors());

// Set up home route

// Set up second page
app.get('/', (req, res) => {
  res.send('This is the homepage');
});
// Set up second page
app.get('/second', (req, res) => {
  res.send('This is the second page');
});

// check if html is valid 
app.post('/validate', (req, res) => {
    const validator = require('html-validate-es');
    const formatter = require('html-validate');
    const validateHtml = new validator.HtmlValidate({
        extends: [
            "html-validate:standard"
          ],
          rules: {
            "doctype-style": "off",
            "require-sri": "off",
            "attribute-boolean-style": "off",
            "no-inline-style": "off"
          }
    });
    const validate = validateHtml.validateString(req.body);
    const formatErrors = formatter.formatterFactory('codeframe');
  res.send({ valid: validate.valid, errors: formatErrors(validate.results) });
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});

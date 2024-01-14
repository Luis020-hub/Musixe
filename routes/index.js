var express = require('express');
var router = express.Router();
const Link = require('../models/link')

async function findByCode(code) {
  try {
    const link = await Link.findOne({
      where: { code: code },
    });

    return link;
  } catch (error) {
    throw new Error(`Erro ao buscar link por código: ${error.message}`);
  }
}

function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

router.get('/:code', async (req, res, next) => {
  const code = req.params.code;
  const resultado = await Link.findOne({ where: { code: code } });

  if (!resultado) {
    return res.status(404).send('HTTP 404 Not Found');
  }

  let url = resultado.url;

  if (!url.startsWith('https://')) {
    url = 'https://' + url;
  }

  res.redirect(url);
});

router.get('/view/:code', async (req, res, next) => {
  const code = req.params.code;

  try {
    const link = await findByCode(code);

    if (!link) {
      return res.status(404).send('HTTP 404 Not Found');
    }

    res.render('view', { title: 'Encurtador Musixe', url: link.url });
  } catch (error) {
    res.status(500).send('Erro interno do servidor');
  }
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Encurtador Musixe' });
});

router.post('/new', async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();

  const resultado = await Link.create({
    url,
    code,
  });

  res.render('stats', resultado.dataValues);
});

router.delete('/delete', async (req, res) => {
  try {
    const codeToDelete = req.body.code;

    if (!codeToDelete) {
      return res.status(400).send('HTTP 400 Bad Request');
    }

    const resultado = await Link.destroy({
      where: { code: codeToDelete },
    });

    if (resultado === 1) {
      res.status(202).send('HTTP 202 Accepted');
    } else {
      res.status(404).send('HTTP 404 Not Found');
    }
  } catch (erro) {
    console.error(erro);
    res.status(500).send('HTTP 500 Internal Server Error');
  }
});

router.put('/:code', async (req, res) => {
  const code = req.params.code;
  const { url } = req.body;

  try {
    const linkExistente = await findByCode(code);

    if (!linkExistente) {
      return res.status(404).send('HTTP 404 Not Found');
    }

    linkExistente.url = url;
    await linkExistente.save();

    res.status(200).send('HTTP 200 Ok');
  } catch (error) {
    console.error(error);
    res.status(500).send('HTTP 500 Internal Server Error');
  }
});

module.exports = router;
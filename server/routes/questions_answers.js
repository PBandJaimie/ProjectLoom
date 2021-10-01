const router = require('express').Router();
const axios = require('axios');
const { apiToken, questionsURL } = require('./../../config.js');

router.get('/initialQA', (req, res) => {
  axios.get(`${questionsURL}qa/questions`, {
    method: 'GET',
    headers: {
      Authorization: apiToken
    },
    params: {
      product_id: (Number(req.query.product_id) - 47420),
      count: 50
    }
  })
    .then((response) => {
      res.json(response.data.results);
      res.end();
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put('/likeQuestion', (req, res) => {
  axios.put(`${questionsURL}qa/questions/${req.body.id}/helpful`, {
    question_id: req.body.id
  }, {
    headers: {
      Authorization: apiToken
    }
  })
    .then((response) => {
      return axios.get(`${questionsURL}qa/questions`, {
        method: 'GET',
        headers: {
          Authorization: apiToken
        },
        params: {
          product_id: Number(req.body.product) - 47420,
          count: 50
        }
      });
    })
    .then((response) => {
      res.json(response.data.results);
      res.end();
    })
    .catch((err) => {
      console.log('ERROR LIKING ANSWER', err);
      res.send(err);
    });
});

router.put('/likeAnswer', (req, res) => {
  axios.put(`${questionsURL}qa/answers/${req.body.id}/helpful`, {
    answer_id: req.body.id
  }, {
    headers: {
      Authorization: apiToken
    }
  })
    .then((response) => {
      return axios.get(`${questionsURL}qa/questions`, {
        method: 'GET',
        headers: {
          Authorization: apiToken
        },
        params: {
          product_id: Number(req.body.product) - 47420,
          count: 50
        }
      });
    })
    .then((response) => {
      res.json(response.data.results);
      res.end();
    })
    .catch((err) => {
      console.log('ERROR LIKING ANSWER', err);
      res.send(err);
    });
});

router.put('/reportQuestion', (req, res) => {
  axios.put(`${questionsURL}qa/questions/${req.body.id}/report`, {
    question_id: req.body.id
  }, {
    headers: {
      Authorization: apiToken
    }
  })
    .then((response) => {
      return axios.get(`${questionsURL}qa/questions`, {
        method: 'GET',
        headers: {
          Authorization: apiToken
        },
        params: {
          product_id: Number(req.body.product) - 47420,
          count: 50
        }
      });
    })
    .then((response) => {
      res.json(response.data.results);
      res.end();
    })
    .catch((err) => {
      console.log('ERROR REPORTING QUESTION', err);
      res.send(err);
    });
});

router.put('/reportAnswer', (req, res) => {
  axios.put(`${questionsURL}qa/answers/${req.body.id}/report`, {
    question_id: req.body.id
  }, {
    headers: {
      Authorization: apiToken
    }
  })
    .then((response) => {
      return axios.get(`${questionsURL}qa/questions`, {
        method: 'GET',
        headers: {
          Authorization: apiToken
        },
        params: {
          product_id: Number(req.body.product) - 47420,
          count: 50
        }
      });
    })
    .then((response) => {
      res.json(response.data.results);
      res.end();
    })
    .catch((err) => {
      console.log('ERROR REPORTING QUESTION', err);
      res.send(err);
    });
});

router.post('/submitQuestion', (req, res) => {
  axios({
    method: 'POST',
    url: `${questionsURL}qa/questions`,
    headers: {
      Authorization: apiToken
    },
    data: req.body
  })
    .then((response) => {
      return axios.get(`${questionsURL}qa/questions`, {
        method: 'GET',
        headers: {
          Authorization: apiToken
        },
        params: {
          product_id: Number(req.body.product_id) - 47420,
          count: 50
        }
      });
    })
    .then((response) => {
      res.json(response.data.results);
      res.end();
    })
    .catch((err) => {
      console.log('ERROR REPORTING QUESTION', err);
      res.send(err);
    });
});

router.post('/submitAnswer', (req, res) => {
  const answerForm = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  };
  axios({
    method: 'POST',
    url: `${questionsURL}qa/questions/${req.body.qid}/answers`,
    headers: {
      Authorization: apiToken
    },
    data: answerForm
  })
    .then((response) => {
      return axios.get(`${questionsURL}qa/questions`, {
        method: 'GET',
        headers: {
          Authorization: apiToken
        },
        params: {
          product_id: Number(req.body.product_id) - 47420,
          count: 50
        }
      });
    })
    .then((response) => {
      res.json(response.data.results);
      res.end();
    })
    .catch((err) => {
      console.log('ERROR REPORTING QUESTION', err);
      res.send(err);
    });
});

router.post('/logInteraction', (req, res) => {
  axios({
    method: 'POST',
    url: `${questionsURL}interactions`,
    headers: {
      Authorization: apiToken
    },
    data: req.body
  })
    .then((response) => {
      res.send('QA interaction sent');
    })
    .catch((err) => {
      res.send(err);
    });
});

// router.post('/addPhoto', (req, res) => {
//   console.log('adding a photo');
//   axios({
//     method: 'POST',
//     url: 'https://api.imgur.com/3/image',
//     headers: {
//       Authorization:
//     },
//     data: req.body
//   })
//     .then((response) => {
//       res.send('QA interaction sent');
//     })
//     .catch((err) => {
//       res.send('err with interaction', err);
//     });
// });

module.exports = router;

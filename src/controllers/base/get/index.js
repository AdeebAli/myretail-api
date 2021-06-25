const controller = (req, res) => {
  res.status(200).send({ healthCheck: 'OK', message: 'Welcome to the MyRetail API' });
};

module.exports = controller;

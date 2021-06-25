const controller = (req, res) => {
  res.status(200).send(req.params);
};

module.exports = controller;

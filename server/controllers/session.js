const stripeApi = require("../api/stripe");

async function getSessionById(req, res) {
  const { sessionId } = req.params;
  const session = await stripeApi.checkout.sessions.retrieve(sessionId);
  res.json(session);
}

module.exports = {
  getSessionById,
};

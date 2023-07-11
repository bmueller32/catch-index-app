const CatchLog = require("../models/catchlog");

module.exports = {
  index,
  new: newCatch,
};

async function index(req, res) {
  const catchlog = await CatchLog.find({});
  console.log(catchlog);
  console.log(req.user);
  res.render("catchlog/index", { title: "All Catches", catchlog: catchlog });
}

function newCatch(req, res) {
  // render an errorMsg if the create action fails
}

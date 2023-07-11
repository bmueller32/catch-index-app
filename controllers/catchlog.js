const CatchLog = require("../models/catchlog");

module.exports = {
  index,
  show,
  new: newCatch,
  create,
};

async function index(req, res) {
  const catchlog = await CatchLog.find({});
  console.log(catchlog);
  console.log(req.user);
  res.render("catchlog/index", { title: "All Catches", catchlog: catchlog });
}

async function show(req, res) {
  console.log(req.user);

  try {
    //find the catchlog
    const catchlogFromTheDatabase = await CatchlogModel.findById(
      req.params.id
    ).exec();

    console.log(catchlogFromTheDatabase);

    res.render("catchlog/show", {
      catchlog: catchlogFromTheDatabase,
    });
  } catch (err) {
    res.send(err);
  }
}

function newCatch(req, res) {
  // render an errorMsg if the create action fails
  res.render("catchlog/new", { title: "Add Catch", errorMsg: "" });
}

async function create(req, res) {
  try {
    const catchlogFromTheDatabase = await CatchlogModel.create(req.body); //await is waiting for the model to go to db and put contents of the form in the db and come back to the server

    //see what was put in the db
    console.log(catchlogFromTheDatabase);

    //always redirect after CUDing data
    res.redirect(`/catchlog/${catchlogFromTheDatabase._id}`);
  } catch (err) {
    //usually validation error
    console.log(err);
    res.render("catchlog/new", { errorMsg: err.message });
  }
}

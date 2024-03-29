const catchlog = require("../models/catchlog");
const CatchlogModel = require("../models/catchlog");
//export all conroller functions
module.exports = {
  index,
  show,
  new: newCatch,
  create,
  edit,
  update,
};
//retrieve all catches
async function index(req, res) {
  const catchlog = await CatchlogModel.find({});
  console.log(catchlog);
  console.log(req.user);
  res.render("catchlog/index", { title: "All Catches", catchlog: catchlog });
}
//render all catchlogs from db
async function show(req, res) {
  console.log("req.user");

  try {
    //find the catchlog
    const catchlogFromTheDatabase = await CatchlogModel.findById(req.params.id);

    console.log("catch", catchlogFromTheDatabase);

    res.render("catchlog/show", {
      catchlog: catchlogFromTheDatabase,
    });
  } catch (err) {
    res.send(err);
  }
}
// render new catchlog form
function newCatch(req, res) {
  // render an errorMsg if the create action fails
  res.render("catchlog/new", { title: "Add Catch", errorMsg: "" });
}
// create new catchlog in db from newcatch form
async function create(req, res) {
  console.log(req.body);
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


async function edit(req, res) {
    try {
      const catchlogDoc = await CatchlogModel.findOne({
        "_id": req.params.id
       
      });
  
      //if a user is not logged in then redirect
      if (!catchlogDoc) return res.redirect("/catchlog");
  
      //tell client to make a request to this route
      res.render("catchlog/editCatchlog",{catchlog:catchlogDoc}) ; //<-edit? or editCatchlog
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
//update catch
async function update(req, res) {
  console.log(req.body);
  try {
    const catchlogDoc = await CatchlogModel.findOne({
      "_id": req.params.id,
      
    });

    //if a user is not logged in then redirect
    if (!catchlogDoc) return res.redirect("/catchlog");

    // Update the post
    catchlogDoc.species = req.body.species;
    catchlogDoc.weight = req.body.weight;
    catchlogDoc.location = req.body.location,
    catchlogDoc.date = req.body.date;
    catchlogDoc.lure = req.body.lure


    //mutated the catchlogDoc so tell the db to update the database
    await catchlogDoc.save();

    //tell client to make a request to this route
    res.redirect(`/catchlog/${catchlogDoc._id}`);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}



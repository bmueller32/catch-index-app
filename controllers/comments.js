//import catchlog model to be able to communicate with collection in db

const CatchlogModel = require("../models/catchlog");

module.exports = {
  create,
  delete: deleteComment,
};

async function deleteComment(req, res, next) {
  try {
    const catchlogDoc = await CatchlogModel.findOne({
      "comments._id": req.params.id,
      "comments.user": req.user._id,
    });

    //if a user is not logged in then redirect
    if (!catchlogDoc) return res.redirect("/catchlog");
console.log(catchlogDoc)
    //remove comment from catchlog's catchlog comments array on db (.remove is a mongoose method)
    catchlogDoc.comments.remove(req.params.id);

    //mutated the catchlogDoc so tell the db to update the database
    await catchlogDoc.save();

    //tell client to make a request to this route
    res.redirect(`/catchlog/${catchlogDoc._id}`);
  } catch (err) {
    next(err);
  }
}

async function create(req, res) {
  console.log(req.body);
  try {
    const catchFromTheDb = await CatchlogModel.findById(req.params.id);

    //add logged in user properties to req.body
    req.body.user = req.user._id;
    req.body.userName = req.user.userName;
    req.body.userAvatar = req.user.avatar;

    //add the comment (req.body) to the catchlog (catchFromTheDb) we got from the db
    catchFromTheDb.comments.push(req.body);
    //since I mutated the (catchFromTheDb) I have to tell mongodb to save it
    await catchFromTheDb.save();
    //then respond to client
    res.redirect(`/catchlog/${req.params.id}`);
  } catch (err) {
    res.send(err);
  }
}

const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

const newBookModel = async function (req, res) {
  let book = req.body;
  let authorId = req.body.author;
  let publisherId = req.body.publisher;

  //////////////////////////////////3A/////////////////////////////////
  if (!authorId) {
    return res.send("author id must be present it is required");
  }
  let author = await authorModel.findById(authorId); ///
  if (!author) {
    res.send("no author present with the given id");
  }
  if (!publisherId) {
    return res.send("publisher id must be present it is required");
  }
  let publisher = await publisherModel.findById(publisherId);
  if (!publisher) {
    return res.send("publisher id must be present it is required");
  }
  let book_Created = await bookModel.create(book);
  res.send({ data: book_Created });
};

const getBooksWithAuthorDetails = async function (req, res) {
  let specificAuthor = await bookModel
 .find({ _id: "625a86edc984773ea4c10008" })
    .populate("newAuthor")
    .populate("newPublisher");
  res.send({ data: specificAuthor });
};

const updateBooks = async function (req, res) {
  
  let hardCOverPublishers = await publisherModel.find({name : {$in:['Penguin','HarperCollins'] }}).select({_id:1})
  let arrayOfPublishers = []
  
  for (let i = 0; i < hardCOverPublishers.length; i++) {
      let objId = hardCOverPublishers[i]._id 
      arrayOfPublishers.push(objId)
  }
  
  let books = await bookModel.updateMany({publisher: {$in: arrayOfPublishers}},{isHardCover: true})

  res.send({data: books})
}


module.exports.newBookModel = newBookModel;
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
module.exports.updateBooks = updateBooks 



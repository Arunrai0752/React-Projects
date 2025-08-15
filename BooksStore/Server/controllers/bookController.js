import Store from "../models/bookModels.js"; 
export const getBooks = async (req, res) => {
    try {
        const books = await Store.find();
        res.json(books); // Directly sending the array
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const getBooksById = async (req, res) => {
    try {

        const book = await Store.find({ authorID: req.params.id });
        console.log(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addBook = async (req, res , next ) => {

   const {title , author , description , authorID,  category, price } = req.body
   
   
   if(!title || !author ){
       res.json({message: "Author & Title  can't be empty"})
       return;
    }
    console.log("i m Here");
    

    try  {

        const newBook = await Store.create({
            author , title , description ,authorID, category, price
        })

        res.status(200).json(newBook)
        next()
    
   } catch (error) {
    next(error);
    
   }
}


export const editBook = async  (req, res, next) => {


    const {author , title , description , category, price } = req.body
    const bookid = req.params.id
    const book = await Store.findById(bookid);
    const data = {author , title , description , category, price , "_id" : bookid };

    try {

        if(book){
            await Store.findByIdAndUpdate(bookid ,  data, {new: true});
            res.json({"data": data , "message": "Book updated successfully"});
        }
        next()
        
    } catch (error) {

        res.status(404).json({message: "book not Available"})
        
        
    }


  

}

export const deleteBook =  (req, res , next ) => {

    Store.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Book deleted successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        }); 
}


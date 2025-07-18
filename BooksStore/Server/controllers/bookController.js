import Store from "../models/bookModels.js"; 
export const getBooks = async (req, res) => {
    try {
        const books = await Store.find();
        res.json(books); // Directly sending the array
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const getBook =  async  (req, res) => {

   const book =  await Store.findById(req.params.id)
    res.json(book)

}

export const addBook = async (req, res , next ) => {

   const {title , author , description , category, price } = req.body

   if(!title || !author ){
    res.json({message: "Author & Title  can't be empty"})
    return;
   }

    try  {

        const newBook = await Store.create({
            author , title , description , category, price
        })

        res.status(200).json(newBook)
        next()
    
   } catch (error) {
    next(error);
    
   }
}


export const editBook = async  (req, res, next) => {


    const {author , title , description , category, price } = req.body
    const book = await Store.findById(req.params.id);

    try {

        if(book){
            await Store.findByIdAndUpdate(req.params.id , req.body, {new: true});
            res.json({author , title , description , category, price})
        }
        next()
        
    } catch (error) {

        res.status(404).json({message: "book not Available"})
        
        
    }


  

}

export const deleteBook =  (req, res) => {

    res.json({ message: "Hello" });

}


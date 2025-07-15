import Store from "../models/bookModels.js"; 
export const getBook =  (req, res) => {

    res.json({ message: "Hello" });

}

export const addBook = async (req, res) => {

   const {author , title , description , category, price } = req.body

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

export const editBook =  (req, res) => {

    res.json({ message: "Hello" });

}

export const deleteBook =  (req, res) => {

    res.json({ message: "Hello" });

}


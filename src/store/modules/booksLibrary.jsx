import axios from 'axios';
import {handleString, handleAuthors, fixFormatDate} from '../../components/textService'

const EDIT_BOOK = "EDIT_BOOK";
const UPDATE_LIBRARY = "UPDATE_LIBRARY";
const ADD_BOOK = "ADD_BOOK"

const initalState = {
    books: null,
  };

export default (state=initalState,action) => {
    switch(action.type){
        case "EDIT_BOOK":{
            state={...state,
                books: state.books.map( b => {b.id === action.payload.id ? b = action.payload : action.payload=action.payload; return b})
            }
            break;
        }
        case "UPDATE_LIBRARY":{
            state={books:action.payload}
            break;
        }
        case "ADD_BOOK":{
            state.books.unshift(action.payload)
            state={ ...state}
            break;
        }
        default: break;
    }
    return state;
}

const editBookReq = appId => ({
    type: EDIT_BOOK,
    payload: appId
});

const updateLibraryReq = books => ({
    type: UPDATE_LIBRARY,
    payload: books
});

const AddBookReq = book =>({
    type: ADD_BOOK,
    payload: book
});
export const getBooksFromGoogle = () => async(dispatch) => {
    var search = 'Disney World'
    await axios.get('https://www.googleapis.com/books/v1/volumes?q='+search)
    .then(res => res.data)
    .then(
        (results) => {
            let bookList = []
            results.items.map(book => {return bookList.push({
                id: book.id,
                author: handleAuthors(book.volumeInfo.authors) || 'Unknown',
                publishedDate: book.volumeInfo.publishedDate ? fixFormatDate(book.volumeInfo.publishedDate) : 'Unknown',
                bookName: handleString(book.volumeInfo.title),
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null
            })})
            dispatch(updateLibraryReq(bookList))
        },
        (error) => {
            console.log(error)
            dispatch(updateLibraryReq([]))
        }
    )
}

export const deleteBook = (bookId) => async(dispatch,state) => {
    const newBookList = state().booksLibrary.books.filter( b => b.id !== bookId)
    dispatch(updateLibraryReq(newBookList))
}

export const editBook = book =>  async(dispatch)  => {
    dispatch(editBookReq(book))
}

export const addBook = book =>  async(dispatch)  => {
    dispatch(AddBookReq(book))
}
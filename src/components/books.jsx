import React, { Component } from 'react';
import Book from './book'
import Spinner from '../images/Spinner-1s-200px.gif'
import {checkNotExistNameBookService} from './textService'

class Books extends Component {
    state = { 
        bookList: this.props.booksLibrary,
    }

    async componentWillReceiveProps(){
        this.setState({bookList:this.props.booksLibrary})
    }

    handleEdit = async(book) => {
        await this.props.editBook(book)
        this.setState({bookList:this.props.booksLibrary})
    }

    handleDelete = async (bookId) => {
        await this.props.deleteBook(bookId)
        this.setState({bookList:this.props.booksLibrary})
    }

    checkNotExistNameBook =(id,name)=>{
        return checkNotExistNameBookService(id,name,this.state.bookList)
    }

    render() { 
        return (
            <div className="album py-5" style={{backgroundColor:'#FFFFFF'}}>
                <div className="container">
                    <div className="row">
                        {this.state.bookList ?
                            this.state.bookList.length>0 
                            ?
                            this.state.bookList.map(book => (
                                <div className='col-lg-3 col-md-4 col-xs-6 d-flex align-items-stretch' key={book.id} >
                                    <Book 
                                    book={book} 
                                    onDelete={this.handleDelete}
                                    onEdit={this.handleEdit}
                                    checkNotExistNameBook={this.checkNotExistNameBook}
                                    /> 
                                </div> 
                            ))
                            : 
                            <h2 className='m-4'>The Books Library Is Empty</h2>
                            :
                            <img style={{marginLeft: '35%'}} src={Spinner} alt='spinner'/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Books
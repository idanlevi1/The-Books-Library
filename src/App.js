import React, { Component } from 'react';
import NavBar from './components/navBar'
import Books from './components/books'
import {connect} from 'react-redux'
import {getBooksFromGoogle, deleteBook, editBook, addBook} from './store/modules/booksLibrary'
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookOpen, faPencilAlt, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faBookOpen,faPencilAlt,faTrashAlt,faPlusCircle)

class App extends Component {
  state = { 
    bookList: this.props.booksLibrary,
  }

  async componentDidMount(){
    await this.props.getBooksFromGoogle()
    this.setState({bookList:this.props.booksLibrary})
  }

  handleAdd = async(book) => {
    await this.props.addBook(book)
    this.setState({bookList:this.props.booksLibrary})
  }

  render() {
    return (
      <div style={{background:'#F7F7F7'}}>
        <NavBar
        booksLibrary={this.props.booksLibrary}
        handleAdd={this.handleAdd}
        />
        <main className='container' style={{backgroundColor:'#DFE3EE',  position: 'relative',minHeight: '-webkit-fill-available'}} >
          <Books 
          booksLibrary={this.props.booksLibrary}
          deleteBook={this.props.deleteBook}
          editBook={this.props.editBook}
          />
        </main>
        <footer 
        className="page-footer font-small blue"
        style={{color:'#FFF', backgroundColor: '#BE9EC9',borderTopColor :'#DFE3EE', borderTopWidth :2, borderTopStyle:'solid'}}>
          <div className="footer-copyright text-center py-3">Idan Levi © The Book Library 2018</div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return ({
    booksLibrary: state.booksLibrary.books,
  })
}

export default connect(mapStateToProps,{getBooksFromGoogle,deleteBook,editBook,addBook})(App);
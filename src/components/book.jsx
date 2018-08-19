import React, { Component } from 'react'
import HandelBookModal from './handelBookModal'
import DeleteBookModal from './deleteBookModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import noCover from '../images/noCover.jpg'
import './book.css'

class Book extends Component {
    state={
        editMode:false,
        deleteMode:false,
    }

    titleStyle = (title) => {
        if(title.length > 35)
            return {height:40,fontSize: 14}
        else
            return {height:40,fontSize: 16}
    };

    render() {
        const {book,onEdit,onDelete} = this.props
        return(
            <div className='card m-1' style={{flex:1,backgroundColor:'#87bdd8'}}>
                { this.state.editMode && 
                    <HandelBookModal
                    mode='Edit'
                    book={book}
                    onEdit={onEdit} 
                    closeModal={()=>{this.setState({editMode:false})}}
                    checkNotExistNameBook={this.props.checkNotExistNameBook}
                    /> 
                }    
                { this.state.deleteMode && 
                    <DeleteBookModal
                    bookName={book.bookName}
                    bookId={book.id}
                    onDelete={onDelete}
                    closeModal={()=>{this.setState({deleteMode:false})}}
                    /> 
                }    
                <img className='card-img-top bookImg' src={book.image ? book.image : noCover } alt='Card cap'/>
                <div className='card-body' style={{padding:0}}>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <h5 className='card-title' style={this.titleStyle(book.bookName)}>{book.bookName}</h5>
                        </li>
                        <li className="list-group-item" style={{height:30}}>
                        <p className='card-text' style={{fontSize:12}}><b>Published date:</b> {book.author}</p>
                        </li>
                        <li className="list-group-item" style={{height:30}}>
                            <p className='card-text' style={{fontSize:12}}><b>Published date:</b> {book.publishedDate}</p>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button onClick={()=>this.setState({editMode:true})} className='btn btn-warning btn-sm m-1' style={{color:'#FFFFFF'}}>
                            <FontAwesomeIcon style={{marginRight:5}} size="1x" color={'#FFFFFF'} icon={'pencil-alt'} />
                            <b>Edit</b>
                          </button>
                          <button onClick={()=>this.setState({deleteMode:true})} className='btn btn-danger btn-sm m-1'>
                            <FontAwesomeIcon style={{marginRight:5}} size="1x" color={'#FFFFFF'} icon={'trash-alt'} />
                            <b>Delete</b>
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Book;
import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import {validateBookDetails} from './textService'
import noCover from '../images/noCover.jpg'

class HandelBookModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookName: this.props.mode==='Edit' ? this.props.book.bookName : '',
      author: this.props.mode==='Edit' ? this.props.book.author : '',
      publishedDate: this.props.mode==='Edit' ? this.props.book.publishedDate : '',
      errorMsgBookName:'',
      errorMsgAuthor: '',
      errorMsgPublishedDate: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event,field) {
    if(field==='bookName')
        this.setState({bookName: event.target.value})
    else if(field==='author')
        this.setState({author: event.target.value})
    else if(field==='publishedDate')
        this.setState({publishedDate: event.target.value})
  }

  handleSubmit() {
    let res = validateBookDetails(this.state)
    let editMode = this.props.mode==='Edit'
    let bookId = null
    editMode ? bookId = this.props.book.id : bookId = this.props.makeUniqueId()
    let notExist = this.props.checkNotExistNameBook(bookId,res.fixBookName)
    if(!notExist) 
      res.bookNameRes='The Name Already Exist!'
    if(res.valid){
      if(notExist){
        let _book = {
            id:bookId,
            bookName: res.fixBookName,
            author: this.state.author,
            publishedDate:this.state.publishedDate,
            image: editMode ? this.props.book.image : noCover
        }
        editMode ? this.props.onEdit(_book) : this.props.onAdd(_book)
        this.props.closeModal()
      }
      else
        this.setState({
          errorMsgBookName:res.bookNameRes,
          errorMsgAuthor:res.authorRes,
          errorMsgPublishedDate:res.publishedDateRes,
        })
    }
    else{
      this.setState({
        errorMsgBookName:res.bookNameRes,
        errorMsgAuthor:res.authorRes,
        errorMsgPublishedDate:res.publishedDateRes,
      })
    }
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header style={{backgroundColor:'#e1e8ed',borderStyle: "solid",borderWidth:1,borderColor:'#BE9EC9'}}>
            <Modal.Title>
              {this.props.mode==='Edit' ? 'Edit Book' : 'Add New Book'}
              {this.props.mode==='Edit' ? <p style={{fontSize:12,margin:0,color:'darkmagenta'}}>Book ID: {this.props.book.id}</p> : null}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{borderLeftStyle: "solid",borderLeftWidth:1,borderLeftColor:'#BE9EC9',borderRightStyle: "solid",borderRightWidth:1,borderRightColor:'#BE9EC9'}}>
            <form>
              <label style={{width: '75%'}}>
                <b>Book Name:</b>
                <input value={this.state.bookName} onChange={(event)=>this.handleChange(event,'bookName')} className='form-control' type='text' name='name' placeholder='Book Name' />
                <p className='text-danger'>{this.state.errorMsgBookName}</p>
              </label>
            </form>
            <form>
              <label>
                <b>Author:</b>
                <input value={this.state.author} onChange={(event)=>this.handleChange(event,'author')} className='form-control' type='text' name='name' placeholder='Author' />
                <p className='text-danger'>{this.state.errorMsgAuthor}</p>
              </label>
            </form>
            <form>
              <label>
              <b>Publishrd Date:</b>
                <input value={this.state.publishedDate} onChange={(event)=>this.handleChange(event,'publishedDate')} className='form-control' type='text' name='name' placeholder='Publishrd Date' />
                <p className='text-danger'>{this.state.errorMsgPublishedDate}</p>
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer style={{backgroundColor:'#e1e8ed',borderStyle: "solid",borderWidth:1,borderColor:'#BE9EC9'}}>
            <Button bsStyle='danger' onClick={this.props.closeModal}>Close</Button>
            <Button bsStyle='success' onClick={this.handleSubmit}>Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default HandelBookModal;

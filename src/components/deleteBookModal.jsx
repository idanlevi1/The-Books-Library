import React from 'react';
import {Button, Modal} from 'react-bootstrap';

const DeleteBookModal = (props) => {
  return( 
    <div className='static-modal'>
      <Modal.Dialog>
        <Modal.Header style={{backgroundColor:'#e1e8ed',borderStyle: "solid",borderWidth:1,borderColor:'#BE9EC9'}}>
          <Modal.Title>Are you sure to delete this book?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{borderLeftStyle: "solid",borderLeftWidth:1,borderLeftColor:'#BE9EC9',borderRightStyle: "solid",borderRightWidth:1,borderRightColor:'#BE9EC9'}}>
          <label><b>{props.bookName}</b></label>
          <p style={{fontSize:12,margin:0,color:'darkmagenta'}}><b>Book ID:</b> {props.bookId}</p>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'#e1e8ed',borderStyle: "solid",borderWidth:1,borderColor:'#BE9EC9'}}>
          <Button bsStyle='warning' onClick={props.closeModal}>Cancel</Button>
          <Button bsStyle='danger' onClick={()=>props.onDelete(props.bookId)}>Ok</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  ); 
}
 
export default DeleteBookModal;

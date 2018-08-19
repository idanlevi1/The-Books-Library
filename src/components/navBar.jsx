import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HandelBookModal from './handelBookModal'
import {checkNotExistNameBookService,makeUniqueId} from './textService'

class NavBar extends Component {
  state = {addMode:false,}

  checkNotExistNameBook =(id,name)=>{
    return checkNotExistNameBookService(id,name,this.props.booksLibrary)
  }

  render() {
    return (
      <nav
        style={{ backgroundColor: '#7B0099',borderBottomColor :'#BE9EC9', borderBottomWidth :2, borderBottomStyle:'solid' }}
        className='navbar navbar-expand-lg '
      >
        <a className='navbar-brand' style={{ textDecoration: 'none'}} href='/'>
          <div className='row'>
            <FontAwesomeIcon
              style={this.iconStyle}
              size='lg'
              color={'#FFFFFF'}
              icon={'book-open'}
            />
            <h4 style={{ color: '#FFFFFF',paddingTop:4 }}>The Books Library</h4>
          </div>
        </a>
        <div className='navbar-brand'>
          <ul className='navbar-nav mr-auto' style={{ marginLeft: 15 }}>
            <li className='nav-item'>
              <button onClick={() =>this.setState({addMode:true})} className='btn btn-sm' style={{background:'#c61aff',borderColor:'#f2ccff',color:'#FFF'}}>
                <FontAwesomeIcon
                  style={{ marginRight: 5 }}
                  size='lg'
                  color={'#FFFFFF'}
                  icon={'plus-circle'}
                />
                <b>New Book</b>
              </button>
            </li>
          </ul>
        </div>
        { this.state.addMode && 
          <HandelBookModal
          mode='Add'
          makeUniqueId={() => {return makeUniqueId(this.props.booksLibrary)}}
          onAdd={this.props.handleAdd} 
          closeModal={()=>{this.setState({addMode:false})}}
          checkNotExistNameBook={this.checkNotExistNameBook}
          /> 
      }    
      </nav>
    );
  }

  iconStyle = {
    marginTop: 6,
    marginLeft: 10,
    marginRight: 12
  };
}

export default NavBar
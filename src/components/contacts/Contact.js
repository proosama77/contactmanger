import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../Context';
import axios from 'axios'
import {Link} from 'react-router-dom'
class Contact extends Component{

    state={
        showInfo:false
    }
    onShowInfoClick=()=>{
      this.setState(
          {
              showInfo:!this.state.showInfo
          }
      )
     
    }
    onDeleteClick=async (dispatch,id)=>{
       await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        
            dispatch({type:"DELETE_CONTACT",payload:id})
      
        
    }
    
    render (){
        const {id,name,email,phone}=this.props.contact
        const {showInfo} =this.state
        return (
            <Consumer>
                {value=>{
                    const {dispatch} =value
                    return(
                        <div className='card card-body mb-3'>
          
                          <h4>{name}{"  "}
                          <i className="fas fa-sort-down" 
                            onClick={this.onShowInfoClick} style={{cursor:'pointer'}}
                          ></i>
                             <i className="fas fa-times" onClick={this.onDeleteClick.bind(this,dispatch,id)}
                                      style={{cursor:'pointer' ,color:'red',float:"right"}}
                                      ></i>   
                        <Link to={`contact/edit/${id}`}>
                      <i
                        className="fas fa-pencil-alt"
                        style={{
                        cursor: 'pointer',
                        float: 'right',
                        color: 'black',
                        marginRight: '1rem'
                    }}
                  />
                    </Link>

                          </h4>
                          {showInfo ? ( <ul className='list-group mb-3'>
                             <li className='list-group-item'>{email}</li>
                             <li className='list-group-item'>{phone}</li>
                          </ul>):null}
              
                      </div>
                    )
                          
                }}
            </Consumer>
        )
    }
   
}
 Contact.propTypes=
  {
   contact:PropTypes.object.isRequired
   
  }
       
export default Contact
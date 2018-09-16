import React , {Component} from 'react'
import { Consumer } from '../Context';
import uuid from 'uuid'
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios'

class AddContacts extends Component {
  state={
      id:uuid(),
      name:'',
      email:'',
      phone:'',
      errors:{}
  
  }
   
   onChange=(e)=>{this.setState({
       [e.target.name]:e.target.value
   })
   }
   onSubmit= async (dispatch,e)=>{
       const {name,email,phone}=this.state
       e.preventDefault()
       if(name===""){
            this.setState({errors:{name:"Name is required"}})
            return;
       }

       if(email===""){
           this.setState({errors:{email:"Email is required"}})
        return;
   }

       if(phone===""){
           this.setState({errors:{phone:"Phone is required"}})
        return;
}
       const newContact=this.state
       
        const res= await axios.post("https://jsonplaceholder.typicode.com/users",newContact);
        dispatch({type:"ADD_CONTACT",payload:res.data})

       this.setState({
           name:"",
           email:"",
           phone:"",
           errors:{}
       })
       this.props.history.push("/")
}
    
     render (){
        const {name,email,phone,errors} =this.state
         return (
             <Consumer>
                 {value=>{
                     const {dispatch}=value
        return (
            <div className='card mb-3'>
               <div className="card-header">Add Contact</div>
               <div className="card-body">
                <form  onSubmit={this.onSubmit.bind(this,dispatch)} >
                  
                   <TextInputGroup
                     label="Name:"
                     name="name"
                     value={name}
                     placeholder="Enter Name .."
                     onChange={this.onChange}
                     error={errors.name}
                   >
                   </TextInputGroup>                   
                   <TextInputGroup
                     label="Email:"
                     name="email"
                     type="email"
                     value={email}
                     placeholder="Enter Email .."
                     onChange={this.onChange}
                     error={errors.email}
                   >
                   </TextInputGroup> 

                   <TextInputGroup
                     label="Phone:"
                     name="phone"
                     value={phone}
                     type="text"
                     placeholder="Enter Phone .."
                     onChange={this.onChange}
                     error={errors.phone}
                   >
                   </TextInputGroup>     
                   
                  <div className="form-group">
                  <input type="submit" value="Add Contact"
                    className="btn btn-light btn-block my-3">
                    </input>
                    </div>
                    
                </form>
               </div>
               </div>
        )
                 }}
             </Consumer>
         )
     }
    
}

export default AddContacts

import React , {Component} from 'react'
import { Consumer } from '../Context';
import uuid from 'uuid'
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios'

class EditContacts extends Component {
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



//    async  componentDidMount(){
//     const id=  this.props.match.params.id
//     const res=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
//     this.setState({
//         name:res.data.name,
//         email:res.data.email,
//         phone:res.data.phone
//     })
// }

async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
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
       
    //    const updateContact={
    //        name,
    //        email,
    //        phone
    //    }
    //    const id=  this.props.match.params.id
    //     const res= axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updateContact);
    //      dispatch({type:"UPDATE_CONTACT",payload:res.data})
        

    const updContact = {
        name,
        email,
        phone
      };
  
      const { id } = this.props.match.params;
  
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updContact
      );
  
      dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

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
               <div className="card-header">Edit Contact</div>
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
                  <input type="submit" value="Edit Contact"
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

export default EditContacts

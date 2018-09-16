import React ,{Component} from 'react'
import axios from 'axios'

const Context=React.createContext()

const reducer=(state,action)=>{
    switch(action.type){
        case 'DELETE_CONTACT':
           return {...state,
            contacts:state.contacts.filter((contact)=>contact.id!==action.payload   
             )
           }
           case "ADD_CONTACT":
               return {...state, 
                contacts:[action.payload,...state.contacts]
               }
            //    case 'UPDATE_CONTACT':
            //    return {...state,
            //     contacts:state.contacts.map((contact)=>
            //     contact.id===action.payload.id ? 
            //     (contact=action.payload )
            //     : contact
            //      )
            //    }
            case 'UPDATE_CONTACT':
            return {
              ...state,
              contacts: state.contacts.map(
                contact =>
                  contact.id === action.payload.id
                    ? (contact = action.payload)
                    : contact
              )
            };
        default:
           return state
    }
    
}

export class Provider extends Component{
    state={
        contacts:[
            // {
            // id:1,
            // name:'osama',
            // email:'os@gmail.com',
            // phone:333-444-3333
            // } ,
            // {
            //  id:2,
            //  name:'Ali',
            //  email:'ali@gmail.com',
            //  phone:333-444-3333
            //  } ,
            //  {
            //   id:3,
            //      name:'Noor',
            //      email:'noor@gmail.com',
            //      phone:111-555-333
            //  } 
         ],
         dispatch:action=>this.setState(state=>reducer(state,action))
         

    }
     componentDidMount=async ()=>{
      const res= await  axios.get("https://jsonplaceholder.typicode.com/users");
         this.setState({contacts:res.data})
     }
    render(){
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer=Context.Consumer
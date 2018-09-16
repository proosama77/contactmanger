import React from "react"
import PropTypes from 'prop-types'
import classnames from "classnames"

const TextInputGroup=({
    name,label,placeholder,type,onChange,value,error
}

)=>{
    return (
        <div className="form-group">
        <label htmlFor={name}>{label}</label>
       <input name={name} 
       placeholder={placeholder}
        className={classnames("form-control form-control-lg",{"is-invalid":error})
    }
        type={type}
        value={value} 
        onChange={onChange}
        error={error}
        ></input>
    {error&&<div className="invalid-feedback">{error}</div>}
      </div>
    ) ;

  }
  TextInputGroup.defaultProps={
      type:"text"
  }
  TextInputGroup.propTypes={
       name:PropTypes.string.isRequired,
       label:PropTypes.string.isRequired,
       placeholder:PropTypes.string.isRequired,
       type:PropTypes.string.isRequired,
       value:PropTypes.string.isRequired,
       onChange:PropTypes.func.isRequired,
    //    error:PropTypes.string.isRequired
  }
export default TextInputGroup
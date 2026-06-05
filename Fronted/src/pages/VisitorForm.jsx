import React from 'react'

const VisitorForm = () => {
  return (
    
    <div className="visitor-form">
      <div className="form">
        <div className="back"><button className="back-button">← Back</button></div>
        <div className="int"><h1>Visitor's Form</h1></div>
        <div className="int"><input className="inputs" type="text"  placeholder="Enter your name.."/></div>
        <div className="int"><input className="inputs" type="email" placeholder="Enter your email.."/></div>
        <div className="int"><input className="inputs" type="text"  placeholder="Enter your purpose.."/></div>
        <div className="int"><input className="inputs" type="date"/></div>
        <div className="int"><input className="inputs-img" type="file"  /></div>
        <div className="int"><button className="submit">Submit</button></div>
      </div>
    </div>
  )
}

export default VisitorForm

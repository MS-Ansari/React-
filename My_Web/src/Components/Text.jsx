      import React, { useState }  from 'react'


      const Text = (props) => {
        const handleUpClick= ()=>{
          // console.log("Upper Case was clicked"+text);
          let newText=text.toUpperCase();
          setText(newText);
          props.showAlert("Converted to upper case","success");
        }
        const handleLoClick= ()=>{
          let newText=text.toLowerCase();
          setText(newText);
          props.showAlert("Converted to lower case","success");

        }
        const removeText = () => {
          setText(''); // Clear the text by setting it to an empty string
          props.showAlert("Remove All Texts.","success");

        };
        const handleOnChange= (event)=>{
          // console.log("handle On Change ");
          setText(event.target.value);
        }
        const [text, setText] = useState('');//imp syntex

        const handleExtraSpace =()=>
        {
          let newText = text.split(/[ ]+/);
          setText (newText.join(" "))
          props.showAlert("Remove extra spaces","success");

        }
        const handleCopy =()=>
        {
          var text = document.getElementById("myBox");
          text.select();
          navigator.clipboard.writeText(text.value);
          props.showAlert("Copy All Texts.","success");

        
        }


        return (
      <>
          <div className='container' style={{color: props.mode==='dark'?'white':'#061731'}}>
          <h1>{props.heading}</h1>
      <div className="mb-3">
      <textarea className="form-control" value={text} style={{backgroundColor:props.mode==='dark'?'grey':'white' ,color :props.mode==='dark'?'white':'#061731'}} onChange={handleOnChange} id="myBox" rows="8">  </textarea>
      </div>
      <button className="btn btn-primary mx-2"onClick={handleUpClick}>convert to uppercase</button>
      <button className="btn btn-primary mx-2"onClick={handleLoClick}>convert to lowercase</button>
      <button className="btn btn-danger mx-2"onClick={removeText}>remove all text</button>
      <button className="btn btn-primary mx-2"onClick={handleExtraSpace}>Remove extra spce</button>
      <button className="btn btn-primary mx-2"onClick={handleCopy}>Copy Text </button>



      </div>
      <div className="class container my-3" style={{color:props.mode==='dark'?'white':'#061731'}}>
      <h2>Your Text Summary</h2>
      <p>{text.split(" ").length} words and {text.length} characters</p>
      <p>{0.008 * text.split(" ").length} Minutes to read</p>
      <h2>Preview</h2>
      <p>{text.length>0?text:"Enter something in the above textBox to preview."}</p>
      </div>


      </>
        )
      }

      export default Text




      // rafc is a shortcut for arrow function
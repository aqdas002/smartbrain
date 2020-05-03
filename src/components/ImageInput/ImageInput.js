import React from 'react';
import './ImageInput.css';
const ImageInput= ({onInputChange , onSubmit}) => {
	return (
          <div >
          <p className='f3'>
              {'This Magic brain will detect faces in your picture. Give it a try'}
          </p>
          <div className='center'>
          <div className='pa4 br3 shadow-5 form center'>
          <input className ='f4 pa2 w-70 'type='text'
               onChange = {onInputChange}/>
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue center'
               onClick={onSubmit}>Detect</button>
          </div>
          </div>
          </div>
		);

}


export default ImageInput;
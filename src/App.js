import React , {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageInput from './components/ImageInput/ImageInput';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const app =new Clarifai.App({
  apiKey: '8f1f4fba6d3940078e5b5c8f33dc1aa8'
});
const particleoptions={
                particles: {
                  number: {
                    value: 50,
                    density: {
                      enable: true,
                      value_area: 800
                    }
                    }
                  },
                  interactivity:{detect_on:'canvas',
                      events:
                        {onhover:
                            {enable:true,
                                mode:'repulse'},
                                onclick:
                            {enable:true,mode:'push'},
                          resize:true}
                  }
                }

              
class App extends Component {

constructor() {
  super();
  this.state ={
    input:'',
    imageUrl:'',
    box:{},
    route:'signin',
    isSignedIn:false
  }
}

calculateFaceLocation = (data) => {
const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
const image= document.getElementById('inputImage');
const width= Number(image.width);
const height = Number(image.height);
console.log(height,width);
return{
  leftCol: clarifaiFace.left_col *width,
  topRow : clarifaiFace.top_row * height,
  rightCol: width -(clarifaiFace.right_col *width),
  bottomRow: height -(clarifaiFace.bottom_row * height),

}
}


displayFaceBox = (box) => {
  this.setState({box:box});
}
onInputChange = (event) => {
  this.setState({input:event.target.value});
}
onSubmit =()=> {
  this.setState({imageUrl:this.state.input})
  app.models
.predict(
Clarifai.FACE_DETECT_MODEL,
    // URL
    this.state.input
)
.then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
 .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if(route==='signout'){
    this.setState({isSignedIn:false})
  }
  else if (route==='home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route});
}

  render(){
    return (
     <div className="App">
       <Particles className= 'particles' params={particleoptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route==='home'?
        <div>
        <Logo/>
        <Rank/>
        <ImageInput  onInputChange={this.onInputChange}
                      onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>:
        ( this.state.route==='signin' ? <Signin onRouteChange={this.onRouteChange}/>
        : <Register onRouteChange={this.onRouteChange}/>)
        }</div>

        );
  }
}


export default App;
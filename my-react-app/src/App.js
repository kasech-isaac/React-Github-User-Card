import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component{
    constructor() {
      console.log("constructor")
    super();
    this.state = {
      users: [],
      followers:[
        "TommyGunzz",
        "cmrivera",
        "Furnowest"
      ]
    };
  }

  componentDidMount(){
    console.log("CDM running")
    axios.get('https://api.github.com/users/kasech-isaac')
    .then(res => {
      console.log("respond", res);
      this.setState({users: res.data})  
})
.catch((err)=> console.log(err))
    .then()
  axios.get('https://api.github.com/users/kasech-isaac/followers')
  .then(res => {
    this.setState({followers: res.data})
    console.log("followers", res);
})
.catch((err)=>console.log(err))

  }

  componentDidUpdate(prevState){
    if (prevState.user !== this.state.users) {
      console.log("chang")
    }
    if (prevState.followers !== this.state.followers) {
      console.log("State updated", this.state.usersType);
    }
    
  }

  fetchUsers= () => {
    axios.get('https://api.github.com/users/kasech-isaac')
      .then((res) => {
        this.setState({user: res.data})
      })
      .catch((err) => console.log(err));
  };
  handleChanges = (e) => {
    console.log("handleChanges called",this.state.usersType);
    this.setState({ ...this.state,
      usersType: e.target.value
    });
  };

  render(){
  return (
    <div className="App">
      <h1>Github Users</h1>
      <input 
      type="text"
      value={this.state.usersType}
      onChange={this.handleChanges}/>
      <button onClick={this.fetchUsers}>Fetch users</button>
      <div className="users">
  <img width="200" className="user" src={this.state.users.avatar_url} />
  <h2>{this.state.users.login}</h2>

  {this.state.followers.map((followers)=>{
    return (
      <div> 
<img width="200"  src={followers.avatar_url} />
    <h2>{followers.login}</h2>
      </div>
      )
  })}      
    
    </div>
    </div>
  )
}

}

export default App;

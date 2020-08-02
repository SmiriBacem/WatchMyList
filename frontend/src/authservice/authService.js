import axios from "axios";

const API_URL = "http://localhost:5000/users";

class AuthService {
    async login(email, password) {
        let response="";
        try{
            response =  await axios.post(API_URL+"/login",{email,password});
        }catch(err){
            console.log('ERROR HAPPENED',err)
        }     

        if(!response){
            console.log('cannot get user')
        }
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
      }
    


  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "singup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
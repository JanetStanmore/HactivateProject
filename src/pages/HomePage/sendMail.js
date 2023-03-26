import axios from "axios";



export const sendMail = async (user) => {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json" 
       }
       
       let bodyContent = JSON.stringify({
         "from":"delivery.minutemail@gmail.com",
         "pass":"mkoxawghyppxqsum",
         "to": user,
         "name":"Team Minutemen",
         "subject":"Your Package has arrived",
         "body":"Congrats! Your package has arrived."
       });
       
       let reqOptions = {
         url: "https://backend-wn93.onrender.com/users/mail",
         method: "POST",
         headers: headersList,
         data: bodyContent,
       }
       
       let response = await axios.request(reqOptions);
       
}
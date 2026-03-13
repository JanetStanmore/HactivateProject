import axios from "axios";

export const sendMail = async (user: string): Promise<void> => {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }

       let bodyContent = JSON.stringify({
         "from": process.env.REACT_APP_EMAIL_FROM,
         "pass": process.env.REACT_APP_EMAIL_PASS,
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

       await axios.request(reqOptions);
}
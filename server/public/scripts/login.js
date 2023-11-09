function postLogin(){
    //get user input
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    //create object to send to server
    let user = {
        username: username,
        password: password
    }
    console.log(user)
    //send user to server
    fetch("api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        console.log(res)
        if(res.status == 200){
            console.log("Login successful")
            window.location.href = '/'
        }
        else{
            alert("Incorrect username or password")
        }
        res.json()
    })
}


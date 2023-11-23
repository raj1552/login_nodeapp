const loginForm = document.getElementById("user-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(!username || !password){
        return alert("Please Fill The Form")
    }
    
    try{
        const response = await fetch('/user/login', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : username,
                password : password
            })
        })
        
        if(response.ok){
            alert("Sucessfully Logged In")
            loginForm.reset()
        }
        else{
            console.log(response.statusText)
        }
    }
    catch(error){
        console.error(error)
    }
});

const userLogin = document.getElementById("login-form")

userLogin.addEventListener('submit', async(e) =>{
    e.preventDefault()
    
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value

    if(!username || !password){
        return alert("Please Fill The Login Form")
    }

    try{
        const response = await fetch('/user/login', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : username,
                password : password
            })
        })

        if(response.ok){
            alert("Sucessfully Logged In")
            userLogin.reset()
        }
        else{
            console.log(response.statusText)
        }
    }
    catch(error){
        console.log(error)
    }
})

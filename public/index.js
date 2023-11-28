const registerForm = document.getElementById("user-form");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(!username || !password){
        return alert("Please Fill The Form")
    }
    
    try{
        const response = await fetch('/user/register', {
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
            alert("Sucessfully Registered")
            registerForm.reset()
        }
        else{
            console.log(response.statusText)
            registerForm.reset()
        }
    }
    catch(error){
        registerForm.reset()
        document.getElementById('some-text').innerHTML= 'Username Already Taken'
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
            window.location.href = '/dashboard'
            userLogin.reset()
        }
        else{
            console.log('Login failed:', response.statusText);
            userLogin.reset()
            if (response.status === 401) {
                alert("Invalid username or password");
            } else {
                console.log(response.statusText);
            }
        }
    }
    catch(error){
        console.log(error)
        alert("An error occurred. Please try again.");
    }
})

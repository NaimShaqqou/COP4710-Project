import React, { useState } from 'react';
import { buildPath } from "../buildPath"

function Login()
{
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    
    console.log(buildPath("api/login"))
    const doLogin = async event => 
    {
        event.preventDefault();
        let obj = {login:loginName.value,password:loginPassword.value};
        let js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(buildPath("api/login"),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            let res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                let user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/test';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };
    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username" 
            ref={(c) => loginName = c} /> <br />
        <input type="password" id="loginPassword" placeholder="Password" 
            ref={(c) => loginPassword = c} /> <br />
        <input type="submit" id="loginButton" class="buttons" value = "Login"
          onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};
export default Login;
import React from 'react';

export const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    );
};


const LoginForm = () => {
    return (
        <form action="">
            <div>
                <input type="text" placeholder={"login"}/></div>
            <div>
                <input type="password" placeholder={"password"}/></div>
            <div>
                <input type="checkbox"/>remember me
            </div>
            <div>
                <button>submit</button>
            </div>
        </form>
    );
};




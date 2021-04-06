import React, { useState } from 'react'
import './SignUp.scss';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../../../context";

function SignUp() {
    const { auth } = React.useContext(FirebaseContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password).then(res => {
            history.push('/main');
            //do something with the response
        }).catch(err => {
            //do something with the error
        })
    }
    return (
        <div className='signUp'>
            <h1>Register your account</h1>
            <input type='text' placeholder='Enter your email' onChange={e => setEmail(e.currentTarget.value)} />
            <input type='password' placeholder='Enter your password' onChange={e => setPassword(e.currentTarget.value)} />
            <button onClick={signUp}>Sign Up</button>
        </div>
    )
}

export default SignUp

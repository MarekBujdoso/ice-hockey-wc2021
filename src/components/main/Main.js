import React, { useEffect } from 'react'
import './Main.scss';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from "../../context";
import Matches from './Matches';

function Main() {
    const { auth } = React.useContext(FirebaseContext);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) history.push('/auth');
        })
    })
    const history = useHistory();

    const logOut = () => {
        auth.signOut().then(res => {
            history.push('/auth');
            //do something else with res
        }).catch(err => {
            //do something else with err
        })
    }

    return (
        <div className='main'>
            <h1>Hey there, you're logged in!</h1>
            <Matches />
            <br />
            <button onClick={logOut}>Log out</button>
        </div>
    )
}

export default Main

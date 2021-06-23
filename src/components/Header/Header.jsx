import React from 'react';
import Button from '../Button/Button';
import './Header.css';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import { useHistory } from 'react-router-dom';


const Header = (props) => {

    let history = useHistory();

    const logOut = () => {

        props.dispatch({type:LOGOUT});
        history.push("/")
    }
    const llevame = () => {
        history.push('/toprated');
    }

    if (props.credentials.user?.name){
        return(
            <div className="header">

                <div className="headerLinks">
                    <Button path="/toprated" destination="TOP RATED"/>
                    <Button path="/upcoming" destination="UPCOMING"/>
                    <Button path="/popular" destination="POPULAR"/>
                </div>

            <div className="headerUser">
                <Button path="/dentistprofile" destination={props.credentials?.user.name}/>
                <p>|</p>
                <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
            </div>

        </div>


    )} else {

        //Header visitor
        return(
            <div className="header">

                <div className="headerLinks">
                    <Button path="/toprated" destination="TOP RATED" onClick={() => llevame()} />
                    <Button path="/upcoming" destination="UPCOMING"/>
                    <Button path="/popular" destination="POPULAR"/>
                </div>

                <div className="headerUser">
                    <Button path="/login" destination="LOGIN"/>
                    <p>|</p>
                    <Button path="/register" destination="REGISTER"/>
                </div>
            </div>
        )

    }

}

export default connect((state) => ({

    credentials:state.credentials

    }))(Header);
import { format } from 'mysql';
import React, { useState, useRef, useEffect } from 'react' ;
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const USER_REGEX = /^[a-zA][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useSate('');
    const [valideName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useSate('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [matchPwd, setMatchPwd] = useSate('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

useEffect(() => {
    userRef.current.focus();
}, [])


useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
}, [user])

useEffect(() => {
    const result = PWD_REGEX.test(user);
    console.log(result);
    console.log(pwd);
    setValidPwd = pwd === matchPwd;
    setValidMatch(match);
}, [pwd, matchPwd])

useEffect(() => {
    setErrMsg('');

}, [user, pwd, matchPwd])

    return (
        <div>

        </div>
    )
}

export default Register;

import React, { useState, useEffect } from 'react'  
  
const Dashboard = () => {  
    const [user, setuser] = useState({ userName: '', Password: '' });  
    useEffect(() => {  
        var a = localStorage.getItem('myData');  
        var b = JSON.parse(a);  
        if (b) {
            console.log(b.StudentName);  
            setuser(b);  
            console.log(user.StudentName);  
          }
          
        // console.log(b.StudentName);  
        // setuser(b)  
        // console.log(user.StudentName)  
  
    }, [user.StudentName]);  
    return (  
        <>  
            <div className="col-sm-12 btn btn-primary">  
                Dashboard  
        </div>  
            <h1>Welcome :{user.StudentName}</h1>  
        </>  
    )  
}  
  
export default Dashboard;
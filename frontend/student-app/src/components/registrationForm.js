import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = (props) => {
  const [data, setdata] = useState({ Username: "", Email: "", Password: "" });
  const apiUrl = "http://localhost:3000/register";
  const Registration = (e) => {
    e.preventDefault();
    debugger;
    const data1 = {
      Username: data.Username,
      Email: data.Email,
      Password: data.Password,
    };
    axios.post(apiUrl, data1).then((result) => {
      debugger;
      console.log(result.data);
      if (result.data.Status === "Invalid") alert("Invalid User");
      else props.history.push("/Dashboard");
    });
  };
  const handleChange = (e) => {
    setdata(e.target.value);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 btn btn-primary" style={{ margin: "6px" }}>
          Your Details
        </div>
      </div>
      <div
        className="card o-hidden border-0 shadow-lg my-5"
        style={{ marginTop: "5rem!important;" }}
      >
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Register User</h1>
                </div>
                <form onSubmit={Registration} class="user">
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={data.Username}
                        className="form-control"
                        id="exampleUserName"
                        placeholder="Username"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="email"
                        name="Email"
                        onChange={handleChange}
                        value={data.Email}
                        className="form-control"
                        id="exampleInputEmail"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={data.Password}
                      className="form-control"
                      id="exampleInputPassword"
                      placeholder="Password"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary  btn-block">
                    Register User
                  </button>
                  <hr />
                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

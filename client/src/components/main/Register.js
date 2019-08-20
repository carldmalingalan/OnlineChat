import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import { registerUser } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Register extends Component {
  constructor(props) {
    super(props);
    document.title = "OnlineChat - Register";
  }

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password1: "",
    error: null,
    visible: false
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDismiss = e => {
    this.setState({ visible: false, error: null });
  };

  onSubmit = e => {
    e.preventDefault();
    const { firstname, lastname, email, password, password1 } = this.state;
    const userObj = this.state;
    console.log(firstname, lastname, email, password, password1);
    if (!firstname || !lastname || !email || !password || !password1) {
      return this.setState({ error: "Please fill all fields.", visible: true });
    }
    if (password !== password1) {
      return this.setState({ error: "Password must match.", visible: true });
    }
    this.props.registerUser(userObj);

    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password1: ""
    });
  };
  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      password1,
      error,
      visible
    } = this.state;
    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3">
              <Alert color="danger" isOpen={visible} toggle={this.onDismiss}>
                <strong>Alert! </strong>
                {error}
              </Alert>
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={firstname}
                        name="firstname"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={lastname}
                        name="lastname"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={email}
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Password</label>
                      <input
                        type="password"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={password}
                        name="password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Re-type Password</label>
                      <input
                        type="password"
                        autoComplete="off"
                        className="form-control"
                        onChange={this.onChange}
                        value={password1}
                        name="password1"
                      />
                    </div>
                    <button
                      className="btn btn-block btn-outline-success"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                  <div className="d-block justify-content-left pt-2">
                    <Link to="/" className="cLink">
                      Have an account ?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);

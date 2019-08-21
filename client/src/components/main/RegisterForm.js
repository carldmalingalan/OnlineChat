import React, { Component } from "react";
import { Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { registerUser } from "../../actions/auth";
import { clearNotif } from "../../actions/notif";

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    document.title = "Register - OnlineChat";
  }

  componentDidUpdate(prevProps) {
    const { notif } = this.props;
    if (notif !== prevProps.notif) {
      if (notif.type === "success") {
        document
          .getElementById("submitBtn")
          .setAttribute("disabled", "disabled");
        this.setState({
          error: notif,
          visible: true,
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          password1: ""
        });
        setTimeout(() => this.setState({ redi: true }), 3000);
      } else {
        this.setState({ error: notif, visible: true });
      }
    }
  }

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password1: "",
    redi: false,
    error: { type: null, message: null },
    visible: false
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    clearNotif: PropTypes.func.isRequired,
    auth: PropTypes.object,
    notif: PropTypes.object
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDismiss = e => {
    this.setState({ visible: false, error: { type: null, message: null } });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firstname, lastname, email, password, password1 } = this.state;
    const userObj = this.state;

    if (!firstname || !lastname || !email || !password || !password1) {
      return this.setState({
        error: { type: "warning", message: "Please fill all fields." },
        visible: true
      });
    }
    if (password !== password1) {
      return this.setState({
        error: { type: "warning", message: "Password must match." },
        visible: true
      });
    }

    this.props.registerUser(userObj);
  };
  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      password1,
      error,
      visible,
      redi
    } = this.state;

    if (redi) {
      return <Redirect to="/" />;
    }

    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3">
              <Alert
                color={error.type}
                isOpen={visible}
                toggle={this.onDismiss}
              >
                <strong>Alert! </strong>
                {error.message}
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
                      id="submitBtn"
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
  auth: state.auth,
  notif: state.notif
});

export default connect(
  mapStateToProps,
  { registerUser, clearNotif }
)(RegisterForm);

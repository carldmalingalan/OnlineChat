import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/auth";

import { Alert } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    document.title = "Login - Online Chat";
    this.state = {
      email: "",
      password: "",
      visible: false,
      notif: { type: null, message: null }
    };
  }

  componentDidUpdate(prevProps) {
    const { notif } = this.props;
    if (notif !== prevProps.notif) {
      this.setState({ notif, visible: true });
      if (notif.type === "success") {
        this.setState({ email: "", password: "" });
      }
    }
  }

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
    notif: PropTypes.object
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password, notif } = this.state;
    const UserObj = this.state;
    if ((!email, !password)) {
      console.log("this");
      return this.setState({
        notif: { type: "danger", message: "Please fill all field." },
        visible: true
      });
    }
    this.props.loginUser(UserObj);
  };

  onDismiss = e => {
    this.setState({ visible: false, notif: { type: null, message: null } });
  };

  render() {
    const { email, password, visible, notif } = this.state;
    return (
      <div className="d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="container">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3">
            <Alert isOpen={visible} toggle={this.onDismiss} color={notif.type}>
              <strong>Alert! </strong>
              {notif.message}
            </Alert>
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      autoComplete="off"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      value={password}
                      className="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                  <button className="btn btn-block btn-outline-primary">
                    Login
                  </button>
                </form>
                <div className="d-block justify-content-left pt-2">
                  <Link to="/register" className="cLink">
                    Don't have an account yet ?
                  </Link>
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
  { loginUser }
)(LoginForm);

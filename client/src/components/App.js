import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Auth0 from './Auth/Auth0/Auth0';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

import TopNavBar from './Nav/NavBar.js';
import CTA from './CTA/CTA.js';

axios.defaults.withCredentials = true;

const auth = new Auth0();

const LoadingContainer = styled.div`
  display: flex;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    if (this.props.fetching) {
      return (
        <LoadingContainer>
          <BeatLoader color={'black'} loading={this.state.loading} />
        </LoadingContainer>
      );
    }

    if (this.props.user) {
      return (
        <div>
          <Home user={this.props.user} />
        </div>
      );
    }

    return (
      <div className="App">
        <TopNavBar />
        <CTA />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    fetching: state.user.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getUserInfo }
)(App);

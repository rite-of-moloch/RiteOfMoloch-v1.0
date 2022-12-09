import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    //web3 state
    ethersProvider: null,
    web3: null,
    signerAddress: null,
    chainId: null
  };

  setWeb3Data = (data) => {
    this.setState({
      ...data
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          updateStage: this.updateStage,
          setWeb3Data: this.setWeb3Data
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;

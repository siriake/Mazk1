// log
import store from "../store";
import { getProof } from "./merkleTree";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      // let totalSupply = await store
      //   .getState()
      //   .blockchain.smartContract.methods.totalSupply()
      //   .call();
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      let proof = getProof(account);
      let whitelisted;
      try {
      whitelisted = await store.getState().blockchain.smartContract.methods.checkValidity(proof).call({ from: account });
      } catch (err) {
        console.error(err);
        whitelisted = false;
      }
      console.log(proof);

      dispatch(
        fetchDataSuccess({
          totalSupply: 13,
          proof,
          whitelisted,
          walletMinted: 0,
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};

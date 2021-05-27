import MetaMaskOnboarding from "@metamask/onboarding";
import { useCallback, useEffect, useRef, useState } from "react";
import "./MetaMaskLogin.scss"

const forwarderOrigin = "http://localhost:9010";

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

const MetaMaskLogin = () => {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current)
      onboarding.current = new MetaMaskOnboarding({ forwarderOrigin });
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.off("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  const onClick = useCallback(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(newAccounts => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  }, []);

  return (
    <button className="login-btn" type="button" disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default MetaMaskLogin;

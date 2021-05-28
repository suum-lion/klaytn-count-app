import { Button } from "@mantine/core";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./MetaMaskLogin.scss";

const CONNECT_TEXT = "로그인";

const MetaMaskLogin = () => {
  const [buttonText, setButtonText] = useState(CONNECT_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef();

  const CONNECTED_TEXT = useMemo(() => {
    if (accounts.length !== 0)
      return `${accounts[0].substring(0, 5)}...${accounts[0].substring(
        accounts[0].length - 4
      )}`;
    return "";
  }, [accounts]);

  useEffect(() => {
    if (!onboarding.current) onboarding.current = new MetaMaskOnboarding();
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
  }, [CONNECTED_TEXT, accounts]);

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
    <>
      <Button color="cyan" disabled={isDisabled} onClick={onClick}>
        {buttonText}
      </Button>
    </>
  );
};

export default MetaMaskLogin;

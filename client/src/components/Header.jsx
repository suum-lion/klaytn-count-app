import { Container } from "@mantine/core";
import MetaMaskLogin from "./MetaMaskLogin";

const Header = () => {
  return (
    <Container
      fluid
      style={{
        height: 100,
        paddingLeft: 161,
        paddingRight: 161,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <img
          src="/img/logo.svg"
          alt="logo"
          style={{ paddingTop: 30, paddingBottom: 29 }}
        />
        <h1 style={{ fontSize: 24, marginLeft: 6, fontWeight: "bold" }}>
          DonkeyFond
        </h1>
      </div>
      <div>
        <MetaMaskLogin />
      </div>
    </Container>
  );
};

export default Header;

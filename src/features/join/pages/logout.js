import React from "react";
import { connect } from "react-redux";

import { Col, Row } from "styled-components-layout";
import { PrimitiveFooter } from "ui/organisms";
import { accountReset } from "features/account";
import { Card, Button } from "ui/atoms";
import { Container, CenterContentTemplate } from "ui/templates";

const RESET_TIMEOUT = 500;

export const LogoutView = class extends React.Component {
  state = {
    isLogouting: true
  };
  setLogouting = (val = false) => this.setState({ isLogouting: val });
  logout = () => () => {
    const { history, onReset } = this.props;
    this.setLogouting(true);
    setTimeout(() => {
      onReset();
      setTimeout(() => history.push("/"), 150);
    }, RESET_TIMEOUT);
  };
  back = () => {
    this.props.history.goBack();
  };

  render() {
    const { isLogouting } = this.state;
    const { logout, back } = this;

    return this.renderTemplate({ isLogouting, logout, back });
  }
  renderLoginButton({ isLogouting, logout, back }) {
    return (
      <Row gap="1rem">
        <Button.Primary grow disabled={isLogouting} onClick={logout}>
          {isLogouting ? "Logging out…" : "Logout"}
        </Button.Primary>
        <Button disabled={isLogouting} onClick={back}>
          Back
        </Button>
      </Row>
    );
  }
  renderTemplate(isLogouting, logout, back) {
    return (
      <CenterContentTemplate footer={<PrimitiveFooter />}>
        <Container justify="center" align="center">
          <Col align="center" width="40rem">
            <Card>
              <Row padding="0 0 2rem 0">Stop session?</Row>
              {this.renderLoginButton({ isLogouting, logout, back })}
            </Card>
          </Col>
        </Container>
      </CenterContentTemplate>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  onReset: () => dispatch(accountReset)
});

export const LogoutPage = connect(
  null,
  mapDispatchToProps
)(LogoutView);

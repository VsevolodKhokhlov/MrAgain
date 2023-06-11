import { faCookie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "antd";

import { ButtonsWrapper, CenterFull } from "./helpers";

export const CookieMainView = ({ onAcceptCookies, setManageConcent }) => (
  <>
    <Row gutter={8}>
      <Col className="gutter-row" span={4}>
        <CenterFull>
          <FontAwesomeIcon icon={faCookie} />
        </CenterFull>
      </Col>
      <Col className="gutter-row" span={20}>
        <p>
          We gebruiken cookies om je een zo goed mogelijke ervaring op onze
          website te geven.
        </p>
      </Col>
    </Row>

    <ButtonsWrapper>
      <Button
        className="mr-2"
        onClick={onAcceptCookies}
        type="primary"
        size="large"
      >
        Prima!
      </Button>
      <Button onClick={() => setManageConcent(true)} type="link" size="large">
        Beheer je instellingen
      </Button>
    </ButtonsWrapper>
  </>
);

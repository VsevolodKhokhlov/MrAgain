import "./cookie-manage-styles.less";

import { faCookie, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Collapse, Row, Switch, Tag } from "antd";

import { ButtonsWrapper } from "./helpers";
const { Panel } = Collapse;

export const renderPanel = (concent, onConcentChanged) => (
  <Row className="cookie-banner__concent py-3 px-4">
    <Col span="20">
      <p className="m-0">{concent.text}</p>
    </Col>
    <Col span="4" onClick={(event) => event.stopPropagation()}>
      <div className="cookie-banner__concent__switch">
        {concent.id === "rcl_consent_given" ? (
          <Tag>Altijd actief</Tag>
        ) : (
          <Switch
            checked={concent.active}
            onChange={(value) =>
              onConcentChanged({ active: value, id: concent.id })
            }
          />
        )}
      </div>
    </Col>
  </Row>
);

export const CookieManageConcentView = ({
  concents,
  onSaveSettings,
  onRejectAll,
  onConcentChanged,
}) => (
  <>
    <div>
      <p>
        <b>Beheer je cookie instellingen</b>
      </p>
      <p>
        Als je websites bezoekt kunnen deze informatie opslaan wat meestal
        gebeurt in de vorm van cookies.
      </p>
    </div>
    <Collapse
      className="cookie-banner__accordion"
      accordion
      defaultActiveKey={[concents[0].id]}
      expandIcon={(panelProps) => (
        <FontAwesomeIcon
          className="cookie-banner__accordion__icon"
          icon={panelProps.isActive ? faMinus : faPlus}
        />
      )}
    >
      {concents.map((concent) => (
        <Panel
          ghost
          header={renderPanel(concent, onConcentChanged)}
          key={concent.id}
        >
          <p>{concent.description}</p>
        </Panel>
      ))}
    </Collapse>
    <ButtonsWrapper>
      <Button
        className="mr-2"
        onClick={onSaveSettings}
        type="primary"
        size="large"
      >
        Opslaan
      </Button>
      <Button onClick={onRejectAll} type="link" size="large">
        Afwijzen
      </Button>
    </ButtonsWrapper>
  </>
);

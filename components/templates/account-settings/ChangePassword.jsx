import { Button, Col, Divider, Row } from "antd";

import Input from "@/components/ui/Input";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";

import {
  BoxWrapper,
  BoxWrapperContent,
  ButtonsWrapper,
  HeaderSmallText,
} from "./styles";

export const ChangePassword = ({ changePasswordForm }) => {
  return (
    <Form module={changePasswordForm}>
      <BoxWrapper>
        <div>
          <HeaderSmallText>Wachtwoord</HeaderSmallText>
        </div>
        <Divider />
        <Row>
          <Col xxl={{ span: 12 }} md={{ span: 16 }}>
            <BoxWrapperContent>
              <Field
                adminInput
                as={Input}
                name="oldPassword"
                label="Huidig wachtwoord"
                type="password"
                size="small"
              />
              <Field
                adminInput
                as={Input}
                name="newPassword"
                label="Nieuw wachtwoord"
                type="password"
                size="small"
              />
              <Field
                adminInput
                as={Input}
                name="confirmPassword"
                label="Bevestig nieuw wachtwoord"
                type="password"
                size="small"
              />
            </BoxWrapperContent>
          </Col>
          <Col xxl={{ span: 12 }} md={{ span: 8 }}></Col>
        </Row>
        <Divider />
        <ButtonsWrapper>
          <div />
          <Button type="primary" htmlType="submit">
            Wachtwoord wijzigingen
          </Button>
        </ButtonsWrapper>
      </BoxWrapper>
    </Form>
  );
};

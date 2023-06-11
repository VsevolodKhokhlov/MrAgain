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

export const BasicProfile = ({ basicSettingsForm }) => {
  return (
    <Form module={basicSettingsForm}>
      <BoxWrapper>
        <div>
          <HeaderSmallText>Algemene gegevens</HeaderSmallText>
        </div>
        <Divider />
        <Row>
          <Col xxl={{ span: 12 }} md={{ span: 16 }}>
            <BoxWrapperContent>
              <Field
                adminInput
                as={Input}
                size="small"
                name="name"
                label="Bedrijfsnaam"
                disabled={true}
                customLabel
              />
              <Field
                adminInput
                as={Input}
                size="small"
                name="email"
                label="Emailadres"
                disabled={true}
                customLabel
              />
              <Field
                adminInput
                as={Input}
                size="small"
                name="kvk"
                label="kvk nummer"
                addonBefore="NL -KVK - "
                type="number"
                customLabel
              />
              <Field
                adminInput
                as={Input}
                size="small"
                name="phone_number"
                label="Telefoon nummer"
                addonBefore="+31 "
                number
                formatter={(value) =>
                  `$ ${value}`.replace(
                    /^([0-9]{3})([0-9]{3})([0-9]{4})$/,
                    "($1) $2-$3"
                  )
                }
                customLabel
              />
              <Field
                adminInput
                as={Input}
                name="iban"
                label="IBAN"
                type="number"
                size="small"
                customLabel
              />
            </BoxWrapperContent>
          </Col>
          <Col xxl={{ span: 12 }} md={{ span: 8 }}></Col>
        </Row>
        <Divider />
        <ButtonsWrapper>
          <div />
          <Button type="primary" htmlType="submit">
            Wijzigingen opslaan
          </Button>
        </ButtonsWrapper>
      </BoxWrapper>
    </Form>
  );
};

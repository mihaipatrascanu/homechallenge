import {
  Row,
  Col,
  Typography,
  Card,
  Form,
  Input,
  Select,
  Space,
  Progress,
  Button,
} from "antd";
import { useState } from "react";
import useCurrencies from "../../hooks/useCurrencies";

const COMMON_CURRENCIES_CODE = ["GBP", "EUR"];

function RateChecker() {
  // CUSTOM HOOK
  const { currencies, triggerConvertCurrency } = useCurrencies();

  // STATE
  const [convert, setConvert] = useState({
    from: null,
    to: null,
    amount: null,
    convertedAmount: null,
  });

  // HANDLERS
  // Filter common currencies
  const commonCurrencies = currencies?.filter((item) =>
    COMMON_CURRENCIES_CODE.includes(item.code)
  );

  // Filter other currencies
  const otherCurrencies = currencies?.filter(
    (item) => !COMMON_CURRENCIES_CODE.includes(item.code)
  );

  const onChangeFromHandler = (option) => {
    setConvert((prev) => ({ ...prev, from: option, convertedAmount: null }));
  };

  const onChangeToHandler = (option) => {
    setConvert((prev) => ({ ...prev, to: option, convertedAmount: null }));
  };

  const onChangeAmount = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setConvert((prev) => ({
      ...prev,
      amount: value === "" ? "" : +value,
      convertedAmount: null,
    }));
  };

  const onClickConvertHandler = async () => {
    try {
      const response = await triggerConvertCurrency({
        from: convert.from.value,
        to: convert.to.value,
        amount: convert.amount,
      }).unwrap();

      setConvert((prev) => ({ ...prev, convertedAmount: response }));
    } catch {
      //handler error
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Text className="dark-green medium fs-25px">
            Rate Checker
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            <Card.Grid className="full-width rounded b-g hover-no-border">
              <Form layout="vertical">
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="convertTo"
                      label={
                        <span className="muli semi-bold fs-18px">
                          Convert To
                        </span>
                      }
                    >
                      <Row gutter={8}>
                        <Col span={6}>
                          <Select
                            onChange={(_, option) =>
                              onChangeFromHandler(option)
                            }
                            value={convert.from}
                            className="dark-green"
                            showSearch
                            filterOption={(input, option) => {
                              if (option.children)
                                return option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                              else if (option.label)
                                return option.label
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                            }}
                          >
                            <Select.OptGroup label="Common">
                              {commonCurrencies?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.code}
                                </Select.Option>
                              ))}
                            </Select.OptGroup>

                            <Select.OptGroup label="Other">
                              {otherCurrencies?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.code}
                                </Select.Option>
                              ))}
                            </Select.OptGroup>
                          </Select>
                        </Col>
                        <Col span={18}>
                          <Input
                            placeholder="Enter Amount"
                            onChange={onChangeAmount}
                            value={convert.amount ?? ""}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item
                      name="convertFrom"
                      label={
                        <span className="muli semi-bold fs-18px">
                          Convert From
                        </span>
                      }
                    >
                      <Row gutter={8}>
                        <Col span={6}>
                          <Select
                            className="dark-green"
                            showSearch
                            onChange={(_, option) => onChangeToHandler(option)}
                            value={convert.to}
                            filterOption={(input, option) => {
                              if (option.children)
                                return option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                              else if (option.label)
                                return option.label
                                  .toLowerCase()
                                  .includes(input.toLowerCase());
                            }}
                          >
                            <Select.OptGroup label="Common">
                              {commonCurrencies?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.code}
                                </Select.Option>
                              ))}
                            </Select.OptGroup>

                            <Select.OptGroup label="Other">
                              {otherCurrencies?.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.code}
                                </Select.Option>
                              ))}
                            </Select.OptGroup>
                          </Select>
                        </Col>
                        <Col span={18}>
                          <Input
                            placeholder="Converted Amount"
                            readOnly="readOnly"
                            value={convert.convertedAmount ?? ""}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="bottom">
                  <Col span={12}>
                    <Space>
                      <Progress
                        type="circle"
                        percent={75}
                        width={40}
                        format={() => `30s`}
                      />
                      <Space direction="vertical" size={0}>
                        <Typography.Text className="muli semi-bold light-green">
                          FX Rate
                        </Typography.Text>
                        <Typography.Text className="muli semi-bold light-green">
                          1 GBP = 1.19 EUR
                        </Typography.Text>
                      </Space>
                    </Space>
                  </Col>
                  <Col span={12} className="right-align-text">
                    <Button
                      type="primary"
                      htmlType="button"
                      onClick={onClickConvertHandler}
                    >
                      Convert
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default RateChecker;

import { Button, Col, Divider, Input, Row, Tag, TimePicker } from "antd";
import moment from "moment";
import React, { useCallback, useState } from "react";

import { CalendarRange } from "@/components/common/Calendar/CalendarRange";
import Select from "@/components/ui/Select";

import { repeatingList } from "./helpers";
import {
  Action,
  HoursEditor,
  HoursEditorTitle,
  RowWrapper,
  TableWrapper,
} from "./styles";

const getColor = (repeat) => {
  return repeatingList[repeat];
};

const renderRepeat = (repeat) => {
  const res = getColor(repeat);
  return (
    <Tag color={res.color} key={res.value}>
      {res.label}
    </Tag>
  );
};

const renderAction = (item, onDelete) => (
  <div size="middle">
    <Action onClick={() => onDelete(item)}>Delete</Action>
  </div>
);

const columns = (onDelete) => [
  {
    title: "Naam",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Begin datum",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Eind datum",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Van",
    dataIndex: "startTime",
    key: "startTime",
  },
  {
    title: "Tot",
    dataIndex: "endTime",
    key: "endTime",
  },
  {
    title: "Herhaling",
    key: "repeat",
    dataIndex: "repeat",
    render: renderRepeat,
  },
  {
    title: "Actie",
    key: "action",
    render: (value, item) => renderAction(item, onDelete),
  },
];

export const OperationalHoursCalendar = ({
  nonWorkingDays,
  onNonWorkingDaysSaved,
  onDeleteNonWorkingDays,
}) => {
  const [nonRegularHours, setNonRegularHours] = useState({
    range: {
      startDate: moment(moment.now()).toDate(),
      endDate: moment(moment.now()).add(5, "days").toDate(),
    },
    name: "",
    time: {
      startTime: moment("00:00", "HH:mm"),
      endTime: moment("23:59", "HH:mm"),
    },
    repeat: 0,
  });

  const onAdd = useCallback(() => {
    onNonWorkingDaysSaved({
      data: {
        ...nonRegularHours,
        range: {
          startDate: moment(nonRegularHours.range.startDate).format(
            "YYYY-MM-DD"
          ),
          endDate: moment(nonRegularHours.range.endDate).format("YYYY-MM-DD"),
        },
        time: {
          startTime: moment(nonRegularHours.time.startTime).format("HH:mm:ss"),
          endTime: moment(nonRegularHours.time.endTime).format("HH:mm:ss"),
        },
      },
    });
    onClear();
  }, [nonRegularHours, onNonWorkingDaysSaved]);

  const isAddDisabled = useCallback(() => {
    return (
      nonRegularHours.name === "" ||
      nonRegularHours.time.startTime === null ||
      nonRegularHours.time.endTime === null
    );
  }, [nonRegularHours]);

  const onClear = () => {
    setNonRegularHours({
      ...nonRegularHours,
      name: "",
      time: {
        startTime: moment("00:00", "HH:mm"),
        endTime: moment("23:59", "HH:mm"),
      },
      repeat: 0,
    });
  };

  const handelOnDelete = (item) => {
    onDeleteNonWorkingDays(item.id);
  };

  return (
    <>
      <RowWrapper>
        <Col span={16}>
          <CalendarRange
            repeatingList={repeatingList}
            disabledDates={nonWorkingDays.map((item) => ({
              startDate: moment(item.startDate, "YYYY-MM-DD").toDate(),
              endDate: moment(item.endDate, "YYYY-MM-DD").toDate(),
              type: item.repeat,
            }))}
            onChange={(value) => {
              setNonRegularHours({
                ...nonRegularHours,
                range: {
                  startDate: moment(value.startDate).format("YYYY-MM-DD"),
                  endDate: moment(value.endDate).format("YYYY-MM-DD"),
                },
              });
            }}
          />
        </Col>
        <Col span={8}>
          <HoursEditor>
            <Col>
              <HoursEditorTitle>
                Beschrijving afwijkende openingstijd
              </HoursEditorTitle>
              <Input
                small
                placeholder="Beschrijving"
                size="large"
                allowClear
                value={nonRegularHours.name}
                onChange={(event) =>
                  setNonRegularHours({
                    ...nonRegularHours,
                    name: event.target.value,
                  })
                }
              />
            </Col>
            <Col>
              <HoursEditorTitle>Openingstijd</HoursEditorTitle>
              <Row>
                <Col span={12}>
                  <TimePicker
                    size="large"
                    value={nonRegularHours.time.startTime}
                    format="HH:mm"
                    onChange={(value) =>
                      setNonRegularHours({
                        ...nonRegularHours,
                        time: { ...nonRegularHours.time, startTime: value },
                      })
                    }
                  />
                </Col>
                <Col span={12}>
                  <TimePicker
                    size="large"
                    value={nonRegularHours.time.endTime}
                    format="HH:mm"
                    onChange={(value) =>
                      setNonRegularHours({
                        ...nonRegularHours,
                        time: { ...nonRegularHours.time, endTime: value },
                      })
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <HoursEditorTitle>Herhaling</HoursEditorTitle>
              <Select
                value={nonRegularHours.repeat}
                options={repeatingList}
                size="large"
                onChange={(value) =>
                  setNonRegularHours({
                    ...nonRegularHours,
                    repeat: value,
                  })
                }
              />
            </Col>
            <Divider />
            <Row type="flex" justify="space-between">
              <Button onClick={onClear}>Wis</Button>
              <Button type="primary" onClick={onAdd} disabled={isAddDisabled()}>
                Voeg toe
              </Button>
            </Row>
          </HoursEditor>
        </Col>
      </RowWrapper>
      <RowWrapper style={{ marginTop: "40px" }}>
        <Col span={24}>
          <TableWrapper
            columns={columns(handelOnDelete)}
            dataSource={nonWorkingDays}
          />
        </Col>
      </RowWrapper>
    </>
  );
};

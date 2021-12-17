import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Avatar,
  Dropdown,
  Table,
  Menu,
  Tag,
} from "antd";
import StatisticWidget from "@components/shared-components/StatisticWidget";
import ChartWidget from "@components/shared-components/ChartWidget";
import AvatarStatus from "@components/shared-components/AvatarStatus";
import GoalWidget from "@components/shared-components/GoalWidget";
import {
  VisitorChartData,
  AnnualStatisticData,
  ActiveMembersData,
  NewMembersData,
  RecentTransactionData,
} from "./DefaultDashboardData";
import ApexChart from "react-apexcharts";
import {
  apexLineChartDefaultOption,
  COLOR_2,
} from "src/constants/ChartConstant";
import {
  UserAddOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import utils from "src/utils";

import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getDashboards } from "@redux/slices/dashboard";
import moment from "moment";

const MembersChart = (props: any) => <ApexChart {...props} />;

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: [COLOR_2],
  },
};

const newJoinMemberOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <PlusOutlined />
          <span className="ml-2">Add all</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <StopOutlined />
          <span className="ml-2">Disable all</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const latestTransactionOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const cardDropdown = (menu: any) => (
  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
    <a
      href="/#"
      className="text-gray font-size-lg"
      onClick={(e) => e.preventDefault()}
    >
      <EllipsisOutlined />
    </a>
  </Dropdown>
);

function randColor() {
  for (var i = 0, col = ""; i < 6; i++) {
    col += ((Math.random() * 16) | 0).toString(16);
  }
  return "#" + col;
}

const tableColumns = [
  {
    title: "Customer",
    dataIndex: "_id",
    key: "_id",
    render: (text: any, record: any) => (
      <div className="d-flex align-items-center">
        <Avatar
          size={30}
          className="font-size-sm"
          style={{ backgroundColor: randColor() }}
        >
          {utils.getNameInitial(text)}
        </Avatar>
        <span className="ml-2">{text}</span>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "createAt",
    render: (_: any, record: any) => (
      <span>{moment(record.createAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
    ),
    key: "createAt",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_: any, record: any) => <span>${record.amount}</span>,
  },
];

export const DefaultDashboard = () => {
  const dispatch = useAppDispatch();

  const [visitorChartData, setVisitorChartData] = useState<{
    series: {
      name: string;
      data: number[];
    }[];
    categories: string[];
  }>(VisitorChartData);
  const [annualStatisticData, setAnnualStatisticData] = useState<
    {
      title: string;
      value: string;
      status: number;
      subtitle: string;
    }[]
  >(AnnualStatisticData);
  const [activeMembersData, setActiveMembersData] = useState<
    {
      name: string;
      data: number[];
    }[]
  >(ActiveMembersData);
  const [newMembersData, setNewMembersData] = useState<
    {
      img: string;
      title: string;
      name: string;
    }[]
  >(NewMembersData);
  const [recentTransactionData, setRecentTransactionData] = useState();
  const { dashboard } = useAppSelector((state) => state.dashboardReducers);

  useEffect(() => {
    getDashboardApi();
  }, []);
  useEffect(() => {
    console.log(visitorChartData);
  }, [visitorChartData]);

  useEffect(() => {
    if (dashboard && dashboard.chartSale) {
      let {
        chartSale,
        chartUser = [],
        revenue,
        amountSold,
        users,
        newBills,
        countNewUser,
      } = dashboard;
      setVisitorChartData({
        series: [
          {
            name: "Session Duration",
            data: chartSale.values,
          },
        ],
        categories: chartSale.categories,
      });

      setActiveMembersData([
        {
          name: "User",
          data: chartUser.values,
        },
      ]);

      setAnnualStatisticData([
        {
          title: "Sale",
          value: "$" + revenue.total,
          status: Number(revenue.growthRate),
          subtitle: "Compare to " + revenue.prevMonth,
        },
        {
          title: "Sold",
          value: "$" + amountSold.amount,
          status: Number(amountSold.growthRate),
          subtitle: "Compare to " + amountSold.prevMonth,
        },
        {
          title: "User",
          value: countNewUser.count + "",
          status: Number(countNewUser.growthRate),
          subtitle: "Compare to " + countNewUser.prevMonth,
        },
      ]);

      setRecentTransactionData(newBills);

      setNewMembersData(
        users.map((value: any) => ({
          img: value.photo || "/img/avatars/thumb-2.jpg",
          title: value.email,
          name: value.fname + " " + value.lname,
        }))
      );
    }
  }, [dashboard]);

  const getDashboardApi = () => {
    dispatch(getDashboards());
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            {annualStatisticData.map((elm, i) => (
              <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                <StatisticWidget
                  title={elm.title}
                  value={elm.value}
                  status={elm.status}
                  subtitle={elm.subtitle}
                />
              </Col>
            ))}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {!visitorChartData && (
                <ChartWidget
                  title="Sales"
                  series={VisitorChartData?.series}
                  xAxis={VisitorChartData?.categories}
                  height={"400px"}
                  direction={"ltr"}
                />
              )}
              {visitorChartData && (
                <ChartWidget
                  title="Sales"
                  series={visitorChartData?.series}
                  xAxis={visitorChartData?.categories}
                  height={"400px"}
                  direction={"ltr"}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <GoalWidget
            title="Monthly Target"
            value={87}
            subtitle="You need abit more effort to hit monthly target"
            extra={<Button type="primary">Learn More</Button>}
          />
          <StatisticWidget
            title={
              <MembersChart
                options={memberChartOption}
                series={activeMembersData}
                height={143}
              />
            }
            value={dashboard?.chartUser?.currMonth || "..."}
            subtitle={"New user chart"}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card
            title="New Join Member"
            extra={cardDropdown(newJoinMemberOption)}
          >
            <div className="mt-3">
              {newMembersData.map((elm, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center justify-content-between mb-4`}
                >
                  <AvatarStatus
                    id={i}
                    src={elm.img}
                    name={elm.name}
                    subTitle={elm.title}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={17}>
          <Card
            title="Latest Transactions"
            extra={cardDropdown(latestTransactionOption)}
          >
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={recentTransactionData}
              rowKey="_id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DefaultDashboard;

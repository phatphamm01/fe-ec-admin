import {
  EllipsisOutlined,
  FileExcelOutlined,
  PlusOutlined,
  PrinterOutlined,
  ReloadOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  apexLineChartDefaultOption,
  COLOR_2,
} from "@common/constants/ChartConstant";
import checkNullObject from "@common/function/checkNullObject";
import randomImage from "@common/utils/image/randomImage";
import AvatarStatus from "@components/shared-components/AvatarStatus";
import ChartWidget from "@components/shared-components/ChartWidget";
import GoalWidget from "@components/shared-components/GoalWidget";
import StatisticWidget from "@components/shared-components/StatisticWidget";
import { useAppDispatch, useAppSelector } from "@hook/redux";
import { getDashboard } from "@redux/slices/dashboard";
// import { getDashboards } from '@redux/slices/dashboard';
import { Avatar, Button, Card, Col, Dropdown, Menu, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import utils from "src/utils";
import { numberToMoneyVer2 } from "../../common/function/convertStringToMoney";
import {
  ActiveMembersData,
  AnnualStatisticData,
  NewMembersData,
  VisitorChartData,
} from "./DefaultDashboardData";

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
    dataIndex: "userId",
    key: "userId",
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
    title: "Thời hạn",
    dataIndex: "option",
    key: "option",
    render: (_: any, record: any) => <span> {record.option} Tháng</span>,
  },
  {
    title: "Tiền gửi",
    dataIndex: "deposits",
    key: "deposits",
    render: (_: any, record: any) => (
      <span>{numberToMoneyVer2(record.deposits)} VND</span>
    ),
  },
  {
    title: "Ngày gửi",
    dataIndex: "createAt",
    render: (_: any, record: any) => (
      <span>{moment(record.createAt).format("LL")}</span>
    ),
    key: "createAt",
  },
  {
    title: "Ngày đáo hạn",
    dataIndex: "endAt",
    render: (_: any, record: any) => (
      <span>{moment(record.endAt).format("LL")}</span>
    ),
    key: "endAt",
  },
];

export const Dashboard = () => {
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
      status: number | string;
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
    if (!checkNullObject(dashboard)) {
      let {
        chartDeposit,
        chartUser = [],
        numberOfPassbook,
        totalDeposit,
        newUsers,
        newDeposits,
        countUser,
      } = dashboard;
      setVisitorChartData({
        series: [
          {
            name: "Tiền gửi",
            data: chartDeposit.values,
          },
        ],
        categories: chartDeposit.categories,
      });
      console.log(chartDeposit);

      setActiveMembersData([
        {
          name: "User",
          data: chartUser.values,
        },
      ]);

      setAnnualStatisticData([
        {
          title: "Sổ tiết kiệm",
          value: numberOfPassbook.value + "",
          status: Number(numberOfPassbook.growthRate) || "0",
          subtitle: "So với " + numberOfPassbook.compareTo,
        },
        {
          title: "Tiền gửi",
          value: numberToMoneyVer2(totalDeposit.value) + "VND",
          status: Number(totalDeposit.growthRate) || "0",
          subtitle: "So với " + totalDeposit.compareTo,
        },
        {
          title: "Khách hàng",
          value: countUser.value + "",
          status: Number(countUser.growthRate) || "0",
          subtitle: "So với " + countUser.compareTo,
        },
      ]);

      setRecentTransactionData(newDeposits);

      setNewMembersData(
        newUsers.map((value: any) => ({
          img: value.photo || randomImage(),
          title: value.email,
          name: value.firstName + " " + value.lastName,
        }))
      );
    }
  }, [dashboard]);

  const getDashboardApi = () => {
    dispatch(getDashboard());
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
                  title="Biểu đồ tiền gửi"
                  series={VisitorChartData?.series}
                  xAxis={VisitorChartData?.categories}
                  height={"400px"}
                  direction={"ltr"}
                />
              )}
              {visitorChartData && (
                <ChartWidget
                  title="Biểu đồ tiền gửi"
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
            subtitle={"Khách hàng mới"}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card
            title="Khách hàng mới tham gia"
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
                    src={randomImage()}
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
            title="Giao dịch gần đây"
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

export default Dashboard;

import { numberToMoneyVer2 } from "@common/function/convertStringToMoney";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

const TableContainer = styled.div`
  ${tw`inline-block w-full border border-red-500 overflow-hidden rounded-xl`}
  border-style: solid;
`;
const TableBox = styled.table`
  ${tw`mx-auto w-full rounded-xl text-center `}
`;
const THead = styled.thead`
  ${tw`bg-red-600 text-white  z-20`}
`;
const TBody = styled.tbody`
  ${tw``}
`;
const Tr = styled.tr(() => [
  css`
    th:first-child,
    td:first-child {
      border-left: none !important;
    }
    th:last-child,
    td:last-child {
      border-right: none !important;
    }

    th {
      border-top: none !important;
    }

    &:last-child td {
      font-size: 16px;
      font-weight: 500;
      border-bottom: none !important;
      border-style: solid;
    }
  `,
]);
const styleCell = tw`border border-solid border-red-500 overflow-hidden overflow-ellipsis max-w-[200px]`;
const Th = styled.th(() => [styleCell, tw`px-4 py-3 uppercase`]);
const Td = styled.td(() => [styleCell, tw`px-4 py-5 text-base text-gray-600`]);

interface ITable {
  data: any;
}

const TableWithdraw: FC<ITable> = ({ data }) => {
  const [rawMonthsData, setRawMonthsData] = useState<any>();
  const [cleanData, setCleanData] = useState<any>();

  useEffect(() => {
    setRawMonthsData(data.cycles);

    let deposits = data.passbook.deposits;
    let money = data.money;

    setCleanData({ money: money, deposits: money - deposits });
  }, []);

  return (
    <TableContainer>
      <TableBox>
        <THead>
          <Tr>
            <Th>STT</Th>
            <Th>Lãi suất</Th>
            <Th>Bắt đầu</Th>
            <Th>Kết thúc</Th>
            <Th>Tổng tiền</Th>
          </Tr>
        </THead>
        <TBody>
          {rawMonthsData &&
            rawMonthsData.map((value: any, index: number) =>
              index === rawMonthsData.length - 1 ? (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{value.value}%</Td>
                  <Td>{moment(value.startDate).format("LLL")}</Td>
                  <Td>{moment(value.endDate).format("LLL")}</Td>
                  <Td>{numberToMoneyVer2(cleanData?.money)}</Td>
                </Tr>
              ) : (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{value.value}%</Td>
                  <Td>{moment(value.startDate).format("LLL")}</Td>
                  <Td>{moment(value.endDate).format("LLL")}</Td>
                  <Td>{numberToMoneyVer2(value.currentMoney)}</Td>
                </Tr>
              )
            )}

          <Tr>
            <Td colSpan={3}>TỔNG CỘNG</Td>
            <Td>{numberToMoneyVer2(cleanData?.deposits)}</Td>
            <Td>{numberToMoneyVer2(cleanData?.money)}</Td>
          </Tr>
        </TBody>
      </TableBox>
    </TableContainer>
  );
};

export default TableWithdraw;

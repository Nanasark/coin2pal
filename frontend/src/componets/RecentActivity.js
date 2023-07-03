import React from "react";
import { Card, Table } from "antd";
import { Pagination } from 'antd';

 <Pagination defaultCurrent={1} total={50} />;



const columns = [
  {
    title: "Payment Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Amount",
    key: "amount",
    render: (_, record) => (
      <div
        style={record.type === "Send" ? { color: "red" } : { color: "green" }}
      >
        {record.type === "Send" ? "-" : "+"}
        {(record.amount)} Matic
      </div>
    ),
  },
];

function RecentActivity({history})  {

  return (
  <Card title="Recent Activity" className="lg:h-[460px] xl:h-[450px] bg-[#FDFFF7] lg:w-[600px] xl:w-[800px] xl:min-w-[500px] shadow-[6px_5px_7px_0px_rgba(0,0,0,0.25)] lg:min-w-full border border-[#006843]">
      {history && 
      <Table
        dataSource={history}
        columns={columns}
        className="relative lg:bottom-5 xl:bottom-0 "
        pagination={{ position: ["bottomCenter"], pageSize: 4 }}
      />
    }
    </Card>
  );
}

export default RecentActivity;


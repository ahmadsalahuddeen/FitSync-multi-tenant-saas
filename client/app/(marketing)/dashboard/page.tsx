import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";

type Props = {};

async function getData() {
  const res = await fetch("https://....", { cache: "no-store" });
  const data = await res.json();
  return data;
}

const Dashboard = async (props: Props) => {
  const data = await getData();
  return <div>Dashboard</div>;
};

export default Dashboard;

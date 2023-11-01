import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";

type Props = {};

async function getData() {
  console.log('i am the server')
  const res = await fetch("https://....", { cache: "no-store" });
  const data = await res.json();
  return {color: 'red'};
}

const Dashboard = async (props: Props) => {
  const data = await getData();
  console.log('i am on the component ', data)
  return <div>Dashboard</div>;
};

export default Dashboard;

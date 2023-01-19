import React, { useEffect, useState} from "react";
import Categories from "./Categories/Categories";
import RecentJobsList from "./RecentJobsList";
import IntroBanner from './IntroBanner/IntroBanner';
import Plans from "./Plans/Plans";
import MasterCarousel from "./MasterCarousel";
import { testAPI } from './../../api/api';
import { homeAPI } from "./../../api/api";
import { useGetHighestRatedMastersQuery } from "../../features/home/homeApiSlice";

let HomeContent = (props) => {
  const { data: masters, isLoading } = useGetHighestRatedMastersQuery();

  return <>
    <IntroBanner />
    
    <Categories />  

    <RecentJobsList />

    {!isLoading && <MasterCarousel masters={masters} />}

    {/* {<Plans plans={plans} />} */}
  </>;
};

export default HomeContent;
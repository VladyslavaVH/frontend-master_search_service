import React from "react";
import Categories from "./Categories/Categories";
import RecentJobsList from "./RecentJobsList";
import IntroBanner from './IntroBanner/IntroBanner';
import MasterCarousel from "./MasterCarousel";
import { useGetHighestRatedMastersQuery } from "../../features/home/homeApiSlice";

let HomeContent = ({isMapApiLoaded}) => {
  const { data: masters, isLoading } = useGetHighestRatedMastersQuery();

  return <>
    <IntroBanner isMapApiLoaded={isMapApiLoaded} />
    
    <Categories />  

    <RecentJobsList />

    {!isLoading && <MasterCarousel masters={masters} />}

    {/* {<Plans plans={plans} />} */}
  </>;
};

export default HomeContent;
import React, { useState, useEffect } from "react";
import Category from "./Category";
import { useGetPopularCategoriesQuery } from "../../../features/home/homeApiSlice";
 
const Categories = (props) => {
    const { 
        data: popularCategories,
        //data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPopularCategoriesQuery();

    return <div className="section margin-top-65">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="section-headline centered margin-bottom-15">
                        <h3>Popular Job Categories</h3>
                    </div>

                    <div className="categories-container">
                        {
                            !isLoading && popularCategories?.map((c) =>
                                <Category key={c.id} {...c} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Categories;
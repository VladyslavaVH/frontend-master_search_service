import React, { useEffect, useState } from 'react';
import { useGetOptionCategoriesQuery } from '../../../features/details/detailsApiSlice';
import $ from 'jquery';

const CategoriesList = ({ categories }) => {
    const { data: optionCategories, isLoading } = useGetOptionCategoriesQuery();
    const [newCategory, setNewCategory] = useState(null);
    const [newCategoriesArr, setNewCategoriesArr] = useState([]);

    useEffect(() => {
        let keywordsList = $(this).find(".keywords-list");
        //removing keyword
		$(document).on("click",".keyword-remove", function(){
			$(this).parent().addClass('keyword-removed');

			function removeFromMarkup(){
			  $(".keyword-removed").remove();
			}
			setTimeout(removeFromMarkup, 500);
			keywordsList.css({'height':'auto'}).height();

            console.log(newCategoriesArr);
            setNewCategoriesArr(newCategoriesArr?.filter(c => c.id != newCategory));
            console.log(newCategoriesArr);
		});
    }, []);

    useEffect(() => {
        setNewCategoriesArr(categories);        
    }, [categories]);

    // adding category
    function addKeyword() {
        console.log(newCategoriesArr);
        let newC = '';
        for (const c of optionCategories) {
            if (c.id == newCategory) {
                newC = c;
                break;
            }
        }
        setNewCategoriesArr(prev => [...prev, newC]);

        // let keywordsList = $(this).find(".keywords-list");
        // let $newKeyword = 
        // $("<span class='keyword'><span class='keyword-remove'></span><span class='keyword-text'>"+ newCategory +"</span></span>");
        // keywordsList.append($newKeyword).trigger('resizeContainer');
    }
    
    return <div className="keywords-container">
        {!isLoading &&
        <div className="keyword-input-container margin-bottom-10">
            <select className="keyword-input with-border" defaultChecked={1} placeholder="e.g. Plumbing, Electricity" onChange={(e) => setNewCategory(e.target.value)} >
                {
                    optionCategories?.map(c => 
                        <option key={c.id} value={c.id}>{c.category}</option>
                    )
                }
            </select>
            <button onClick={() => addKeyword()} className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
        </div>}
        <div className="keywords-list" style={{ width: '100%', height: 'max-content' }}>
            {newCategoriesArr?.map(c =>
            <span key={c?.id} className="keyword"><span className="keyword-remove"></span><span className="keyword-text">{c?.category}</span></span>)}
        </div>
        <div className="clearfix"></div>
    </div>;
}

export default CategoriesList;
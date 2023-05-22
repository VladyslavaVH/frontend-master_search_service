import React, { useEffect, useState } from 'react';
import { selectCurrentLanguage } from '../../../features/auth/authSlice';
import { useGetOptionCategoriesQuery } from '../../../features/details/detailsApiSlice';
import CategorySelect from './../ClientOffice/JobPosting/CategorySelect';
import { useSelector } from 'react-redux';
import { fireCategoriesTr } from './../../../utils/firebase.config';

const CategoriesList = ({ setMasterCategories, categories }) => {
    const lang = useSelector(selectCurrentLanguage);
    const [trCategoriesArr, setTrCategoriesArr] = useState(null);
    const { data: optionCategories, isLoading } = useGetOptionCategoriesQuery();
    const [newCategoryFK, setCategoryFK] = useState(null);
    const [newCategoriesArr, setNewCategoriesArr] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            fireCategoriesTr(setTrCategoriesArr); 
        }
    }, [isLoading]);

    useEffect(() => {
        if (newCategoriesArr.length === 0 && categories) {
            setNewCategoriesArr(categories);            
        }
    }, [categories]);

    useEffect(() => {
        setMasterCategories(newCategoriesArr);
    }, [newCategoriesArr]);

    // adding category
    function addKeyword() {
        let newC = null;
        for (const c of optionCategories) {
            if (c.id == newCategoryFK) {
                if (!newCategoriesArr.find(nc => nc.id == newCategoryFK)) {
                    newC = { ...c, desc: 'new' };
                    setNewCategoriesArr(prev => [...prev, newC]);
                }
                break;
            }
        }
    }

    const removeKeyword = (cFK) => {
        let removedCategory = newCategoriesArr.find(nc => nc.id == cFK);
        removedCategory = { ...removedCategory, desc: 'delete' };

        let tmpArr = newCategoriesArr.filter(nc => nc.id != cFK);
        setNewCategoriesArr([...tmpArr, removedCategory]);
    }
    
    return <div className="keywords-container">
        {!isLoading &&
        <div className="keyword-input-container margin-bottom-10">
            <CategorySelect setCategoryFK={setCategoryFK} />
            <button type="button" onClick={() => addKeyword()} className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
        </div>}
        <div className="keywords-list" style={{ width: '100%', height: 'max-content' }}>
            {newCategoriesArr?.map(c => {
                let index = trCategoriesArr?.input?.indexOf(c.category);
                if (c?.desc !== 'delete') {
                    return <span key={c?.id} className="keyword"><span onClick={() => removeKeyword(c?.id)} className="keyword-remove"></span><span className="keyword-text">{(trCategoriesArr?.translated && trCategoriesArr.translated[index]) ? trCategoriesArr.translated[index][lang] : c?.category}</span></span>
                }                   
            })}
        </div>
        <div className="clearfix"></div>
    </div>;
}

export default CategoriesList;
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Pagination = ({ setPage, total, currentPage, lastPage }) => {
    const { t } = useTranslation();
    const [pages, setPages] = useState([]);

    useEffect(() => {
        let tmp = [];
        for (let i = 1; i <= lastPage; i++) {
            tmp.push(i);
        }

        setPages(tmp);
    }, [currentPage]);


    return <div className="pagination-container margin-top-20 margin-bottom-20">
    <nav className="pagination">
        {total > 0
        ?   <ul>
                {(currentPage > 1) && <li className="pagination-arrow">
                    <a onClick={() => setPage(currentPage - 1)}
                        className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>}
                {
                    pages?.map(page =>
                        <li key={page}><a
                            onClick={() => setPage(page)}
                            className={`ripple-effect${currentPage == page ? ' current-page' : ''}`}>{page}</a></li>)
                }
                {(currentPage != lastPage) && <li className="pagination-arrow">
                    <a onClick={() => setPage(currentPage + 1)}
                        className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>}
            </ul>
        :   <div>{t('NoJobsWereFoundForThisLocation')}</div>
        }
    </nav>
</div>;
};

export default Pagination;

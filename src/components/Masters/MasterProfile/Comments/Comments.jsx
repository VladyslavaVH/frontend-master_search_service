import React from 'react';
import { useGetCommentsByMasterIdQuery } from '../../../../features/masters/mastersApiSlice';
import Comment from './Comment';
import { useTranslation } from 'react-i18next';

const Comments = ({ id }) => {
    const { t } = useTranslation();
    const { data: comments, isLoading } = useGetCommentsByMasterIdQuery(id);
    return <>
        <div className="boxed-list margin-bottom-60">
            <div className="boxed-list-headline">
                <h3><i className="icon-material-outline-thumb-up"></i> {t('WorkHistoryAndFeedback')}</h3>
            </div>
            <ul className="boxed-list-ul">
                {
                    !isLoading &&
                    comments?.map(c => <Comment key={c.id} {...c} />)
                }
            </ul>

            {/* <!-- Pagination --> */}
            {/* {
                comments?.length > 3 &&
                <>
                    <div className="clearfix"></div>
                    <div className="pagination-container margin-top-40 margin-bottom-10">
                        <nav className="pagination">
                            <ul>
                                <li><a href="#" className="ripple-effect current-page">1</a></li>
                                <li><a href="#" className="ripple-effect">2</a></li>
                                <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="clearfix"></div>
                </>
            } */}
            {/* <!-- Pagination / End --> */}

        </div>
    </>;
}

export default Comments;

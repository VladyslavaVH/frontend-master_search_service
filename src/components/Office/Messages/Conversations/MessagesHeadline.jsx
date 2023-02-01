import React from "react";
import { useTranslation } from 'react-i18next';

const MessagesHeadline = (props) => {
    const { t } = useTranslation(); 
    return <div className="messages-headline">
    <div className="input-with-icon">
        <input id="autocomplete-input" type="text" placeholder={t("Search")} onChange={() => {}} />
        <i className="icon-material-outline-search"></i>
    </div>
</div>;
}

export default MessagesHeadline;
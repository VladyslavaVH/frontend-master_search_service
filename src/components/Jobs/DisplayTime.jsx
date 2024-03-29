import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { selectCurrentLanguage } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const DisplayTime = ({  createTime }) => { 
    const { t } = useTranslation(); 
    const [curDate, setCurDate] = useState(null);    
    const [jobDate, setJobDate] = useState(null);
    const lang = useSelector(selectCurrentLanguage);
    const [days, setDays] = useState(null);

    const changeTime = () => {
        setCurDate(new Date(Date.now()));

        const diffTime = Math.abs(new Date(Date.now()) - new Date(createTime));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setDays(diffDays);
    };

    useEffect(() => {
        setJobDate(new Date(createTime));
        changeTime();
    }, [createTime]);

    useEffect(() => {
        const interval = setInterval(changeTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return <>
        {days > 1
            ? `${lang == 'cs' ? 'před ' : ''} ${days} ${days === 1 ? t('OneDayAgo') : t('daysAgo')}`
            : (
                (!isNaN(curDate?.getHours() - jobDate?.getHours()) && (curDate?.getHours() - jobDate?.getHours()) > 1)
                    ? `${lang == 'cs' ? 'před ' : ''} ${curDate?.getHours() - jobDate?.getHours()} ${t('hrAgo')}`
                    : (!isNaN(curDate?.getMinutes() - jobDate?.getMinutes()) && (curDate?.getMinutes() - jobDate?.getMinutes()) > 1)
                        ? `${lang == 'cs' ? 'před ' : ''} ${curDate?.getMinutes() - jobDate?.getMinutes()} ${t('minAgo')}`
                        : ` ${t('now')}`
            )
        }
    </>;
}

export default DisplayTime;
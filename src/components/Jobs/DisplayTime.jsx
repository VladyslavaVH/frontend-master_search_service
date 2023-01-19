import React, { useEffect, useState } from "react";

const DisplayTime = ({ days, createTime }) => {  
    const [curDate, setCurDate] = useState(null);    
    const [jobDate, setJobDate] = useState(null);

    useEffect(() => {
        setCurDate(new Date(Date.now()));
        setJobDate(new Date(createTime));
    }, []);

    return <>{days > 0
        ? `${days} day${days === 1 ? '' : 's'} ago`
        : ((curDate?.getHours() - jobDate?.getHours() != 0)
            ? `${curDate?.getHours() - jobDate?.getHours()} hr ago`
            : (curDate?.getMinutes() - jobDate?.getMinutes() != 0)
                ? `${curDate?.getMinutes() - jobDate?.getMinutes()} min ago`
                : 'now'
        )}</>;
}

export default DisplayTime;
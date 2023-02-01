import { parseISO, formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';

const TimeAgo = ({ timestamp }) => {
    const { t } = useTranslation();
    let timeAgo = '';

    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        //timeAgo = `${timePeriod} ago`;
        timeAgo = `${timePeriod.split('')[0] == 1 ? t('OneDayAgo') : `${timePeriod.split('')[0]} ${t('daysAgo')}`} `;
    }

    return <span title={timestamp}>
        {/* &nbsp; */} {timeAgo}
    </span>;
}

export default TimeAgo;

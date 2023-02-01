import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

const ExpiringOn = ({ timestamp }) => {
    const { t }  = useTranslation();
    let expiringOn = '';

    if (timestamp) {
        //const date = parseISO(timestamp);
        expiringOn = `${t('ExpiringOn')} ${new Date(new Date().setDate(new Date(timestamp).getDate() + 7)).toDateString()}`;
    }

    return <span title={timestamp}>
        {/* &nbsp; */} {expiringOn}
    </span>;
}

export default ExpiringOn;

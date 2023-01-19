import { parseISO } from 'date-fns';

const ExpiringOn = ({ timestamp }) => {
    let expiringOn = '';

    if (timestamp) {
        const date = parseISO(timestamp);
        expiringOn = `Expiring on ${new Date(new Date().setDate(new Date(timestamp).getDate() + 7)).toDateString()}`;
    }

    return <span title={timestamp}>
        {/* &nbsp; */} {expiringOn}
    </span>;
}

export default ExpiringOn;

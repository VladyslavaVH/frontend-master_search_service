import React from "react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useTranslation } from 'react-i18next';

const Documents = ({ documents }) => {
    return <div className="col-xl-12 padding-bottom-15" style={{ display: 'flex', flexWrap: 'wrap' }}>
    <PhotoProvider
        speed={() => 800}
        easing={(type) => (type === 3 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
    >
        {documents?.map((item, index) => (
            <PhotoView key={index} src={item}>
                <img style={{ marginRight: '.5rem', marginBottom: '.5rem', objectFit: 'cover', width: '11rem', height: '9rem', maxWidth: '100%', display: 'block', verticalAlign: 'middle', cursor: 'pointer' }} src={item} alt="" />
            </PhotoView>
        ))}
    </PhotoProvider>
</div>;
};

export default Documents;

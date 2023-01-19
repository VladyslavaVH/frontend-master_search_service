import '../api/api';

const INIT = 'INIT';

let initialState = {
    jobsPostedCount: 1586,
    mastersCount: 1232,
    popularCategories: [
        { id: 1, isPopular: true, name: 'Web & Software Dev', count: 512, description: 'Software Engineer, Web / Mobile Developer & More', icon: 'icon-line-awesome-file-code-o' },
        { id: 2, isPopular: true, name: 'Data Science & Analytics', count: 113, description: 'Data Specialist / Scientist, Data Analyst & More', icon: 'icon-line-awesome-cloud-upload' },
        { id: 3, isPopular: true, name: 'Accounting & Consulting', count: 186, description: 'Auditor, Accountant, Financial Analyst & More', icon: 'icon-line-awesome-suitcase' },
        { id: 4, isPopular: true, name: 'Writing & Translations', count: 298, description: 'Copywriter, Creative Writer, Translator & More', icon: 'icon-line-awesome-pencil' },
        { id: 5, isPopular: true, name: 'Sales & Marketing', count: 549, description: 'Brand Manager, Marketing Coordinator & More', icon: 'icon-line-awesome-pie-chart' },
        { id: 6, isPopular: true, name: 'Graphics & Design', count: 873, description: 'Creative Director, Web Designer & More', icon: 'icon-line-awesome-image' },
        { id: 7, isPopular: true, name: 'Digital Marketing', count: 125, description: 'Darkening Analyst, Social Profile Admin & More', icon: 'icon-line-awesome-bullhorn' },
        { id: 8, isPopular: true, name: 'Education & Training', count: 445, description: 'Advisor, Coach, Education Coordinator & More', icon: 'icon-line-awesome-graduation-cap' },
    ],
    recentJobs: [
        { id: 1, isVerified: true,  title: 'Plumber', clientName: 'Alexander', location: 'San Francisco', category: 'Plumbing', time: '2 days ago'},
        { id: 2, isVerified: false, title: 'Plumber', clientName: 'Vivian', location: 'San Francisco', category: 'Plumbing', time: '2 days ago'},
        { id: 3, isVerified: false, title: 'Plumber', clientName: 'Morgan', location: 'San Francisco', category: 'Plumbing', time: '2 days ago'},
        { id: 4, isVerified: true,  title: 'Plumber', clientName: 'Kris', location: 'San Francisco', category: 'Plumbing', time: '2 days ago'},
        { id: 5, isVerified: false, title: 'Plumber', clientName: 'Steve', location: 'San Francisco', category: 'Plumbing', time: '2 days ago'}
    ],
    highestRatedMasters: [
        { id: 1, isVerified: true, photo: 'user-avatar-big-01.jpg', fullName: 'Tom Smith', position: 'UI/UX Designer', rating: 5.0, flag: 'gb', country: 'United Kingdom', location: 'London', currency: '$', rate: 60, period: 'hr', successPercent: 95 },
        { id: 2, isVerified: true, photo: 'user-avatar-big-02.jpg', fullName: 'David Peterson', position: 'IOS Expert + Node Dev', rating: 5.0, flag: 'de', country: 'Germany', location: 'Berlin', currency: '$', rate: 40, period: 'hr', successPercent: 88 },
        { id: 3, isVerified: false, photo: null, fullName: 'Marcia Kowalski', position: 'Front-End Developer', rating: 4.9, flag: 'pl', country: 'Poland', location: 'Warsaw', currency: '$', rate: 50, period: 'hr', successPercent: 100 },
        { id: 4, isVerified: true, photo: 'user-avatar-big-03.jpg', fullName: 'Sindy Forest', position: 'Magento Certified Developer', rating: 5.0, flag: 'pl', country: 'Australia', location: 'Brisbane', currency: '$', rate: 70, period: 'hr', successPercent: 100 },
        { id: 5, isVerified: false, photo: null, fullName: 'Sebastian Piccolo', position: 'Laravel Dev', rating: 4.5, flag: 'au', country: 'Italy', location: 'Milan', currency: '$', rate: 80, period: 'hr', successPercent: 89 },
        { id: 6, isVerified: false, photo: null, fullName: 'Gabriel Lagueux', position: 'WordPress Expert', rating: 5.0, flag: 'fr', country: 'France', location: 'Paris', currency: '$', rate: 50, period: 'hr', successPercent: 100 }
    ],
    plans: [
        { id: 1, isRecommended: false, name: 'Basic Plan', monthPrice: '$19', yearPrice: '$205', planParams: [ '1 Listing', '30 Days Visibility', 'Highlighted in Search Results' ], condition: 'One time fee for one listing or task highlighted in search results.' },
        { id: 2, isRecommended: true, name: 'Standard Plan', monthPrice: '$49', yearPrice: '$529', planParams: [ '5 Listing', '60 Days Visibility', 'Highlighted in Search Results' ], condition: 'One time fee for one listing or task highlighted in search results.' },
        { id: 3, isRecommended: false, name: 'Extended Plan', monthPrice: '$99', yearPrice: '$1069', planParams: [ 'Unlimited Listings Listing', '90 Days Visibility', 'Highlighted in Search Results' ], condition: 'One time fee for one listing or task highlighted in search results.' }
    ]
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default homeReducer;
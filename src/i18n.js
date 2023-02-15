import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          Home: 'Home',
          PostAJob: 'Post a Job',
          About: 'About',
          Support: 'Support',
          AdminPanel: 'Admin Panel',
          Statistics: 'Statistics',
          Office: 'Office',
          Howdy: 'Howdy',
          Greetings: 'We are glad to see you again!',
          ManageJobs: 'Manage Jobs',
          LogInRegister: 'Log In / Register',
          Register: 'Register',
          LogIn: 'Log In',
          DontHaveAnAccount: `Don't have an account?`,
          SignUp: 'Sign Up!',
          PhoneNumber: 'Phone number',
          Phone: 'Phone',
          Password: 'Password',
          RepeatPassword: 'Repeat Password',
          TrustThisDevice: 'Trust this device',
          ForgotPassword: 'Forgot Password?',
          LetsCreateYourAccount: `Let's create your account!`,
          Client: 'Client',
          Master: 'Master',
          FirstName: 'First Name',
          LastName: 'Last Name',
          Notifications: 'Notifications',
          MarkAllAsRead: 'Mark all as read',
          appliedForAJob: 'applied for a job',
          YouHaveNoUnreadNotifications: 'You have no unread notifications',
          YouHaveNoUnreadMessages: 'You have no unread messages',
          ViewAllMessages: 'View All Messages',
          Messages: 'Messages',
          Settings: 'Settings',
          Logout: 'Logout',
          mainDescription: {
            part1: `Hire masters or be hired for any job at any time.`,
            part2: `Thousands of users use `,
            part3: ` for quick solutions to everyday problems.`
          },
          Search: 'Search',
          Where: 'Where?',
          Place: 'Place',
          WhatJobYouWant: 'What job you want?',
          JobTitle: 'Job Title',
          JobCategory: 'Job Category',
          JobsPosted: 'Jobs Posted',
          Masters: 'Masters',
          PopularJobCategories: 'Popular Job Categories',
          Categories: 'Categories',
          RecentJobs: 'Recent Jobs',
          BrowseAllJobs: 'Browse All Jobs',
          daysAgo: 'days ago',
          OneDayAgo: '1 day ago',
          ApplyNow: 'Apply Now',
          ApplyForAJob: 'Apply for a Job',
          HighestRatedMasters: 'Highest Rated Masters',
          BrowseAllMasters: 'Browse All Masters',
          MasterProfile: 'Master Profile',
          ViewProfile: 'View Profile',
          ForMasters: 'For Masters',
          ForClients: 'For Clients',
          BrowseJobs: 'Browse Jobs',
          BrowseCandidates: 'Browse Candidates',
          Contact: 'Contact',
          PrivacyPolicy: 'Privacy Policy',
          Account: 'Account',
          MyAccount: 'My Account',
          AllRightsReserved: 'All Rights Reserved.',
          HelpfulLinks: 'Helpful Links',
          OfficeNavigation: 'Office Navigation',
          ViewMasterProfile: `Viewing the master's profile`,
          Start: 'Start',
          MyJobListing: 'My Job Listing',
          JobSubmissionForm: 'Job Submission Form',
          Loading: 'Loading',
          Location: 'Location',
          Payment: 'Payment',
          DateAndTime: 'Date and Time',
          JobDescription: 'Job Description',
          ImagesThatMightBeHelpfulInDescribingYourJob: 'Images that might be helpful in describing your job',
          UploadPhotos: 'Upload Photos',
          TypeAddress: 'Type Address',
          Posted: 'Posted',
          ExpiringOn: 'Expiring on',
          MyMaster: 'My Master',
          ManageCandidates: 'Manage Candidates',
          Job: 'Job',
          jobStatus: {
            PendingApproval: 'Pending Approval',
            Expiring: 'Expiring',
            Expired: 'Expired'
          },
          ConfirmTheWorkDone: 'Confirm the work done',
          SaveNewAvatar: 'Save New Avatar',
          AccountType: 'Account Type',
          Verified: 'Verified',
          Verify: 'Verify',
          Tagline: 'Tagline',
          YourMessage: 'Your Message',
          Send: 'Send',
          DeleteConversation: 'Delete Conversation',
          CompletedJobs: 'Completed Jobs',
          TotalAmountEarned: 'Total Amount Earned',
          JobQRScanner: 'Job QR Scanner',
          ViewJobs: 'View Jobs',
          MyProfile: 'My Profile',
          Nationality: 'Nationality',
          IntroduceYourself: 'Introduce Yourself',
          UploadPassportPhotos: 'Upload passport photos',
          UploadAPhotoOfYourTaxIdentificationNumber: 'Upload a photo of your tax identification number',
          MyDocuments: 'My Documents',
          NewJobs: 'New Jobs',
          NewMasters: 'New Masters',
          AdminPanelNavigation: 'Admin Panel Navigation',
          VerifyTheDocuments: ' Verify the documents',
          Edit: 'Edit',
          AddJobCategory: 'Add Job Category',
          VerificationOfDocuments: 'Verification of documents',
          Editing: 'Editing',
          AddingJobCategories: 'Adding job categories',
          More: 'More',
          Documents: 'Documents',
          NewMaster: 'New Master',
          SaveChanges: 'Save changes',
          NewCategory: 'New Category',
          Description: 'Description',
          isPopular: 'is popular',
          Create: 'Create',
          AllCategories: 'All Categories',
          TheMasterDidntProvideAnyDocuments: `The master didn't provide any documents`,
          Question: 'Question',
          Answer: 'Answer',
          AboutMe: 'About Me',
          WorkHistoryAndFeedback: 'Work History and Feedback',
          RatedAs: 'Rated as',
          JobsDone: 'Jobs Done',
          Rehired: 'Rehired',
          ConfirmedMaster: 'Confirmed Master',
          Candidate: {
            part1: 'Candidate',
            part2: 's'
          },
          For: 'For',
          SendMessage: 'Send Message',
          Remove: 'Remove',
          Accept: 'Accept',
          AnyQuestionsFeelFreeToContactUs: 'Any questions? Feel free to contact us!',
          Confirm: 'Confirm',
          Users: 'Users',
          Location: 'Location',
          Category: 'Category',
          Currency: 'Currency',
          WhatSpecialistDoYouNeed: 'What specialist do you need?',
          ContactUs: 'Contact Us',
          OurOffice: 'Our Office',
          BecomeAMaster: 'Become a master',
          MinPayment: 'Min Payment',
          MaxPayment: 'Max Payment',
          AboutTheClient: 'About the Client',
          JobDescription: 'Job Description',
          JobInformation: 'Job Information',
          AppliedForThisJob: 'Applied for this job',
          You: 'You',
          Confirmed: 'Confirmed',
          DatePosted: 'Date Posted',
          SearchResults: 'Search Results',
          ShowFilters: 'Show Filters',
          HideFilters: 'Hide Filters',
          ClickToExpandSidebarWithFilters: 'Click to expand sidebar with filters!',
          NoJobsWereFoundForThisLocation: 'No jobs have been found for this location. Try applying other filters',
          SelectACategory: 'Select a category',
          itemsSelected: 'items selected',
          SelectANationality: 'Select a nationality',
          SelectACurrency: 'Select a currency',
        }
    },
    uk: {
        translation: {
          Home: 'Головна',
          PostAJob: 'Створити заявку',
          About: 'Про нас',
          Support: 'Підтримка',
          AdminPanel: 'Адмін Панель',
          Statistics: 'Статистика',
          Office: 'Мій Кабінет',
          Howdy: 'Привіт',
          Greetings: 'Ми раді бачити вас знову!',
          ManageJobs: 'Керуйте заявками',
          LogInRegister: 'Увійти / Зареєструватися',
          Register: 'Зареєструватися',
          LogIn: 'Увійти',
          DontHaveAnAccount: 'Немає акаунту?',
          SignUp: 'Зареєструватися!',
          PhoneNumber: 'Номер телефону',
          Phone: 'Tелефон',
          Password: 'Пароль',
          RepeatPassword: 'Повторіть пароль',
          TrustThisDevice: 'Довіряти цьому пристрою',
          ForgotPassword: 'Забули пароль?',
          LetsCreateYourAccount: 'Давайте створимо ваш акаунт!',
          Client: 'Клієнт',
          Master: 'Майстер',
          FirstName: `Ім'я`,
          LastName: 'Призвіще',
          Notifications: 'Сповіщення',
          MarkAllAsRead: 'Позначити все як прочитане',
          appliedForAJob: 'подав(ла) заявку',
          YouHaveNoUnreadNotifications: 'У вас немає непрочитаних сповіщень',
          YouHaveNoUnreadMessages: 'У вас немає непрочитаних повідомлень',
          ViewAllMessages: 'Переглянути всі повідомлення',
          Messages: 'Повідомлення',
          Settings: 'Налаштування',
          Logout: 'Вийти',
          mainDescription: {
            part1: `Наймайте майстрів або будьте найняті на будь-яку роботу в будь-який час.`,
            part2: `Тисячі користувачів використовують `,
            part3: ` для швидкого вирішення щоденних проблем.`
          },
          Search: 'Пошук',
          Where: 'Де?',
          Place: 'Місце',
          WhatJobYouWant: 'Яку роботу ти хочеш?',
          JobTitle: 'Назва посади',
          JobCategory: 'Категорія заявки',
          JobsPosted: 'Опублікованих вакансій',
          Masters: 'Майстрів',
          PopularJobCategories: 'Популярні категорії вакансій',
          Categories: 'Категорії',
          RecentJobs: 'Останні заявки',
          BrowseAllJobs: 'Переглянути всі заявки',
          daysAgo: 'днів тому',
          OneDayAgo: '1 день тому',
          ApplyNow: 'Відгукнутись зараз',
          ApplyForAJob: 'Відгукнутись на заявку',
          HighestRatedMasters: 'Майстри з найвищим рейтингом',
          BrowseAllMasters: 'Переглянути всіх майстрів',
          MasterProfile: 'Профіль майстра',
          ViewProfile: 'Переглянути профіль',
          ForMasters: 'Для майстрів',
          ForClients: 'Для клієнтів',
          BrowseJobs: 'Переглянути заявки',
          BrowseCandidates: 'Перегляд кандидатів',
          Contact: 'Контакт',
          PrivacyPolicy: 'Політика конфіденційності',
          Account: 'Акаунт',
          MyAccount: 'Мій акаунт',
          AllRightsReserved: 'Всі права захищені.',
          HelpfulLinks: 'Корисні Посилання',
          OfficeNavigation: 'Навігація кабінетом',
          ViewMasterProfile: 'Перегляд профілю майстра',
          Start: 'Старт',
          MyJobListing: 'Мій список заявок',
          JobSubmissionForm: 'Форма подання заявки',
          Loading: 'Завантаження',
          Location: 'Місцезнаходження',
          Payment: 'Оплата',
          DateAndTime: 'Дата й час',
          JobDescription: 'Описання роботи',
          ImagesThatMightBeHelpfulInDescribingYourJob: 'Зображення, які можуть бути корисними для опису вашої роботи',
          UploadPhotos: 'Завантажити фотографії',
          TypeAddress: 'Введіть адресу',
          Posted: 'Опубліковано',
          ExpiringOn: 'Термін дії закінчується',
          MyMaster: 'Мій майстер',
          ManageCandidates: 'Керування кандидатами',
          Job: 'Заявка',
          jobStatus: {
            PendingApproval: 'Очікує підтвердження',
            Expiring: 'Термін дії закінчується',
            Expired: 'Термін дії минув'
          },
          ConfirmTheWorkDone: 'Підтвердити виконану роботу',
          SaveNewAvatar: 'Зберегти новий аватар',
          AccountType: 'Тип акаунту',
          Verified: 'Перевірено',
          Verify: 'Підтвердити',
          Tagline: 'Tagline',
          YourMessage: 'Твоє повідомлення',
          Send: 'Надіслати',
          DeleteConversation: 'Видалити бесіду',
          CompletedJobs: 'Виконані заявки',
          TotalAmountEarned: 'Загальна зароблена сума',
          JobQRScanner: 'QR-сканер виконаної заявки',
          ViewJobs: 'Переглянути актуальні заявки',
          MyProfile: 'Мій профіль',
          Nationality: 'Національність',
          IntroduceYourself: 'Представтеся', 
          UploadPassportPhotos: 'Завантажте фотографії паспорту',
          UploadAPhotoOfYourTaxIdentificationNumber: 'Завантажте фотографію свого податкового номера',
          MyDocuments: 'Мої документи',
          NewJobs: 'Нові Заявки',
          NewMasters: 'Нові Майстри',
          AdminPanelNavigation: 'Навігація панелі адміністратора',
          VerifyTheDocuments: 'Перевірити документи',
          Edit: 'Редагувати',
          AddJobCategory: 'Додайте категорію роботи',
          VerificationOfDocuments: 'Перевірка документів',
          Editing: 'Редагування',
          AddingJobCategories: 'Додавання категорій вакансій',
          More: 'Більше',
          Documents: 'Документи',
          NewMaster: 'Новий майстер',
          SaveChanges: 'Зберегти зміни',
          NewCategory: 'Нова категорія',
          Description: 'Опис',
          isPopular: 'є популярним',
          Create: 'Створити',
          AllCategories: 'Всі категорії',
          TheMasterDidntProvideAnyDocuments: 'Документів майстер не надав',
          Question: 'Запитання',
          Answer: 'Відповідь',
          AboutMe: 'Про мене',
          WorkHistoryAndFeedback: 'Історія роботи та відгуки',
          RatedAs: 'Оцінено як',
          JobsDone: 'Виконано',
          Rehired: 'Перенайняли',
          ConfirmedMaster: 'Підтверджений майстер',
          Candidate: {
            part1: 'Кандидат',
            part2: 'и'
          },
          For: 'Для',
          SendMessage: 'Надіслати повідомлення',
          Remove: 'Видалити',
          Accept: 'Прийняти',
          AnyQuestionsFeelFreeToContactUs: 'Які-небудь питання? Не соромтеся звертатися до нас!',
          Confirm: 'Підтвердити',
          Users: 'Користувачів',
          Location: 'Місцезнаходження',
          Category: 'Категорія',
          Currency: 'Валюта',
          WhatSpecialistDoYouNeed: 'Який фахівець вам потрібний?',
          ContactUs: `Зв'язатися з нами`,
          OurOffice: 'Наш Офіс',
          BecomeAMaster: 'Стати майстром',
          MinPayment: 'Мінімальна плата',
          MaxPayment: 'Максимальна плата',
          AboutTheClient: 'Про клієнта',
          JobDescription: 'Описання роботи',
          JobInformation: 'Інформація про роботу',
          AppliedForThisJob: 'Відгукнувся на цю заявку',
          You: 'Ви',
          Confirmed: 'Підтверджені',
          DatePosted: 'Дата публікації',
          SearchResults: 'Результати пошуку',
          ShowFilters: 'Показати фільтри',
          HideFilters: 'Приховати фільтри',
          ClickToExpandSidebarWithFilters: 'Натисніть, щоб розгорнути бічну панель із фільтрами!',
          NoJobsWereFoundForThisLocation: 'Для цього місця актуальних заявок не знайдено. Спробуйте застосувати інші фільтри',
          SelectACategory: 'Виберіть категорію',
          itemsSelected: 'вибрано елементів',
          SelectANationality: 'Виберіть національність',
          SelectACurrency: 'Виберіть валюту',
        }
      },
      cs: {
        translation: {
          Home: 'Hlavní',
          PostAJob: 'Vytvořte aplikaci',
          About: 'O nás',
          Support: 'Podpora',
          AdminPanel: 'Administrátorská lišta',
          Statistics: 'Statistika',
          Office: 'Moje kancelář',
          Howdy: 'Ahoj',
          Greetings: 'Jsme rádi, že vás zase vidíme!',
          ManageJobs: 'Správa aplikací',
          LogInRegister: 'Přihlásit se / Registrovat',
          Register: 'Registrovat',
          LogIn: 'Přihlásit se',
          DontHaveAnAccount: 'Nemáte účet?',
          SignUp: 'Přihlásit se!',
          PhoneNumber: 'Telefonní číslo',
          Phone: 'Telefonn',
          Password: 'Heslo',
          RepeatPassword: 'Zopakovat heslo',
          TrustThisDevice: 'Důvěřujte tomuto zařízení',
          ForgotPassword: 'Zapomenuté heslo?',
          LetsCreateYourAccount: 'Pojďme vytvořit váš účet!',
          Client: 'Klient',
          Master: 'Mistr',
          FirstName: `Název`,
          LastName: 'Příjmení',
          Notifications: 'Oznámení',
          MarkAllAsRead: 'Označit vše jako přečtené',
          appliedForAJob: 'podal přihlášku',
          YouHaveNoUnreadNotifications: 'Nemáte žádná nepřečtená oznámení',
          YouHaveNoUnreadMessages: 'Nemáte žádné nepřečtené zprávy',
          ViewAllMessages: 'Zobrazit všechny zprávy',
          Messages: 'Zprávy',
          Settings: 'Nastavení',
          Logout: 'Odhlásit se',
          mainDescription: {
            part1: `Najměte si mistry nebo buďte kdykoli najati na jakoukoli práci.`,
            part2: `Tisíce uživatelů používají `,
            part3: ` pro rychlá řešení každodenních problémů.`
          },
          Search: 'Vyhledávání',
          Where: 'Kde?',
          Place: 'Místo',
          WhatJobYouWant: 'Jakou práci chceš?',
          JobTitle: 'Pracovní pozice',
          JobCategory: 'Kategorie aplikace',
          JobsPosted: 'Zveřejněná volná místa',
          Masters: 'Mistrů',
          PopularJobCategories: 'Oblíbené pracovní kategorie',
          Categories: 'Tsategoris',
          RecentJobs: 'Nejnovější aplikace',
          BrowseAllJobs: 'Zobrazit všechny aplikace',
          daysAgo: 'před pár dny',
          OneDayAgo: 'před 1 dnem',
          ApplyNow: 'Odpověz teď',
          ApplyForAJob: 'Odpovězte na žádost',
          HighestRatedMasters: 'Mistři s nejvyšším hodnocením',
          BrowseAllMasters: 'Zobrazit všechny mistry',
          MasterProfile: 'Profil mistra',
          ViewProfile: 'Prohlédnout profil',
          ForMasters: 'Pro mistry',
          ForClients: 'Pro klienty',
          BrowseJobs: 'Zobrazit aplikace',
          BrowseCandidates: 'Prohlížení kandidátů',
          Contact: 'Kontakt',
          PrivacyPolicy: 'Zásady ochrany osobních údajů',
          Account: 'Účet',
          MyAccount: 'Můj účet',
          AllRightsReserved: 'Všechna práva vyhrazena.',
          HelpfulLinks: 'Užitečné odkazy',
          OfficeNavigation: 'Navigace v kanceláři',
          ViewMasterProfile: 'Zobrazení profilu mistra',
          Start: 'Start',
          MyJobListing: 'Můj seznam aplikací',
          JobSubmissionForm: 'Přihláška',
          Loading: 'Načítání',
          Location: 'Umístění',
          Payment: 'Způsob platby',
          DateAndTime: 'Datum a čas',
          JobDescription: 'Popis práce',
          ImagesThatMightBeHelpfulInDescribingYourJob: 'Obrázky, které mohou být užitečné při popisu vaší práce',
          UploadPhotos: 'Nahrát fotky',
          TypeAddress: 'Zadejte adresu',
          Posted: 'Vyslán',
          ExpiringOn: 'Vyprší dne',
          MyMaster: 'Můj pán',
          ManageCandidates: 'Vedení kandidátů',
          Job: 'Aplikace',
          jobStatus: {
            PendingApproval: 'Čeká na schválení',
            Expiring: 'Končí platnost',
            Expired: 'Platnost vypršela'
          },
          ConfirmTheWorkDone: 'Potvrďte vykonanou práci',
          SaveNewAvatar: 'Uložit nového avatara',
          AccountType: 'Typ účtu',
          Verified: 'Ověřeno',
          Verify: 'Ověření',
          Tagline: 'Tagline',
          YourMessage: 'Vaše zpráva',
          Send: 'Poslat',
          DeleteConversation: 'Smazat konverzaci',
          CompletedJobs: 'Dokončené přihlášky',
          TotalAmountEarned: 'Celkový vydělaný Amont',
          JobQRScanner: 'QR-skener vyplněné žádosti',
          ViewJobs: 'Zobrazit aktuální aplikace',
          MyProfile: 'Můj profil',
          Nationality: 'Národnost',
          IntroduceYourself: 'Představit se',
          UploadPassportPhotos: 'Nahrajte pasové fotografie',
          UploadAPhotoOfYourTaxIdentificationNumber: 'Nahrajte fotografii svého daňového identifikačního čísla',
          MyDocuments: 'Moje dokumenty',
          NewJobs: 'Nové aplikace',
          NewMasters: 'Noví mistři',
          AdminPanelNavigation: 'Navigace v panelu administrátora',
          VerifyTheDocuments: 'Ověřte dokumenty',
          Edit: 'Upravit',
          AddJobCategory: 'Přidat kategorii práce',
          VerificationOfDocuments: 'Ověřování dokladů',
          Editing: 'Editace',
          AddingJobCategories: 'Přidání pracovních kategorií',
          More: 'Více',
          Documents: 'Dokumenty',
          NewMaster: 'Nový Mistr',
          SaveChanges: 'Uložit změny',
          NewCategory: 'Nová kategorie',
          Description: 'Popis',
          isPopular: 'je populární',
          Create: 'Vytvořit',
          AllCategories: 'Všechny kategorie',
          TheMasterDidntProvideAnyDocuments: 'Mistr nepředložil žádné dokumenty',
          Question: 'Otázka',
          Answer: 'Odpovědět',
          AboutMe: 'O mně',
          WorkHistoryAndFeedback: 'Historie práce a zpětná vazba',
          RatedAs: 'Hodnoceno jako',
          JobsDone: 'Hotovo',
          Rehired: 'Znovu přijati',
          ConfirmedMaster: 'Potvrzený Mistr',
          Candidate: {
            part1: 'Kandidát',
            part2: 'і'
          },
          For: 'Pro',
          SendMessage: 'Poslat zprávu',
          Remove: 'Odstranit',
          Accept: 'Akceptovat',
          AnyQuestionsFeelFreeToContactUs: 'Nějaké otázky? Neváhejte nás kontaktovat!',
          Confirm: 'Potvrdit',
          Users: 'Uživatelé',
          Location: 'Umístění',
          Category: 'Kategorie',
          Currency: 'Měna',
          WhatSpecialistDoYouNeed: 'Jakého specialistu potřebujete?',
          ContactUs: 'Kontaktujte nás',
          OurOffice: 'Naše Kancelář',
          BecomeAMaster: 'Staňte se mistrem',
          MinPayment: 'Minimální poplatek',
          MaxPayment: 'Maximální nabití',
          AboutTheClient: 'O Klientovi',
          JobDescription: 'Popis práce',
          JobInformation: 'Informace o práci',
          AppliedForThisJob: 'Odpověděl na tuto aplikaci',
          You: 'Vy',
          Confirmed: 'Potvrzeno',
          DatePosted: 'Datum zveřejnění',
          SearchResults: 'Výsledky vyhledávání',
          ShowFilters: 'Zobrazit filtry',
          HideFilters: 'Skrýt filtry',
          ClickToExpandSidebarWithFilters: 'Kliknutím rozbalíte postranní panel s filtry!',
          NoJobsWereFoundForThisLocation: 'Na tuto pozici nebyly nalezeny žádné aktuální přihlášky. Zkuste použít jiné filtry',
          SelectACategory: 'Vyberte kategorii',
          itemsSelected: 'vybrané položky',
          SelectANationality: 'Виберіть національність',
          SelectACurrency: 'Vyberte měnu',
        }
      },
    }
  });

export default i18n;
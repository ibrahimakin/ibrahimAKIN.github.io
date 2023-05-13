const sidenav_width = 1000;
const lang_obj = {
    tr: {
        turkiye: 'Türkiye',
        skills: 'YETENEKLER',
        interests: 'İLGİ ALANLARI',
        frontend_development: 'Ön Yüz Geliştirme',
        embedded_software: 'Gömülü Yazılımlar',
        fullstack_development: 'Full Stack Geliştirme',
        microservices: 'Mikro Servisler',
        mobile_programming: 'Mobil Programlama',
        backend_development: 'Arka Uç Geliştirme',
        machine_learning: 'Makine Öğrenmesi',
        image_processing: 'Görüntü İşleme',
        autonomous_system: 'Otonom Sistemler',
        game_development: 'Oyun Geliştirme',
        languages: 'DİLLER',
        english: 'İngilizce',
        pwp: 'Profesyonel çalışma yetkinliği',
        turkish: 'Türkçe',
        nbp: 'Yerli veya ikinci dil yetkinliği',
        software_engineer: 'Yazılım Mühendisi',
        prsnl_desc: 'Beni en iyi tanımlayan sıfat meraktır. Yeni teknolojiler keşfetmek ve öğrenmek için sık sık araştırma yapmaktan keyif alırım.',
        education: 'EĞİTİM',
        computer_engineering: 'Bilgisayar Mühendisliği',
        comu: 'Çanakkale Onsekiz Mart Üniversitesi',
        courses: 'Dersler',
        read_more: 'daha fazla',
        read_less: 'daha az',
        less_courses: 'Mobil Programlama, Görüntü İşleme, Bilgisayar Ağları, Nesneye Dayalı Analiz ve Tasarım',
        more_courses: ', Algoritma ve Programlama, Lineer Cebir, Yapısal Programlama, Veri Yapıları, Nesneye Yönelik Programlama, Ayrık Matematik, Diferansiyel Denklemler, Analog Elektronik, Olasılık ve İstatistik, Sayısal Yöntemler, Web Tasarımı ve Programlama, Bilgisayar Organizasyonu, Sayısal Elektronik, Veri Tabanı Yönetim Sistemleri, İşletim Sistemleri, Veri Yönetimi ve Dosya Yapıları, Windows Programlama, Mikro Denetleyiciler, Veri Madenciliği, Programlama Dilleri Kavramları, Veri Haberleşmesi, Programlanabilir Denetleyiciler, Mikroişlemciler ve Mikrobilgisayar, Yazılım Mühendisliği, Formal Diller ve Otomat Teorisi, Bulut Bilişime Giriş, Bilgisayar Mimarisi, Algoritma Analizi, Gömülü Sistem Tasarımı, Nesnelerin İnternetine Giriş, Yazılım Sınama Teknikleri',
        uavproject: 'İnsansız Hava Aracı Projesi',
        management_i_s: 'Yönetim Bilişim Sistemleri',
        anatolian_university: 'Anadolu Üniversitesi',
        present: 'Devam Ediyor',
        work_experience: 'İŞ DENEYİMİ',
        vestel_desc: 'Gömülü TV yazılımları üzerine çalışmaktayım.',
        fullstack_developer: 'Yazılım Geliştirici',
        ithero: 'IT HERO Bilgi Teknolojileri ve Tic.',
        ithero_desc: 'Autommate robotik süreç otomasyonu projesi üzerinde yazılım geliştirici olarak çalıştım.',
        rpa: 'Robotik Süreç Otomasyonu',
        see_project: 'Projeyi gör',
        technical_support: 'Teknik Destek',
        ts_desc: 'Uzaktan Eğitim Merkezi, Çanakkale Onsekiz Mart Üniversitesi bünyesinde kısmi zamanlı çalışan öğrenci.',
        ce_intern: 'Bilgisayar Mühendisliği Stajı',
        inc: 'A.Ş.',
        cei_desc: 'Eğitim teknolojileri, uygulama ve oyun geliştirme alanında staj.',
        achievements: 'Başarılar',
        tasks: 'Görevler',
        cashier: 'Kasiyer',
        sales_consultant: 'Satış Danışmanı',
        certificates: 'SERTİFİKALAR',
        bootcamp: 'Eğitim Kampı',
        cloud: 'Bulut Bilişim ve Endüstri 4.0 Dr. Abduxukur Abdurixit',
        symposium: 'Girişimcilik, İnovasyon ve Biyoteknoloji Sempozyumu',
        airport_system: 'Havaalanı Rezervasyon Sistemi',
        credit_system: 'Kredi Sistemi',
        britishtown: 'BritishTown İngilizce C1 Seviyesi',
        bmo_docker: 'Bilgisayar Mühendisleri Odası Docker Eğitimi',
        coronathon: '21-22 Mart 2020 Coronathon Türkiye Etkinliği Başarılı Projeleri',
        occupational: 'İş Sağlığı ve Güvenliği Sertifikası',
        see_credential: 'Sertifikayı gör',
        final_project: 'Final Projesi',
        project: 'Proje',
        r_projects: 'PROJELER',
        autommate: 'Bir yazılım geliştirici olarak, sıfırdan geliştirilmekte olan robotik süreç otomasyonu projesinde çoğunlukla frontend olmak üzere, backend, mikro servis ve chrome eklentisi geliştirilmesinden sorumluydum. Bu proje üzerinde çalışırken, RESTful API\'ye dayalı, kullanıcı etkileşimli bir SaaS uygulamasının geliştirmesine dahil oldum. Kullanılan teknolojiler; React 17.0, Hooks, durum yönetimi için Redux, React Router DOM, backend için NodeJS ve Sequelize, mikro servisler için GoLang ve gRPC.',
        appomodoro: 'Appomodoro, kullanıcılarının Pomodoro tekniği olarak bilinen çalışma yöntemini verimli bir şekilde uygulamasını amaçlayan platformlar arası bir mobil uygulamadır. Bu doğrultuda kullanıcı, tekniğin ilkeleri olan 25 dakika çalışma ve 5 dakika dinlenme ile günlük çalışma hedefine ulaşır. Uygulamamız, kişinin kendi profilini oluşturmasına, günlük hedeflerini, çalışma ve dinlenme sürelerini özelleştirmesine olanak tanır. Farklı cihazlarda kendi kişisel ayarları ile uygulamayı kullanmaya devam edebilir. Ayrıca kullanıcıya haftalık istatistikler sunulmakta ve kişinin gelişimini takip etmesi sağlanmakta ayrıca motivasyon sağlamak amacıyla arka arkaya tamamlanan günlük/haftalık hedefler için kullanıcılara başarı ödülleri verilmekte ve istatistik sayfasında sunulmaktadır.',
        pandemapp: 'Hastalık teşhisi konulan kişilerin geçmişe dönük olarak bulundukları yerleri, geçtikleri yolları veya çok vakit geçirdikleri konumları takip ederek riskli alanları tespit etmelerine, öngörülerde bulunmalarına ve hızlı önlem almalarına yardımcı olan bir mobil uygulama.',
        vatoz: 'Uçuş sırasında çeşitli sensörlerden veri alabilen, şu anda üzerinde çalıştığımız bir RC uçak projesidir. Ayrıca geliştirdiğim masaüstü ve mobil uygulamalarda bu verilerin analiz edilerek görüntülenmesi amaçlanmaktadır.',
        app: 'Uygulaması',
        chat: 'Firebase altyapısı kullanılarak geliştirilmiş gerçek zamanlı mobil mesajlaşma uygulaması.',
        login: 'Windows ve Android\'de kullanıcı hesaplarını yöneten, bluetooth ile senkronize edilen uygulamalar.',
        omr: 'Optik İşaret Tanıma Projesi',
        omrd: 'Görüntü işleme yöntemleriyle optik formda işaretlenen seçeneği belirlemek ve doğruluğunu kontrol etmek için Android uygulaması.',
        piko: 'Staj süresince geliştirilen eğitici oyun. Temel bilim ve matematik işlemlerini öğretmeyi amaçlar ve çeşitli bulmacalar içerir.',
        lcdd: 'Android / Windows / Web\'de PicBasic için LCD / Display karakter hesaplama.'
    },
    en: {
        turkiye: 'Turkiye',
        skills: 'SKILLS',
        interests: 'INTERESTS',
        frontend_development: 'Frontend Development',
        embedded_software: 'Embedded Software',
        fullstack_development: 'Full Stack Development',
        microservices: 'Microservices',
        mobile_programming: 'Mobile Programming',
        backend_development: 'Backend Development',
        machine_learning: 'Machine Learning',
        image_processing: 'Image Processing',
        autonomous_system: 'Autonomous Systems',
        game_development: 'Game Development',
        languages: 'LANGUAGES',
        english: 'English',
        pwp: 'Professional Working Proficiency',
        turkish: 'Turkish',
        nbp: 'Native or Bilingual Proficiency',
        software_engineer: 'Software Engineer',
        prsnl_desc: 'The best adjective that describes me is curious. I always want to learn new things and search them to discover.',
        education: 'EDUCATION',
        computer_engineering: 'Computer Engineering',
        comu: 'Canakkale 18th March University',
        courses: 'Courses',
        read_more: 'read more',
        read_less: 'read less',
        less_courses: 'Mobile Programming, Image Processing, Computer Networks, Object Oriented Analysis And Design',
        more_courses: ', Algorithm and Programming, Linear Algebra, Structural Programming, Data Structures, Object Oriented Programming, Discrete Mathematics, Differantial Equations, Analog Electronics, Propbability and Statistics, Numerical Methods, Web Page Design and Programming, Computer Organization, Digital Elektronics, Database Management Systems, Managing Systems, Data Management and File Structures, Windows Programming, Micro Controllers, Data Mining, Programming Languages Concepts, Data Communication, Programmable Controllers, Microprocessors and Microcomputers, Software Engineering, Formal Languages and Automata Theory, Introduction to Cloud Computing, Computer Architecture, Analysis Of Algorithms, Embedded System Design, Access to the Internet of Things, Software Testing Techniques',
        uavproject: 'Unmanned Aerial Vehicle Project',
        management_i_s: 'Management Information Systems',
        anatolian_university: 'Anadolu University',
        present: 'Present',
        work_experience: 'WORK EXPERIENCE',
        vestel_desc: 'I\'m working on embedded TV software.',
        fullstack_developer: 'Full Stack Developer',
        ithero: 'IT HERO Information Technology & Services',
        ithero_desc: 'I worked on Autommate robotic process automation project as a full stack developer.',
        rpa: 'Robotic Process Automation',
        see_project: 'See project',
        technical_support: 'Technical Support',
        ts_desc: 'Part-time working student at Canakkale 18th March University Online Education Center.',
        ce_intern: 'Computer Engineering Internship',
        inc: 'Inc.',
        cei_desc: 'Educational technologies, application and game development.',
        achievements: 'Achievements',
        tasks: 'Tasks',
        cashier: 'Cashier',
        sales_consultant: 'Sales Consultant',
        certificates: 'CERTIFICATES',
        bootcamp: 'Bootcamp',
        cloud: 'Cloud Computing and Industry 4.0 by Dr. Abduxukur Abdurixit',
        symposium: 'Entrepreneurship, Innovation and Biotechnology Symposium',
        airport_system: 'Airport Reservation System',
        credit_system: 'Credit System',
        britishtown: 'BritishTown C1 Level in English',
        bmo_docker: 'The Chamber of Computer Engineers Docker Education',
        coronathon: '21-22 March 2020 Coronathon Turkey Activity Successful Projects',
        occupational: 'Occupational Health and Safety Certificate',
        see_credential: 'See credential',
        final_project: 'Final Project',
        project: 'Project',
        r_projects: 'PROJECTS',
        autommate: 'As a software developer, I was responsible for mainly front-end development as well as back-end, microservices, and chrome extension development of the robotic process automation project developed from scratch. Working on this project, I got involved in developing a user-interactive SaaS application based on RESTful API. The technologies used included React 17.0 with Hooks, Redux for state management, React Router DOM for managing route structure, NodeJS and Sequelize for the back-end, GoLang and gRPC for microservices.',
        appomodoro: 'Appomodoro is a cross-platform mobile application that aims for its users to efficiently apply the working method known as the Pomodoro technique. In this direction, the user reaches the daily working goal with 25 minutes of work and 5 minutes of rest, which are the principles of the technique. Our application allows the person to create their own profile, and customize their daily goals, work, and rest periods. It can continue to use the application with its personal settings on different devices. In addition, weekly statistics are provided to the user, and it is ensured that the person follows his/her progress, in addition, in order to provide motivation, success awards are given to users for the daily/weekly goals that are completed consecutively and presented on the statistics page.',
        pandemapp: 'A mobile application that helps people who have been diagnosed with the disease, to retrospectively follow the locations, the roads they pass, or the places they spend a lot of time to identify risk areas, make predictions, and take quick precautions.',
        vatoz: 'It is an RC airplane project that we are currently working on, which can receive data from various sensors during flight. In addition, it is aimed to analyze and display this data in desktop and mobile applications I have developed.',
        app: 'Application',
        chat: 'Real-time mobile messaging application developed using Firebase infrastructure.',
        login: 'Applications synced with bluetooth for managing user accounts on Windows and Android.',
        omr: 'Optical Mark Recognition Project',
        omrd: 'Android application for determining the option marked in optical form with image processing methods and checking its accuracy.',
        piko: 'During the internship, an educational game was developed. The game aims to teach basic science and math operations and includes various puzzles.',
        lcdd: 'LCD / Display character calculation for PicBasic on Android / Windows / Web.'
    }
};
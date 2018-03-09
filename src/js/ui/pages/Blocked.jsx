import React, { Component } from 'react';

import 'css/pages/decree.css'




import LocalizedStrings from 'react-localization';
 
 import HeaderLogin from 'js/ui/components/HeaderLogin.jsx'
import Footer from 'js/ui/components/Footer.jsx'


let strings = new LocalizedStrings({
 en:{
	 title: 'A complete list of IT companies that are under sanctions'
	,content1:'On May 15, the President of Ukraine signed a decree that enacted a decision of the National Security and Defense Council on sanctions against Russian companies and their subsidiaries in Ukraine. There are 468 legal entities in the list, among which 81 are related to the IT sphere. All kinds of restrictions apply not only to popular social networks and portals Mail.ru, VKontakte, Odnoklassniki and Yandex services. The ban was a number of service IT companies and integrators, manufacturers and distributors of ERP, CRM-systems for business, including "1C" and "Sail". The editorial board of AIN.UA gives a complete list of IT-spheres that came under the sanctions of legal entities.'
	,content2:'For all legal entities, sanctions consist of eight prohibitive items, although for some like Mail.Ru Group or "Yandex" there are additional restrictions. All IT companies listed on the list have three years:'
	,content3: 'The assets are blocked, trading operations are restricted, a ban is imposed on withdrawing funds from Ukraine, the fulfillment of economic and financial obligations is suspended, the provision of telecom services and the use of general purpose networks are restricted or terminated, public procurement from legal entities in which there is a share of state structures of the Russian Federation is prohibited, or participants in the sanctions list, the issuance of licenses, permits for import and export of currency valuables from Ukraine, and restrictions on the issuance of cash on payment cards mouths issued by foreign banks may not transfer technology, rights of intellectual property.'
	
	
	, header1: "Social media and portals"
, mail_ru_content: 'The Russian legal entity of the company" Mail.RU GROUP "LLC and its Ukrainian subsidiary" Mail.Ru Ukraine "LLC (in the list under the numbers 422 and 425) were included in the sanctions list. Mail.Ru holding controls the eponymous portal, postal service and social network "My World." It also distributes a number of online games, for which all eight prohibiting items operate, and Internet providers need to block access to the main page - mail.ru. '
, vk_ok_content: 'Both social networks are among the most popular in Ukraine and are part of the Mail.ru Group, while Russian and Ukrainian legal entities" VKontakte "are listed as separate items - 423 and 424. For them, the restrictions are the same as for Mail.ru and blocking access to the main pages of social networks - vk.com and ok.ru. '
, y_content: 'In the sanctions list, the Russian and Ukrainian yurlitsa" Yandex. "They are limited by the standard eight points. Ukrainian Internet providers will need to block a lot of services of" Yandex "on the Russian domain .ru and Ukrainian .ua, including the main pages of Yandex. ru and Yandex.ua.Servers for measuring Internet audience and advertising should get under lock-out: '
, y_list1: 'Yandex.Auditors, Yandex.Metrics, Yandex.Vebmaster, Yandex.Direct, Yandex.Advertising Network, Yandex.Statistics'

, y_content2: 'The list also includes the popular portals" Kinoisk "and" Avto.ru ", which belong to the company.In addition, the blocking is waiting for most consumer services:'
, y_list2: 'Yandex.Mail, Yandex.Maps, Yandex.Browser, Yandex.Disk, Yandex.Kalendar, Yandex.Metro, Yandex.Taxy (Russian domain), Yandex.Music, Yandex.Market, Yandex.News, Yandex.Real Estate, Yandex.Translator, Yandex.People, Yandex.Rabota, Yandex.Radio , Yandex.Raspisanie, Yandex.Avia tickets search, Yandex.Afish poster, Yandex.Money, Yandex video segment, Yandex.Vremya, showing the time of different time zones, Delivery service from the Internet "Yandex.Dost Application "," Yandeks.Internetometr ", displaying data on a browser and an internet connection, image search" Yandex "Payment service" Yandeks.Kassa "," DMOZ "'

, y_content3: 'The list does not include" Yandex.Navigator "and the situation with" Taxi "is not clear, since only the Russian domain is indicated, however, both of these services use forbidden" Maps. "Given that the work of Yandex services can rely on each other, then the blockage will affect the entire ecosystem of the company. '


, av_header: "Antivirus companies"
, av_content: "Antivirus companies Kaspersky Lab and Doctor Web are old-timers of the Ukrainian sanctions list that first entered into it in 2015. In October of last year, they were prolonged with sanctions, and two months later the Russian Kaspersky Lab decided to liquidate the subsidiary in the current list of providers are also required to block access to the main pages of antivirus companies: kaspersky.com and drweb.ru Does this mean that the Ukrainian users with installed software will not be able to update the anti-virus database - it's unclear. "
, pr_header: "IT companies"
, abbyy_header: "ABBYY"
, abbyy_content: "For the first time, the Russian food company ABBYY, which is known for its Lingvo and FineReader dictionaries, entered the sanctions list, the sanctions concern its Russian and Ukrainian legal entities, the latter was registered back in 1995. The office of the company employs about 150 employees in Kiev. The Ukrainian office is responsible for the entire Eastern and Central Europe, Israel and Turkey, most of the company's marketing materials are being prepared in Kiev, and direct communication with local partners is conducted from it. will not allow the company to continue to conduct similar activities in Ukraine. "
, systems_header: "Systems for Enterprises"
, c_header: " 1C "
, c_content: 'Many Ukrainian enterprises and online stores use 1C products: ERP and CRM-systems and a lot of modules." The sanctions list turned out to be both Russian and Ukrainian legal entities - 1C LLC and 1C Multimedia Ukraine, and their various distributors and representatives in Ukraine: Єvrosoftoft, Skyline Software, Sunline, 1s-Telur Module, Alfa-Com Soft, 1C-Rarus Soft Ukraina, and First Bit. three years.'
, sail_header: "Sail "
, sail_content: 'The large Russian competitor" 1C "- the corporation" Parus "also came under sanctions, it provides various systems for managing the enterprise, its document circulation, finance, assets, logistics, personnel. The list includes 26 legal entities related to Sail: the Russian company Parus Corporation, representative offices in Ukraine Parus-Spetsproekt, Parus-2, Parus-Budget, Parus-Ukraina, Parus-Vprovazhennya "," Parus-Misto "," Parus-Zahid "," Parus-Pri " Carpathians, Parus-Ternopil, Parus-Dnipro, Parus-Donbas, Parus-Zaporizhzhya, Parus-Kharkiv, CIT Parus-Plus, Parus-1, Parus- Desna "," Parus-Zhitomir "," Parus-Rivne "," Center for Information Technologies "Parus-Unity", "Donbass-Budget", "Parus-Kirovograd", "South Parus", "Parus-Tavria", "Kharkiv "Buget", "Parus-Lev." For all of them, similar "1C" sanctions for a period of three years are applied. '
, g_header: '"Galaxy", "Letograf", "Corus Consulting CIS"'
, g_content: 'There are two more Russian food companies operating in the field of enterprise systems in the list." Sanctions were introduced for Russian and Ukrainian legal entities of Galaktika Corporation - Galaktika Center CJSC and Galaktika Galaktika Kyiv Ltd. This company is developing with the same name ERP-system. The company "Letograf" develops products in the field of document management and business process automation, its Russian legal entity "Letograf IT Consulting And Services" and the Ukrainian representative office "Letograf Іt Konsalting І Poslui "Corus Consulting CIS" works in the sphere of electronic document circulation and is included in the group of companies "Sberbank." Among the clients of the Russian division are many large retailers, including Auchan, METRO, BILLA. '
, it_header: "IT consulting, integration and development"
, it_content: 'From the sphere of IT consulting, the integration of solutions and development under sanctions were 14 companies.In the presidential decree, their legal entities are slender next to the number 281 to 309. Sanctions for them are similar to" 1C. "Among IT integrators:" Ai -Teko Projects "and its subsidiary" Ai-Teco Ukraine "," Softline Group "and" Softline Group "Ukraine", "NVO" EDD "and legal entities" NVision Group "(owned by AFK Sistema, owner of the operator MTS) NVision-Ukraine "," NVision-Holding "and" NVision-Assets ". From the sphere of IT-consulting sanctions were affected by the following companies: LLC" Dock " Management Company "," NTC Consulting "," Optima-Ukraina "," Asteros Ukraina "," Effective Rishennya Sumi "," Ukraine "," Sapran Ukraine "," Sapran Group "," Masterdata Ukraina "," Masterata " "Mont UA", "Mont", "Ascon - KR", "Ascon." '
, gic_header: "GIS-systems"
, gic_content: "There are three Ukrainian companies in the list that deal with various geoinformation systems: GISINFO, NVP Enertekh and Polyterm, for which the same prohibits eight points."

	}
 ,
 ua: {
    title: "Повний список IT-компаній, що потрапили під санкції"
	,content1:"15 травня президент України підписав указ, яким ввів в дію рішення Ради національної безпеки і оборони з санкцій щодо російських компаній та їх дочірніх підприємств в Україні. Всього в списку 468 юридичних осіб, серед яких 81 пов'язані з IT-сферою. Різного роду обмеження стосуються не тільки популярних соцмереж і порталів Mail.ru, «ВКонтакте», «Однокласники» і сервісів «Яндекса». Під забороною опинилися ряд сервісних IT-компаній і інтеграторів, виробників і дистриб'юторів ERP, CRM-систем для бізнесу, включаючи «1С» і «Парус». Редакція AIN.UA наводить повний список потрапили під санкції юросіб IT-сфери."
	,content2:"Для всіх юридичних осіб санкції складаються з восьми забороняють пунктів, хоча для деяких начебто Mail.Ru Group або «Яндекса» є додаткові обмеження. У всіх IT-компаній, що потрапили в список, на три роки:"
	,content3:"Заборонені активи, Обмежуються торгові операції, Вводиться заборона на виведення коштів за межі України, Зупиняється виконання економічних і фінансових зобов'язань, Обмежується або припиняється надання телеком-послуг і використання мереж загального назначненія, Забороняються державні закупівлі у юросіб, в яких є частка держструктур РФ, або учасників списку санкцій, Припиняється видача ліцензій, дозволів на ввезення і вивезення з України валютних цінностей та обмеження на видачу готівки за платіжними до ротами, емітованими іноземними банками, не повинні розкривати технології, права на об'єкти інтелектуальної власності. "
	, header1: "Соціальні медіа і портали"
, mail_ru_content: "У списку санкцій потрапили російське юрособа компанії ТОВ« мейл.ру ГРУП »і її українська дочка ТОВ« мейл.ру Україна »(в списку під номерами 422 і 425). Холдинг Mail.Ru контролює однойменний портал, поштовий сервіс і соціальну мережу «Мій світ». Він також займається дистрибуцією ряду онлайн-ігор. Для них діють всі вісім забороняють пунктів, а від інтернет-провайдерів потрібно блокувати доступ до головної сторінки - mail.ru. "
, vk_ok_content: "Обидві соцмережі є одними з найбільш популярних в Україні та входять в Mail.ru Group. При цьому, російське і українські юрособи« ВКонтакте »внесено до списку окремими пунктами - 423 і 424. Для них обмеження ті ж, що і для Mail.ru і блокування доступу до головних сторінках соцмереж - vk.com і ok.ru. "
, y_content: "У списку санкцій російське і українське юрособи« Яндекса ». Їх обмежують за стандартними вісьмома пунктами. Українським інтернет-провайдерам потрібно буде блокувати безліч сервісів« Яндекса »на російському домені .ru і українському .ua, включаючи і головні сторінки Yandex. ru і Yandex.ua. Під блокування повинні потрапити сервіси для вимірювання інтернет-аудиторії і реклами: "
, y_list1: "« Яндекс.Аудіторіі »,« Яндекс.Метрика »,« Яндекс.Вебмайстер »,« Яндекс.Директ »,« Яндекс.Рекламная мережу »,« Яндекс.Статістіка »"
, y_content2: "У списку також популярні портали« Кинопоиск »і« Авто.ру », які належать компанії. Крім цього, блокування чекає і більшість споживчих сервісів:"
, y_list2: "« Яндекс.Пошта »,« Яндекс.Карти »,« яндекс.браузер », Сервіс зберігання файлів« Яндекс.Діск »,« яндекс.календар »,« Яндекс.Метро »,« Яндекс.Таксі »(російський домен), «Яндекс.Музика», «Яндекс.Маркет», «Яндекс.Новини», «Яндекс.Нерухомість», «яндекс.перекладач», «Яндекс.Погода», «Яндекс.Работа», «Яндекс.Радіо» , «Яндекс.Распісаніе», Пошук авіаквитків «Яндекс.Авіабілети», Афіша заходів «Яндекс.Афіша», «Яндекс.Деньги», відеорозділ «Яндекса», «Яндекс.Время», що показує час різних часових поясах, Сервіс доставки з інтернет -магазинів «Яндекс.Дост вка »,« Яндекс.Інтернетометр », що відображає дані про браузер і інтернет-з'єднанні, Пошук по картинках« Яндекс », Платіжний сервіс« Яндекс.Касса »,« Яндекс.Каталог »"
, y_content3: "У списку не вказано« Яндекс.Навігатор »і не зрозуміла ситуація з« Таксі », оскільки зазначений тільки російський домен. Однак, обидва ці сервісу для роботи використовують заборонені« Карти ». З огляду на, що робота сервісів« Яндекса »може спиратися один на одного, то блокування торкнеться всю екосистему компанії. "
	
	, av_header: "Антивірусні компанії"
, av_content: "Антивірусні компанії« Лабораторія Касперського »і« Доктор Веб »- старожили українського списку санкцій, які вперше потрапили в нього в 2015 році. У жовтні минулого року санкції для них продовжили. А через два місяці російська« Лабораторія Касперського »вирішила ліквідувати дочірню компанію в Україні. Крім раніше діяли обмежень на ведення комерційної діяльності, в поточному списку провайдерів також зобов'язують блокувати доступ до головних сторінках антивірусних компаній: kaspersky.ru і drweb.ru. чи означає це, що українські користувачі з встановленим ПО не зможуть оновлювати антивірусні бази - незрозуміло. "
, pr_header: "Продуктові компанії"
, abbyy_header: "ABBYY"
, abbyy_content: "Вперше до списку санкцій потрапила російська продуктова компанія ABBYY, яка відома словниками Lingvo і продуктом FineReader. Санкції стосуються її російського і українського юрособи. Останнє було зареєстровано ще в 1995 році. У Києві знаходиться офіс компанії, де працює близько 150 співробітників. Український офіс відповідає за всю Східну і Центральну Європу, Ізраїль та Туреччину. Більшість маркетингових матеріалів компанії готуються в Києві. з нього ж ведеться пряме спілкування з локальними партнерами. Введені обмеження швидше за все не дозволять компанії продовжувати так само вести діяльність в Україні. "
, systems_header: "Системи для підприємств"
, c_header: "« 1C »"
, c_content: "Багато українських підприємств і інтернет-магазини користуються продуктами компанії« 1С »: ERP і CRM-системами та безліччю модулів. У списку санкцій виявилися як російське та українські юрособи - ТОВ« 1С »і« 1С Мультимедіа Україна », так і різні їхні дистриб'ютори та представники в Україні: «Єврософтпром», «Скайлайн Софтвер», «Санлайн», «1С-Телур Модуль», «Альфа-Ком Софт», «1С-Рарус Софт Україна», «Перший біт». Заборони дійсні три роки."
, sail_header: "« Парус »"
, sail_content: "Великий російський конкурент« 1С »- корпорація« Парус »також потрапила під санкції. Вона надає різні системи для управління підприємством, його документообігом, фінансами, активами, логістикою, персоналом. Системи аналогічних напрямків є і для державних органов.В списку санкцій списку значиться 26 юросіб, пов'язаних з «Парус»: російське ТОВ «Корпорація« Парус », представництва в Україні« Парус- Спецпроект »,« Парус-2 »,« Парус-Бюджет »,« Парус-Україна »,« Парус-Впровадження »,« Парус-Місто »,« Парус-Захід »,« Парус-Прі Карпатт »,« Парус-Тернопіль »,« Парус-Дніпро »,« Парус-Донбас »,« Парус-Запоріжжя »,« Парус-Харків »,« ЦІТ «Парус-Плюс», «Парус-1», «Парус- Десна »,« Парус-Житомир »,« Парус-Рівне »,« Центр інформаційних технологій «Парус-Єднання», «Донбас-Бюджет», «Парус-Кіровоград», «Южний Парус», «Парус-Таврія», «Харків -Бюджет »,« Парус-Лев ». Для всіх них застосовуються аналогічні« 1С »санкції терміном на три роки."
, g_header: "« Галактика »,« Летограф »,« Корус Консалтинг СНД »"
, g_content: "У списку опинилися ще дві російські продуктові компанії, які працюють в сфері систем для підприємств. Санкції введені для російського і українського юросіб корпорації« Галактика »- ЗАТ« Галактика Центр »і ТОВ« Корпорація Галактика Київ ». Ця компанія займається розробкою однойменної ERP-сістеми.Компанія «Летограф» розробляє продукти в сфері управління документами та автоматизації бізнес-процесів. Її російське юрособа «Летограф ІТ Консалтинг і Послуги» і українське представництво «Летограф Іт Консалтинг і Послуги Україна »також торкнуться санкції.« Корус Консалтинг СНД »працює в сфері електронного документообігу та входить в групу компаній« Ощадбанку ». Серед клієнтів російського підрозділу багато великі рітейлери, включаючи« Ашан », METRO, BILLA."
, it_header: "IT-консалтинг, інтеграція і розробка"
, it_content: 'Зі сфери IT-консалтинг, інтеграції рішень і розробки під санкціями виявилися 14 компаній. В указі президента їх юридичні особи йдуть струнким рядом від номера 281 до 309. Санкції для них аналогічні« 1С ».Серед IT-інтеграторів:« Ай -ТЕК Проекти »і дочірня« Ай-Теко Україна »,« Софтлайн Груп »і« Софтлайн Груп "Україна", "НВО« ЕДД »і юридичні особи« Енвіжн Груп »(належить АФК« Система », власнику оператора МТС) -« Енвіжн-Україна »,« Енвіжн-Холдинг »і« Енвіжн-Активи ».З сфери IT-консалтингу санкції торкнулися наступні компанії: ТОВ« Док умент Менеджмент »,« НТК Консалтинг »,« Оптима-Україна »,« Астерос Україна »,« Ефектівні решение Суми »,« Інталєв Україна »,« Сапран Україна »,« Сапран Груп »,« Мастердата Україна »,« Мастердата », «Монт УА», «Монт», «Аскон - КР», «Аскон». '
, gic_header: "ГІС-системи"
, gic_content: "У списку є три українських юрособи компаній, які займаються різними геоінформаційними системами:« ГІСІНФО »,« НВП Енертех »і« Політерм ». Для них все ті ж забороняють вісім пунктів."
	},
 ru: {
	 title: "Полный список IT-компаний, попавших под санкции",
	 content1:"15 мая президент Украины подписал указ, которым ввел в действие решение Совета национальной безопасности и обороны по санкциям в отношении российских компаний и их дочерних предприятий в Украине. Всего в списке 468 юридических лиц, среди которых 81 связаны с IT-сферой. Разного рода ограничения касаются не только популярных соцсетей и порталов Mail.ru, «ВКонтакте», «Одноклассники» и сервисов «Яндекса». Под запретом оказался ряд сервисных IT-компаний и интеграторов, производителей и дистрибьюторов ERP, CRM-систем для бизнеса, включая «1С» и «Парус». Редакция AIN.UA приводит полный список попавших под санкции юрлиц IT-сферы."
	,content2:"Для всех юридических лиц санкции состоят из восьми запрещающих пунктов, хотя для некоторых вроде Mail.Ru Group или «Яндекса» есть дополнительные ограничения. У всех IT-компаний, попавших в список, на три года:"
	
	,content3:"Запрещенные активы, Ограничиваются торговые операции, Вводится запрет на вывод средств за пределы Украины, Останавливается выполнения экономических и финансовых обязательств, Ограничивается или прекращается предоставление телеком-услуг и использования сетей общего назначнения, Запрещаются государственных закупках у юрлиц, в которых доля госструктур РФ, или участников списка санкций, Прекращается выдача лицензий, разрешений на ввоз и вывоз из Украины валютных ценностей и ограничения на выдачу наличных по платежным к ртами, эмитированным иностранными банками, не должны раскрывать технологии, права на объекты интеллектуальной собственности "
	,header1: "Социальные медиа и порталы"
	,mail_ru_content: "В санкционный список попали российское юрлицо компании ООО «Мэйл.РУ ГРУП» и ее украинская дочка ТОВ «Мейл.РУ Україна» (в списке под номерами 422 и 425). Холдинг Mail.Ru контролирует одноименный портал, почтовый сервис и социальную сеть «Мой мир». Он также занимается дистрибуцией ряда онлайн-игр. Для них действуют все восемь запрещающих пунктов, а от интернет-провайдеров требуется блокировать доступ к главной странице — mail.ru. "
	,vk_ok_content: "Обе соцсети являются одними из наиболее популярных в Украине и входят в Mail.ru Group. При этом, российское и украинские юрлица «ВКонтакте» внесены в список отдельными пунктами — 423 и 424. Для них ограничения те же, что и для Mail.ru и блокирование доступа к главным страницам соцсетей — vk.com и ok.ru."
	,y_content: "В санкционном списке российское и украинское юрлица «Яндекса». Их ограничивают по стандартным восьми пунктам. Украинским интернет-провайдерам нужно будет блокировать множество сервисов «Яндекса» на российском домене .ru и украинском .ua, включая и главные страницы Yandex.ru и Yandex.ua. Под блокировку должны попасть сервисы для измерения интернет-аудитории и рекламы:"
	,y_list1: "«Яндекс.Аудитории»,«Яндекс.Метрика»,«Яндекс.Вебмастер»,«Яндекс.Директ», «Яндекс.Рекламная сеть», «Яндекс.Статистика»"
	,y_content2: "В списке также популярные порталы «Кинопоиск» и «Авто.ру», которые принадлежат компании. Помимо этого, блокировка ждет и большинство потребительских сервисов:"
	,y_list2: "«Яндекс.Почта», «Яндекс.Карты»,«Яндекс.Браузер»,Сервис хранения файлов «Яндекс.Диск»,«Яндекс.Календарь»,«Яндекс.Метро»,«Яндекс.Такси» (российский домен),«Яндекс.Музыка»,«Яндекс.Маркет»,«Яндекс.Новости»,«Яндекс.Недвижимость»,«Яндекс.Переводчик»,«Яндекс.Погода»,«Яндекс.Работа»,«Яндекс.Радио»,«Яндекс.Расписание»,Поиск авиабилетов «Яндекс.Авиабилеты»,Афиша мероприятий «Яндекс.Афиша»,«Яндекс.Деньги»,Видеораздел «Яндекса»,«Яндекс.Время», показывающий время разных часовых поясах,Сервис доставки из интернет-магазинов «Яндекс.Доставка»,«Яндекс.Интернетометр», отображающий данные о браузере и интернет-соединении, Поиск по картинкам «Яндекс»,Платежный сервис «Яндекс.Касса», «Яндекс.Каталог»"
	,y_content3: "В списке не указан «Яндекс.Навигатор» и не понятна ситуация с «Такси», поскольку указан только российский домен. Однако, оба эти сервиса для работы используют запрещенные «Карты». Учитывая, что работа сервисов «Яндекса» может опираться друг на друга, то блокировка затронет всю экосистему компании."
	
	,av_header: "Антивирусные компании"
	,av_content: "Антивирусные компании «Лаборатория Касперского» и «Доктор Веб» — старожилы украинского санкционного списка, впервые попавшие в него в 2015 году. В октябре прошлого года санкции для них продлили. А спустя два месяца российская «Лаборатория Касперского» решила ликвидировать дочернюю компанию в Украине. Помимо ранее действовавших ограничений на ведение коммерческой деятельности, в текущем списке провайдеров также обязывают блокировать доступ к главным страницам антивирусных компаний: kaspersky.ru и drweb.ru. Означает ли это, что украинские пользователи с установленным ПО не смогут обновлять антивирусные базы — непонятно."
	,pr_header: "Продуктовые компании"
	,abbyy_header: "ABBYY"
	,abbyy_content: "Впервые в санкционный список попала российская продуктовая компания ABBYY, которая известна словарями Lingvo и продуктом FineReader. Санкции касаются ее российского и украинского юрлица. Последнее было зарегистрировано еще в 1995 году. В Киеве находится офис компании, где работает около 150 сотрудников.  Украинский офис отвечает за всю Восточную и Центральную Европу, Израиль и Турцию. Большинство маркетинговых материалов компании готовятся в Киеве. Из него же ведется прямое общение с локальными партнерами. Введенные ограничения скорее всего не позволят компании продолжать так же вести деятельность в Украине."
	,systems_header: "Системы для предприятий"
	,c_header: "«1C»"
	,c_content: "Многие украинские предприятия и интернет-магазины пользуются продуктами компании «1С»: ERP и CRM-системами и множеством модулей. В санкционном списке оказались как российское и украинские юрлица — ООО «1С» и «1С Мультимедіа Україна», так и различные их дистрибьюторы и представители в Украине: «Єврософтпром», «Скайлайн Софтвер», «Санлайн», «1с-Телур Модуль», «Альфа-Ком Софт»,  «1С-Рарус Софт Україна», «Перший біт». Запреты действительны три года."
	,sail_header:"«Парус»"
	,sail_content: "Крупный российский конкурент «1С» — корпорация «Парус» также попала под санкции. Она предоставляет различные системы для управление предприятием, его документооборотом, финансами, активами, логистикой, персоналом. Системы аналогичных направлений есть и для государственных органов.В санкционном списке значится 26 юрлиц, связанных с «Парус»: российское ООО «Корпорация «Парус», представительства в Украине «Парус- Спецпроект», «Парус-2»,  «Парус-Бюджет», «Парус-Україна», «Парус-Впровадження», «Парус-Місто»,  «Парус-Захід», «Парус-Прикарпаття», «Парус-Тернопіль», «Парус-Дніпро», «Парус-Донбас», «Парус-Запоріжжя», «Парус-Харків», «ЦИТ «Парус-Плюс», «Парус-1», «Парус-Десна», «Парус-Житомир», «Парус-Рівне», «Центр інформаційних технологій «Парус-Единение», «Донбас-Бюджет», «Парус-Кіровоград», «Южний Парус», «Парус-Таврія», «Харків-Бюджет», «Парус-Лев». Для всех них применяются аналогичные «1С» санкции сроком на три года."
	,g_header: "«Галактика», «Летограф», «Корус Консалтинг СНГ»"
	,g_content: "В списке оказались еще две российские продуктовые компании, которые работают в сфере систем для предприятий. Санкции введены для российского и украинского юрлиц корпорации «Галактика» — ЗАО «Галактика Центр» и ООО «Корпорація Галактика Київ». Эта компания занимается разработкой одноименной ERP-системы.Компания «Летограф» разрабатывает продукты в сфере управления документами и автоматизации бизнес-процессов. Ее российское юрлицо «Летограф ИТ Консалтинг И Услуги» и украинское представительство «Летограф Іт Консалтинг І Послуги Україна» также затронут санкции.«Корус Консалтинг СНГ» работает в сфере электронного документооборота и входит в группу компаний «Сбербанка». Среди клиентов российского подразделения многие крупные ритейлеры, включая «Ашан», METRO, BILLA."
	,it_header: "IT-консалтинг, интеграция и разработка"
	,it_content: "Из сферы IT-консалтинг, интеграции решений и разработки под санкциями оказались 14 компаний. В указе президента их юридические лица идут стройным рядом от номера 281 до 309. Санкции для них аналогичные «1С».Среди IT-интеграторов: «Ай-Теко Проекты» и дочерняя  «Ай- Теко Україна», «Софтлайн Груп» и «Софтлайн Груп «Україна», «НВО «ЕДД» и юридических лица «Энвижн Груп» (принадлежит АФК «Система», владельцу оператора МТС) — «Энвижн-Украина», «Энвижн-Холдинг» и «Энвижн-Активы».Из сферы IT-консалтинга санкции затронули следующие компании: ООО «Документ Менеджмент»,  «НТК Консалтинг», «Оптима-Україна»,  «Астерос Україна», «Ефективні рішення Суми», «Інталєв Україна», «Сапран Україна», «Сапран Груп», «Мастердата Україна», «Мастердата», «Монт УА», «Монт», «Аскон — КР», «Аскон»."
	,gic_header: "ГИС-системы"
	,gic_content: "В списке есть три украинских юрлица компаний, которые занимаются различными геоинформационными системами: «ГІСІНФО», «НВП Енертех» и «Политерм». Для них все те же запрещающих восемь пунктов. "
	}
});

class Blocked extends Component {


	getListBlocked(){
		return ""
	}
	
  render() {
     return (
      <div>
			<HeaderLogin />
				<div className="content_wrapper">
					<div className="content content_box">		
						<div>
							<h1 className="center">{strings.title}</h1>
						</div>
						<div>
							{ this.getListBlocked() }
							<p>{strings.content1}</p>
							<p>{strings.content2}</p>
							<p>{strings.content3}</p>
							<h3>{strings.header1}</h3>
							<p>{strings.mail_ru_content}</p>
							<p>{strings.vk_ok_content}</p>
							<p>{strings.y_content}</p>
							<p>{strings.y_list1}</p>
							<p>{strings.y_content2}</p>
							<p>{strings.y_list2}</p>
							<p>{strings.y_content3}</p>
							<h3>{strings.av_header}</h3>
							<p>{strings.av_content}</p>
							
							<h3>{strings.pr_header}</h3>
							<h3>{strings.abbyy_header}</h3>
							<p>{strings.abbyy_content}</p>
							
							<h3>{strings.c_header}</h3>
							<p>{strings.c_content}</p>
							
							<h3>{strings.sail_header}</h3>
							<p>{strings.sail_content}</p>
							
							<h3>{strings.g_header}</h3>
							<p>{strings.g_content}</p>
							
							<h3>{strings.it_header}</h3>
							<p>{strings.it_content}</p>
							
							<h3>{strings.gic_header}</h3>
							<p>{strings.gic_content}</p>
							
							
						</div>
					</div>
				</div>
			<Footer />
      </div>
    );
  }
}


export default Blocked;
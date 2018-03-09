import React, { Component } from 'react';

var request = require('superagent');

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   about_description: "AV(Alternative vk) is a messenger for Russian-based online social network vk. AV allows users to message each other, create group conversations, exchange files. Moreover everything will be syncronized with Vk. AV will be the best solution for the users who want to message without difficulties. It also may be used for bypassing vk.com blocking. AV uses vk api. We recommend that you use AV in case you can not access the social network directly, in case it is locked or you just hunger for alternatives and you do not need any unnecessary functionality except messages."
	,text1: "",
	title: "What is AV?"
	,goal: "Purpose of AV"
	,goal_desc: "- Demonstrate the highest class of web messenger development and ensure the maximum ease of use. AV uses modern tools for developing web sites, namely HTML5, CSS3, React.js, webpack, etc. Using modern tools has allowed us to create a cross-platform site that automatically adapts to the screen of your device without requiring any updates. Forget what a horizontal scroll bar is. AV is designed to accommodate all the potentially required content on the device's working area. The AV navigation bar only takes 40 pixels on your screen and is always with you. Quickly and without any difficulties, you can use the functionality of the application."
	,goal_desc1: "- to provide easy access without the slightest difficulty to vk.com. AV uses a server located in the US which is provided by a British company. Resources are responsive and highly productive. We are constantly improving and expanding and do not even think about stopping it."
	,goal_desc2: "- act as a secure intermediary between users and Vk. AV does not store absolutely any information. We receive all your correspondence, photos, videos directly through vk api and immediately show you. AV does not save your passwords or access tokens, they remain on your device. In any case, VKontakte will always be able to protect your account so there is not a single reason to worry."
	,history_title: "History"
	,history_desc: "AV app is a startup, the thoughts of which arose on May 30, 2017 and the implementation of which began on August 4, 2017. AV creators were extremely uncomfortable using VKontakte because of problems with finding a quality free vpn, constant setup problems, slow response of servers and difficulties with authorization. It was decided to start developing its own service that will eliminate these problems. The development of AV was originally implemented using native js. After a thousand lines of code, the developers realized all the rashness of their decision and the frivolity of the project on pure javascript and the development of the site started from scratch anew in October."
	,history_desc1: "The AV command considered a number of ways to implement the service. There were many possible offers, such as: downloading the site vk.com directly and displaying it in its original form, using the client api vk.com, using api for standalone applications from Vk. We decided on the last option, namely using python api for vkontakte. As test hosting for us spoke www.pythonanywhere.com which provided us with several months of services and resources for hosting the site for which we are very grateful. The development process lasted day and night, without the slightest break and rest. It was a kind of job for developers: to spend 6-8 clean hours at the computer (almost all day). On our way, we encountered a huge number of difficulties, for example, inaccuracies in VKontakte documentation or implicit problems with indexing the domains of the tk and ml zones. We have seen many problems and meet them so far ... "
	,history_desc2: "31.12.2017-01.01.2018 the author of the project made a single wish: 'Successful AV'. During the solar eclipse on February 15, 2018, the team was inspired to purchase more resources from the hosting provider and subscribe for a month. Soon we were located on the free domain .tk - which was quickly stitched without a free extension option (the domain was renewed for 7 euros). Somewhat later, we moved to the domain in the ml zone. Later AV employees strongly insisted on buying a normal domain in the .com zone and in March we moved to a new address. Now we actively contribute to the perfection and promotion of the site and do not even think about stopping. We do not have the strength to go back ..."
	,history_desc3: "Perhaps we have a great future, not connected with the AV project, but it has already become a part of our history. Our desire is that ALTVK.COM is our introductory step into the big IT world and we continued to confidently move forward. AV is not the goal and the end point of our career, it is only a start and a strong impetus in changing the world for the better by our hands .."
  
 },
 ua: {
   about_description: "AV(Альтернативний вконтакті) - це месенджер для російської соціальної мережі ВКонтакті. AV дозволяє користувачам надсилати повідомлення один одному, створювати групові розмови, обмінюватися файлами. Більше того, усі ваші повідомлення та файли будуть синхронізовані в vk. AV буде найкращим рішенням для користувачів, які хочуть надсилати повідомлення без проблем. Він також може бути використаний для обходу блокування vk.com. AV використовує vk api. Ми рекомендуємо вам використовувати AV в разі коли ви не можете отримати доступ до соціальної мережі вконтакте безпосередньо, в разі якщо вона заблокована або ви просто жадайте альтернативи і вам не потрібен всякий зайвий функціонал за винятком повідомлень."
	,text1: ""
	,title: "Що є ми"
	,goal: "Ціль AV"
	,goal_desc: "- продемонструвати вищий клас веб розробки месенджерів і забезпечити максимальну простоту використання. AV використовує сучасні засоби розробки веб сайтів, а саме: HTML5, CSS3, React.js, webpack і ін. Використання сучасних Інстурмент дозволило нам створити міжплатформений сайт який автоматично адаптується під екран вашого девайса не вимагаючи жодних оновлень. Забудьте що таке горизонтальна смуга прокрутки. AV розрахований на те щоб розмістити весь потенційно необхідний контент на робочій області пристрою. Панель навігації AV займає всього лише 40 пікселів на вашому екрані і завжди з вами. Швидко і без всяких труднощів вам доступний функціонал додатка."
	,goal_desc1: "- забезпечити легкий доступ без найменших труднощів до vk.com. AV використовує сервера розташовані в США які надає британська компанія. Ресурси чуйні і високопродуктивні. Ми постійно вдосконалюємось і розширюємося і навіть не думаємо припиняти це робити."
	,goal_desc2: "- виступати безпечним посередником між користувачами і Vk. AV не зберігає абсолютно ніякої інформації. Ми отримуємо всі ваші листування, фотографії, відеозаписи безпосередньо через vk api і тут же відображаємо вам. AV не зберігаються ваші паролі або токени доступу, вони залишаються на вашому пристрої. У будь-якому випадку вконтакте зможе завжди захистити ваш аккаунт так що немає жодної причини турбуватися."
	,history_title: "Історія"
	,history_desc: "AV app - стартап, думки про який виникали 30 травня 2017 року та реалізація якого почалася 4 серпня 2017 року. Творці AV було крайнє незручно використовувати вконтакте через проблеми з пошуком якісного безкоштовного vpn, постійних проблем з налаштуванням, повільного відповіді серверів і труднощів з авторизацією. Було прийнято рішення почати розробку власного сервісу який усуне ці проблеми. Розробка AV спочатку була здійснена використовуючи native js. Після тисячної рядки коду розробники зрозуміли всю необдуманість свого рішення і несерйозність проекту на чистому javascript і розробка сайту почалася з нуля заново вже в жовтні. "
	,history_desc1: "Команда AV розглянула безліч шляхів реалізації сервісу. Було безліч можливих пропозицій, таких як: завантаження сайту vk.com безпосередньо і відображення його в початковому вигляді, використання клієнтського api vk.com, використання api для standalone прложенія від вк. Ми зупинилися на останньому варіанті, а саме використання python api для вконтакте. В якості тестового хостингу для нас виступав www.pythonanywhere.com який надав нам на кілька місяців сервіси і ресури для розміщення сайту за що ми дуже вдячні. Процес розробки тривав вдень і вночі, без найменшої перерви і відпочинку. Це була свого роду робота для розробників: проводити по 6-8 чистих годин за комп'ютером (майже що весь день). На нашому шляху ми зустрічали величезна кількість труднощів, наприклад, неточності документації вконтакте або неявні проблеми з індексуванням доменів зони tk і ml. Ми побачили безліч проблем і зустрічаємо їх до сих пір ... "
	,history_desc2: "31.12.2017-01.01.2018 автор проекту загадав єдине бажання: 'Успішного AV'. Під час сонячного затемнення 15 лютого 2018 роки команда була натхненна на придбання більшої кількості ресурсів від хостинг провайдера і оформила підписку на місяць. Незабаром ми розмістилися на безкоштовному домені .tk - який незабаром був прострочено без безкоштовної можливості продовження (продовжити домен коштувало 7 євро). Трохи пізніше, переїхали на домен в зоні ml.Позже співробітники AV рішуче наполягли на покупці нормального домену в зоні .com і вже в березні місяці ми переїхали на нову адресу. Зараз ми активно сприяємо сеовершенству і просуванню сайту і навіть не думаємо зупинятися. У нас немає сил йти назад ..."
	,history_desc3: "Можливо, у нас велике майбутнє, що не пов'язаного з проектом AV, але він вже встиг стати частиною нашої історії. Наше бажання є те щоб ALTVK.COM став нашим вступним кроком у великий світ IT і ми продовжили впевнено рухатися вперед. AV не є метою і кінцевою точкою нашої кар'єри, він є лише старт і сильним поштовхом у зміні світу на краще нашому руками .."
  
	},
 ru: {
   about_description: "AV (альтернативный вконтакте) - это клиент приложение для всем известной социальной сети Vk.com. AV служит для доступа к информации сервиса vk.com и обмена сообщениями в пределах этого сервиса. Alternative vkontakte может быть полезным в случае ограниченного доступа к домену vk.com, например, в Украине или предприятиях/офисах где VK заблокирован намеренно. AV использует официальное vk api. Нет необходимости переживать про сохранность паролей и безопасность. Мы не храним ваши пароли и вы всегда можете ограничить доступ нашего сервиса к вашему аккаунту через сайт vk.com. Мы рекомендуем вам использовать AV в случае когда вы не можете получить доступ к социальной сети вконтакте напрямую, в случае если она заблокирована или вы просто жаждите альтернативы и вам не нужен всякий излишний функционал за исключением сообщений."
    ,
	goal: "Цель AV",
	goal_desc: "- продемонстрировать высший класс веб разработки мессенджеров и обеспечить максимальную простоту использования. AV использует современные средства разработки веб сайтов, а именно: HTML5, CSS3, React.js, webpack и др. Использование современных инстурментов позволило нам создать межплатформенный сайт который автоматически адаптируется под экран вашего девайса не требуя всяких обновлений. Забудьте что такое горизонтальная полоса прокрутки. AV расчитан на то чтобы разместить весь потенциально необходимый контент на рабочей области устройства. Панель навигации AV занимает всего лишь 40 пикселей на вашем экране и всегда с вами. Быстро и без всяких трудностей вам доступен функционал приложения."
	,goal_desc1: "- обеспечить легкий доступ без малейших трудностей к vk.com. AV использует сервера расположенные в США которые предоставляет британская компания. Ресурсы отзывчивы и высокопродуктивны. Мы постоянно совершенствуемся и расширяемся и даже не думаем прекращать это делать."
	,goal_desc2: "- выступать безопасным посредником между пользователями и Vk. AV не хранит абсолютно никакой информации. Мы получаем все ваши переписки, фотографии, видеозаписи напрямую через vk api и тут же отображаем вам. AV не сохраняет ваши пароли или токены доступа, они остаются на вашем устройстве. В любом случае вконтакте сможет всегда защитить ваш аккаунт так что нет ни единой причины беспокоиться."
	,text1: ""
	,title: "Что есть мы?"
	,history_title: "История"
	,history_desc: "AV app - стартап, мысли о котором возникали 30 мая 2017 года и реализация которого началась 4 августа 2017 года. СОздателям AV было крайнее неудобно использовать вконтакте из за проблем с поиском качественного бесплатного vpn, постоянных проблем с настройкой, медленного ответа серверов и трудностей с авторизацией. Было принято решение начать разработку собственного сервиса который устранит эти проблемы. Разработка AV первоначально была осуществленна используя native js. После тысячной строки кода разработчики поняли всю необдуманность своего решения и несерьезность проекта на чистом javascript и разработка сайта началась с нуля заново уже в октябре."
	,history_desc1: "Команда AV рассмотрела множество путей реализации сервиса. Было множество возможных предложений, таких как: загрузка сайта vk.com напрямую и отображение его в исходном виде, использование клиентского api vk.com, использование api для standalone прложения от вк. Мы остановились на последнем варианте, а именно использование python api для вконтакте. В качестве тестового хостинга для нас выступал www.pythonanywhere.com который предоставил нам на несколько месяцев сервисы и ресуры для размещения сайта за что мы очень благодарны. Процесс разработки длился днем и ночью, без малейшего перерыва и отдыха. Это была своего рода работа для разработчиков: проводить по 6-8 чистых часов за компьютером(почти что весь день). На нашем пути мы встречали огромное количество трудностей, например, неточности документации вконтакте или неявные проблемы с индексированием доменов зоны tk и ml. Мы повидали множество проблем и встречаем их до сих пор..."
	,history_desc2: "31.12.2017-01.01.2018 автор проекта загадал единственное желание: 'Успешного AV'. Во время солнечного затмения 15 февраля 2018 года команда была вдохновлена на приобретение большего количества ресурсов от хостинг провайдера и оформила подписку на месяц. Вскорее мы разместились на бесплатном домене .tk - который вскорее был прострочен без бесплатной возможности продления(продлить домен стоило 7 евро). Несколько позже, переехали на домен в зоне ml.Позже сотрудники AV решительно настояли на покупке нормального домена в зоне .com и уже в марте месяце мы переехали на новый адрес. Сейчас мы активно способствуем сеовершенству и продвижению сайта и даже не думаем останавливаться. У нас нет сил идти назад..."
	,history_desc3: "Возможно, у нас большое будущее, никак не связаного с проектом AV, но он уже успел стать частью нашей истории. Наше желание есть то чтобы ALTVK.COM стал нашим вступительным шагом в большой мир IT и мы продолжили уверенно двигаться вперед. AV не является целью и конечной точкой нашей карьеры, он есть лишь старт и сильным толчком в изменении мира к лучшему нашеми руками.."
  },
});



class AboutContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className="content_wrapper">
			<div className="content content_box">
				<h1>{strings.title}</h1>
				{strings.about_description}
				<br />
				{strings.about2}
			</div>
			<div style={{"height": "40px"}}></div>
			<div className="content content_box">
				<h1>{strings.goal}</h1>
				{strings.goal_desc1}
				<br />
				{strings.goal_desc}
				<br />
				{strings.goal_desc2}
			</div>
			<div style={{"height": "40px"}}></div>
			<div className="content content_box">
				<h1>{strings.history_title}</h1>
				{strings.history_desc}
				<br />
				{strings.history_desc1}
				<br />
				{strings.history_desc2}
				<br />
				{strings.history_desc3}
			</div>
			<div style={{"height": "40px"}}></div>
		</div>
    );
  }
}

export default AboutContent;
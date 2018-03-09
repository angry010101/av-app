import React, { Component } from 'react';

import 'css/components/login/login_content.css'



import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   about_description: "is an online messenger for Russian-based online social network vk. AV allows users to message each other, create group conversations, exchange files. Moreover, everything will be synchronized with Vk. AV will be the best solution for the users who want to message without difficulties. It also may be used for bypassing vk.com blocking. We are making it easier for users to use vk services without censorship. AV uses vk api."
	,about_logo: "AV(Alternative vk) "
	,proses: "Why AV?",
	no_censore_desc: "AV is a right choice for bypassing vk blocking. It's the best solution for messaging in Ukraine where vk.com is blocked by government. We are trying to make it easier for you to get unique vk content and to use vk messaging. AV doesn't save your passwords. You keep all keys on your device"
	,censored: "Everyone knows about {0}, which prohibits Ukrainian Internet providers to provide access to popular resources such as: vk, yandex, ok. AV considers such actions to be inadmissible because of the appearance of an obvious restriction of freedom of speech of citizens, access to information and Internet freedoms of Ukrainian citizens. We have done our best to let users stay in touch with their colleagues and in the future we will make possible the full use of the social network vk.com."
	,link_to_doc: "THE DECREE OF THE PRESIDENT OF UKRAINE №133/2017"
	,isopen: "Availability"
	,crossplatform: "Cross platform"
	,crossplatform_desc: "AV uses modern tools such as HTML5, CSS3, react, node.js to make it convenient to use the service on all devices. The site automatically adapts to your screen and tries to be as convenient as it could be possible for you. There won't be a horizontal scroll. All the elements of control and necessary function are availiable without any difficulties"
	,important_desc: "AV does not impose unnecessary content on users. We are not going to offer you friends, participation in communities, gifts and current news. You only get what you came for: conversations and messages with long-known friends. We are supporters of minimalism. We understand how a different kind of garbage on a web page can detract from the essence of the matter."
	,important_header: "Only interesting information"
	,optimized: "High Performance"
	,optimized_desc: "AV uses a completely different approach for message processing, online correspondence and image processing. Using the Short Polling technique allows you to download messages more quickly at the maximum update rate and spend resources more sparingly if there is a long absence of events."
	,improve_av: "We hear you"
	,improve_av_desc: "AV team is always glad to translate your ideas into reality. We try to make our service as good as possible for you. You can suggest your ideas to myhosting2012@gmail.com and we will happily do our best to realize some additional functionality on our website. Do not limit yourself! We can create a service for the author link, postponed messages, do not disturb mode, temporary access to your account and much more. Let the administration know what you need. Fix the email address on myhosting2012@gmail.com"
	,support_ua_desc: "Alternative vkontakte exclusively product made by Ukrainian programmers. The use of the Russian social network as a basis is only a necessity for providing quality service: it is very difficult for us to create from scratch an extensive social network on our equipment in connection with limited financing and a limit on resources. As the number of users on the site increases, the av command will necessarily create a supported infrastructure that will not only be independent of Vk, but will still remain as well synchronized with it. Altvk also wants to make it possible to back up the data so that in case of problems or problems with the service, you continue without any concerns to be in touch with colleagues and do not worry about anything."
	,support_ua: "Support the Ukrainian"
	,open_source: "Open to everyone"
	,open_source_desc: "Altvk tries to make its products as open as possible to the user. We do not think to hide anything from you. Everyone can study the source code of the application and see that altvk does not hide anything from its users. We will be glad to receive the call from the initiative developers and we will definitely invite them to participate in this project. Your support is the foundation of our product."
},
 ua: {
   about_description: " - онлайн мессенджер для російської соціальної мережі vk.com . AV дозволяє користувачам надсилати повідомлення один одному, створювати групові розмови, обмінюватися файлами напряму до серверів вконтакті з вашого браузера. AV буде найкращим рішенням для користувачів, які хочуть надсилати повідомлення онлайн та мати їх синхронизованими з сервісами вк. Він також може бути використаний для обходу блокування vk.com. AV використовує vk api."
	,about_logo: "AV (Альтернативный вконтакті)"
	,proses: "Чому AV?",
	no_censore_desc: " AV - правильний вибір для обходу блокування vk. Це найкраще рішення для обміну повідомленнями в Україні, де vk.com заблоковано владою. Ми намагаємось полегшити вам отримання унікального вмісту vk і використовувати vk-повідомлення. AV не зберігає ваші паролі. Ви зберігаєте всі ключі на своєму пристрої"
	,censored: "Усім відомо про {0} ,який забороняє українським інтернет провайдерам забезпечувати доступ до популярних ресурсів, таких як: vk, yandex, ok. AV вважає недопустимим дії такого роду через явну очевидність обмеження свободи слова, доступу до інформації та інтернет свободи громадян України. Ми зробили усе, щоб дозволити користувачам залишатись на зв'язу зі своїми колегами та у майбутньому зробимо можливим повноцінне використання соціальної мережі vk.com."
	,link_to_doc: "УКАЗ ПРЕЗИДЕНТА УКРАЇНИ №133/2017"
	,isopen: "Доступність"
	,crossplatform: "Один сайт - усі пристрої"
	,crossplatform_desc: "AV використовує сучасні засоби такі як HTML5, CSS3, react, node.js для того щоб зробити зручним використання сервісу на всіх пристроях. Сайт автоматично адаптується під ваш екран і намагається бути якомога зручніше для вас. Усі елементи контролю та необхідні функції доступні без будь-яких труднощів"
	,important_desc: "AV не нав'язує зайвий контент користувачам. Ми не збираємося пропонувати вам друзів, участь в спільнотах, подарунки та актуальні новини. Ви отримуєте лише те чого вони сюди прийшли: за бесідами та повідомленнями з давно знайомими приятелями. Ми прихильники мінімалізму. Ми розуміємо як рзлічних виду сміття на веб сторінці може відволікати від суті справи."
	,important_header: "Лише потрібна інформація"
	,optimized: "Висока ефективність"
	,optimized_desc: "AV використовує зовсім інший підхід для обробки повідомлень, онлайн листування і обробки зображень. Використання техніки Short Polling дозволяє більш швидко завантажувати повідомлення при максимальній частоті оновлення та більш економно витрачати ресурси за умови тривалої відсутності подій."
	,improve_av: "Ми чуємо вас"
	,improve_av_desc: "Команда AV завжди рада втілити ваші ідеї в життя. Ми намагаємося зробити наш сервіс якнайкраще для вас. Ви можете запропонувати свої ідеї на myhosting2012@gmail.com і ми з радістю зробимо все можливе щоб реалізувати якийсь додатковий функціонал на нашому сайті. Не обмежуйте себе! Ми можемо створити сервіс для авторассилкі, відкладених повідомлень, режиму не турбувати, тимчасовий доступ до вашого аккаунту та багато іншого. Дозвольте адміністрації знати що вам потрібно. Оптправьте емейл на myhosting2012@gmail.com"
	,support_ua_desc: "Альтернативний вконтакте виключно продукт зроблений українськими програмістами. Використання за основу російської соціальної мережі є лише необхідність для забезпечення якісного сервісу: нам дуже важко створити з нуля велику соціальну мережу на своєму обладнанні в зв'язку з обмеженим фінансуванням і лімітом на ресурси. У міру збільшення кількості користувачів на сайті команда av обов'язково створить підтримувану інфраструктуру яка буде не тільки незалежна від Vk, але і як і раніше залишиться так само добре синхронізуються з ним. Altvk так само хоче втілити в реальність можна створювати резервні копії даних щоб в разі виникнення несправності або проблем з сервісом вк ви продовжували без всяких турбот бути на зв'язку з колегами і ні про що не переживати."
	,support_ua: "Підтримай українське"
	,open_source: "Відкриті кожному"
	,open_source_desc: "Altvk намагається зробити свої продукти як можна більш відкритими для користувача. Ми не думаємо приховувати що або від вас. Кожен може вивчити вихідний код програми подивитися і переконатися що altvk нічого не приховує від своїх користувачів. Будемо раді отримати пулл запити від ініціативних розробників і обов'язково запросимо їх прийняти участь в даному проекті. Ваша підтримка - основа існування нашого продукту."
},
 ru: {
   about_description: " - это онлайн мессенджер для российской социальной сети ВКонтакте. AV позволяет пользователям отправлять сообщения друг другу, создавать групповые беседы, обмениваться файлами. Более того, все ваши сообщения и файлы будут синхронизированы в vk. AV будет лучшим решением для пользователей, которые хотят отправлять сообщения без проблем. Он также может быть использован для обхода блокировки vk.com. AV использует vk api."
	,about_logo: "AV (Альтернативный вконтакте)"
	,proses: "Почему AV?",
	no_censore_desc: " AV является правильным выбором для обхода блокировки vk. Это лучшее решение для обмена сообщениями в Украине, где vk.com заблокирован правительством. Мы пытаемся облегчить получение уникального содержимого vk и использование vk-сообщений. AV не сохраняет ваши пароли. Вы сохраняете все ключи на своем устройстве"
	,censored: "Всем известно о {0}, который запрещает украинским интернет провайдерам обеспечивать доступ к популярным ресурсам, таким как: vk, yandex, ok. AV считает недопустимым действия такого рода через явную очевидность ограничения свободы слова, доступа к информации и интернет свободы гражданей Украины. Мы сделали все, чтобы позволить пользователям оставаться на связи со своими коллегами и в будущем сделаем возможным полноценное использование социальной сети vk.com.",
	link_to_doc: "УКАЗЕ ПРЕЗИДЕНТА УКРАИНЫ №133/2017"
	,isopen: "Доступность"
	,crossplatform: "Один сайт - все устройства"
	,crossplatform_desc: "AV использует современные средства такие как HTML5, CSS3, react, node.js для того чтобы сделать удобным использование сервиса на всех устройствах. Сайт автоматически адаптируется под ваш экран и старается быть как можно удобнее для вас. Все элементы управления и необходимая функция доступны без каких-либо трудностей."
	,important_desc: "AV не навязывает излишний контент пользователям. Мы не собираемся предлагать вам друзей, участие в сообществах, подарки и актуальные новости. Вы получаете лишь то зачем пришли: за беседами и сообщениями с давно знакомыми приятелями. Мы сторонники минимализма. Мы понимаем как рзличного вида мусор на веб странице может отвлекать от сути дела. "
	,important_header: "Только нужная информация"
	,optimized: "Высокая производительность"
	,optimized_desc: "AV использует совершенно другой подход для обработки сообщений, онлайн переписки и обработки изображений. Использование техники Short Polling позволяет более быстро загружать сообщения при максимальной частоте обновления и более экономно тратить ресурсы при условии долгого отсутствия событий."
	,improve_av: "Мы слышим вас"
	,improve_av_desc: "Команда AV всегда рада воплотить ваши идеи в жизнь. Мы стараемся сделать наш сервис как можно лучше для вас. Вы можете предложить свои идеи на myhosting2012@gmail.com и мы с радостью сделаем всё возможное чтобы реализовать некий дополнительный функционал на нашем сайте. Не ограничивайте себя! Мы можем создать сервис для авторассылки, отложенных сообщений, режима не беспокоить, временный доступ к вашему аккаунту и многое другое. Позвольте администрации знать что вам нужно. Оптправьте эмейл на myhosting2012@gmail.com "
	,support_ua_desc: "Альтернативный вконтакте исключительно продукт сделанный украинскими программистами. Использование за основу российской социальной сети есть лишь необходимость для обеспечения качественного сервиса: нам очень тяжело создать с нуля обширную социальную сеть на своём оборудовании в связи с ограниченным финансированием и лимитом на ресурсы. По мере увеличения количества пользователей на сайте команда av обязательно создаст поддерживаемую инфраструктуру которая будет не только независима от Vk, но и по прежнему останется так же хорошо синхронизируема с ним. Altvk так же хочет воплотить в реальность возможность резервного копирования данных чтобы в случае неполадков или проблем с сервисом вк вы продолжали без всяких беспокойств быть на связи с коллегами и ни о чем не переживать."
	,support_ua: "Поддержи украинское"
	,open_source: "Открыты каждому"
	,open_source_desc: "Altvk старается сделать свои продукты как можно более открытыми для пользователя. Мы не думаем скрывать что либо от вас. Каждый может изучить исходный код приложения посмотреть и убедиться что altvk ничего не скрывает от своих пользователей. Будем рады получить пулл запросы от инициативных разработчиков и обязательно пригласим их поучаствовать в данном проекте. Ваша поддержка - основа существования нашего продукта."
}
});




class LoginContent extends Component {

constructor(props){
	 super()
	 
}

	
_onSetLanguage(s) {
  strings.setLanguage(s);
  this.setState({});
}

  render() {
     return (
	 <div>
      <div>
		<div >
			
			<div className="wrapper">
				<span className="description_text"><b>{strings.about_logo}</b>{strings.about_description}</span>
				<span className="description_text">{strings.no_censore_desc}</span>
			</div>
			
			<h1 className="proses_text">{strings.proses}</h1>
			<div className="wrapper_censored">
				<div className="center">
					<h2 className="proses_text white">{strings.isopen}</h2>
					<img src="/static/images/censored.png" />					
				</div>
				<div className="description_censored">
					<span className="censored_text">
					{strings.formatString(strings.censored, <a href="http://zakon3.rada.gov.ua/laws/show/ru/133/2017">{strings.link_to_doc}</a>)}
					</span>
				</div>
			</div>
			
			<div className="wrapper">
				<div className="center">
					<h2 className="proses_text">{strings.crossplatform}</h2>
					<img src="/static/images/crossplatform.png" />					
				</div>
				<div className="description_text">
					{strings.crossplatform_desc}
				</div>
			</div>

			<div className="wrapper_important">
				<div className="center">
					<h2 className="proses_text white">{strings.important_header}</h2>
					<img width="300" height="300" src="/static/images/important.svg" />					
				</div>
				<div className="description_text white">
					{strings.important_desc}
				</div>
			</div>
			
			<div className="wrapper">
				<div className="center">
					<h2 className="proses_text">{strings.improve_av}</h2>
					<img  height={300} src="/static/images/idea.png" />					
				</div>
				<div className="description_text">
					{strings.improve_av_desc}
				</div>
			</div>
			
			<div className="wrapper">
				<div className="center">
					<h2 className="proses_text">{strings.support_ua}</h2>
					<img  height={300} src="/static/images/ukraine.png" />					
				</div>
				<div className="description_text">
					{strings.support_ua_desc}
				</div>
			</div>
			
			<div className="wrapper_open">
				<div className="center">
					<h2 className="proses_text">{strings.open_source}</h2>
					<img  height={300} src="/static/images/open-source.png" />					
				</div>
				<div className="description_text">
					{strings.open_source_desc}
				</div>
			</div>
		</div>
	  </div>
	 </div>
    );
  }
}


export default LoginContent;
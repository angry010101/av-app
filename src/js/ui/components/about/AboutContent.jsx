import React, { Component } from 'react';

var request = require('superagent');

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   about_description: "AV(Alternative vk) is a messenger for Russian-based online social network vk. AV allows users to message each other, create group conversations, exchange files. Moreover everything will be syncronized with Vk. AV will be the best solution for the users who want to message without difficulties. It also may be used for bypassing vk.com blocking. AV uses vk api."
 },
 ua: {
   about_description: "AV(Альтернативний вконтакті) - це месенджер для російської соціальної мережі ВКонтакті. AV дозволяє користувачам надсилати повідомлення один одному, створювати групові розмови, обмінюватися файлами. Більше того, усі ваші повідомлення та файли будуть синхронізовані в vk. AV буде найкращим рішенням для користувачів, які хочуть надсилати повідомлення без проблем. Він також може бути використаний для обходу блокування vk.com. AV використовує vk api."
 },
 ru: {
   about_description: "AV (Альтернативный вконтакте) - это мессенджер для российской социальной сети ВКонтакте. AV позволяет пользователям отправлять сообщения друг другу, создавать групповые беседы, обмениваться файлами. Более того, все ваши сообщения и файлы будут синхронизированы в vk. AV будет лучшим решением для пользователей, которые хотят отправлять сообщения без проблем. Он также может быть использован для обхода блокировки vk.com. AV использует vk api."
  }
});



class AboutContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div className="about_content_wrapper">
			{strings.about_description}
     	</div>
    );
  }
}

export default AboutContent;
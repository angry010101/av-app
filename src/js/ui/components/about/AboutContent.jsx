import React, { Component } from 'react';

var request = require('superagent');

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   about_description: "AV(Alternative vk) is a messenger for Russian-based online social network vk. AV allows users to message each other, create group conversations, exchange files. Moreover everything will be syncronized with Vk. AV will be the best solution for the users who want to message without difficulties. It also may be used for bypassing vk.com blocking. AV uses vk api."
 },
 ua: {
   about_description: "AV(�������������� ��������) - �� ��������� ��� �������� ��������� ����� ��������. AV �������� ������������ ��������� ����������� ���� ������, ���������� ������ �������, ����������� �������. ������ ����, �� ���� ����������� �� ����� ������ ������������ � vk. AV ���� ��������� ������� ��� ������������, �� ������ ��������� ����������� ��� �������. ³� ����� ���� ���� ������������ ��� ������ ���������� vk.com. AV ����������� vk api."
 },
 ru: {
   about_description: "AV (�������������� ���������) - ��� ���������� ��� ���������� ���������� ���� ���������. AV ��������� ������������� ���������� ��������� ���� �����, ��������� ��������� ������, ������������ �������. ����� ����, ��� ���� ��������� � ����� ����� ���������������� � vk. AV ����� ������ �������� ��� �������������, ������� ����� ���������� ��������� ��� �������. �� ����� ����� ���� ����������� ��� ������ ���������� vk.com. AV ���������� vk api."
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
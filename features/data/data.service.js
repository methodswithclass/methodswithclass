dataModule.factory("data.service", ['global', function (g) {

	var blocks = [
	{
		id:'nuplae',
		title:'nuplae',
		icon:'/img/box_icon.png',
		back:'/img2/gravity.jpg',
		description:"nuplae uses gravity as the controller for a set of games. pop bubbles as they wiz around, or test your ability to balance an object in a specific spot.",
		bottom:-0.2,
		sep:600
	},
	{
		id:'hire',
		title:'call log',
		icon:'/img/calllog.png',
		back:'/img2/garfield.jpg',
		description:"i'm a programmer for hire",
		bottom:-0.1,
		sep:600
	},
	{
		id:'poetry',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img2/code-poetry.png',
		description:"what I do is more than just content delivery",
		bottom:-0.1,
		sep:600
	},
	{
		id:'intense',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img2/intense_coding.jpg',
		description:"cuz I actually enjoy what I do, and I do it a lot",
		bottom:-0.1,
		sep:600
	},
	{
		id:'procrastinate',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img2/procrastinate.png',
		description:"so this never happens",
		bottom:-0.1,
		sep:600
	},
	{
		id:'sad',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img2/sad.jpg',
		description:"but this always does",
		bottom:-0.1,
		sep:600
	},
	{
		id:'life',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img2/success-custom.jpg',
		description:"even though sometimes life feels like this",
		bottom:-0.1,
		sep:600
	},
	{
		id:'vader',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img2/vader_choke.jpg',
		description:"which makes me want to do this",
		bottom:-0.1,
		sep:600
	},
	{
		id:'html',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img2/html.png',
		description:"so instead I do this",
		bottom:-0.1,
		sep:600
	},
	{
		id:'end',
		title:'gather up',
		icon:'/img/contacts.png',
		back:'/img2/trust.jpg',
		description:"the end",
		bottom:-0.1,
		sep:600
	}
	];

	var bio = [
	{
		desktopClass:"padding-bottom-20 border-bottom",
		mobileClass:"padding-bottom-50 border-bottom",
		text:"I am an experienced developer whose focus in the last few years has been for the web. However, everything I do is still app-centric. OOP is my manifesto."
	},
	{
		desktopClass:"padding-v-20 border-bottom",
		mobileClass:"padding-v-50 border-bottom",
		text:"I push boundaries of what is industry-standard, convnetional, and safe. My only concern is bringing the client's interests to life or recommending how to bring their low level interests around to meet the real interests of their business, organzation, or web-presence."
	},
	{
		desktopClass:"padding-v-20",
		mobileClass:"padding-v-50",
		text:"Let me do this for you. I develop web apps that are easily scalable when your business is ready to grow down the line, and always maintainable when your business starts up shop again tomorrow."
	}
	]

	return {
		blocks:blocks,
		bio:bio	
	}

}]);
dataModule.factory("data.service", ['global', function (g) {

	var blocks = [
	{
		id:'nuplae',
		back:'/img/gravity.jpg',
		description:"nuplae uses gravity as the controller for a set of games. pop bubbles as they wiz around, or test your ability to balance an object in a specific spot."
	},
	{
		id:'hire',
		back:'/img/garfield.jpg',
		description:"i'm a programmer for hire"
	},
	{
		id:'poetry',
		back:'/img/code-poetry.png',
		description:"what I do is more than just content delivery"
	},
	{
		id:'intense',
		back:'/img/intense_coding.jpg',
		description:"cuz I actually enjoy what I do, and I do it a lot"
	},
	{
		id:'procrastinate',
		back:'/img/procrastinate.png',
		description:"so this never happens"
	},
	{
		id:'sad',
		back:'/img/sad.jpg',
		description:"but this always does"
	},
	{
		id:'life',
		back:'/img/success-custom.jpg',
		description:"even though sometimes life feels like this"
	},
	{
		id:'vader',
		back:'/img/vader_choke.jpg',
		description:"which makes me want to do this"
	},
	{
		id:'html',
		back:'/img/html.png',
		description:"so instead I do this"
	},
	{
		id:'end',
		back:'/img/trust.jpg',
		description:"the end"
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
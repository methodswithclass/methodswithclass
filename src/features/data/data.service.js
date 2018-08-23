dataModule.factory("data.service", ['global', function (g) {

	var blocks = [
	{
		id:'gravity',
		back:'/assets/img/gravity.jpg',
		description:"gravity is a powerful thing. use it to pop bubbles as they wiz around your screen, or to balance an object in the right place. gravity has never been this fun."
	},
	{
		id:'evolve',
		back:'/assets/img/evolvehuman_black.jpg',
		description:"have you ever wanted to get a computer to work better. or have you ever wanted to command a population of machines to clean up after you? well with evolve, you can do both."
	},
	{
		id:'code',
		back:'/assets/img/matrix2.jpg',
		description:"I offer code to the masses, feast and be merry"
	},
	{
		id:'hire',
		back:'/assets/img/garfield.jpg',
		description:"i'm a programmer for hire"
	},
	{
		id:'poetry',
		back:'/assets/img/code-poetry.jpg',
		description:"what I do is more than just content delivery"
	},
	{
		id:'intense',
		back:'/assets/img/intense_coding.jpg',
		description:"cuz I actually enjoy what I do, and I do it a lot"
	},
	{
		id:'procrastinate',
		back:'/assets/img/procrastinate.jpg',
		description:"so this never happens"
	},
	{
		id:'sad',
		back:'/assets/img/sad.jpg',
		description:"but this always does"
	},
	{
		id:'life',
		back:'/assets/img/success-custom.jpg',
		description:"even though sometimes life feels like this"
	},
	{
		id:'vader',
		back:'/assets/img/vader_choke.jpg',
		description:"which sometimes makes you want to do this"
	},
	{
		id:'html',
		back:'/assets/img/javascript.jpg',
		description:"so instead I do this"
	},
	{
		id:'end',
		back:'/assets/img/trust.jpg',
		description:"the end"
	}
	];

	var contact = {
		bio:[
			"I am a software developer mainly focused on JavaScript development using all versions of Angular on the front end. I also develop in Node and Express on the backend. I develop in Linux, automated bash scripting, and on the AWS cloud. I also have experience in Agile workflows.",
			"I maintain several sites, projects, and games that each have a consistent code base API pulled from a separate maintained, documented, and public URL, listed on this site.",
			"This process, preferrable to simply posting to GitHub, makes my code actionable by anyone in real time, keeps all my projects consistent, allows me to present my source code to anyone interested, and distribute my work to those who might want to use it for thier own projects.",
			"I am looking for work as a JavaScript engineer, software architect, or developer where I would provide solutions and recommendations to address my employer's needs and the needs of thier customers and clients."
		],
		skills:{
			title:"Skills",
			items:[
				"Software Development, Software Architecture, Software Abstraction",
				"Software Automation, Software Engineering, Object Oriented Programming",
				"Mobile Apps, Mobile Web, Responsive Design",
				"User Experience, User Interface (UX/UI), interface design",
				"Class Structures, Object Structures, Inheritance",
				"Requirements Definition, Requirements Gathering, Requirements Managements",
				"JavaScript, HTML, CSS, PHP, Objective C, Java, VBA, ActionScript, JSON, REST, MVC",
				"iOS, Android, Unix",
				"AngularJS, NodeJS, ExpressJS, Bootstrap, Git",
				"Heroku, Netlify, Firebase",
				"Write clean, Maintainable, Scalable, High-quality, High-performing code",
				"site hosting, domain registration, DNS configuration",
				"significant written communication and writing skills",
				"other communication, interpersonal, leadership, mentorship",
				"math, physics, engineering, motion dynamics, other technical skills"
			]
		},
		projects:{
			title:"Projects",
			items:[
			{
				title:"Code",
				href:"code.methodswithclass.com",
				description:"Fully responsive, view on both desktop and mobile",
				items:[
					"Global CSS that can be applied to any project",
					"Angular directive for parallax scrolling, accounts for any screen and image size",
					"Angular service for firing events in one part of app from another part of app",
					"Angular service for sending data from one part of app to another part of app",
					"Angular directive for development console that prints JavaScript console entries to the screen for mobile debugging",
					"Version system for all of the above so that I can update code but not break existing sites"
				]
			},
			{
				title:"Evolve",
				href:"evolve.methodswithclass.com",
				description:"Non-responsive, only viewable on desktop",
				items:[
					"Artificial Intelligence, evolutionary programming, genetic algorithm (GA)",
					"Developed generic GA software that uses generations of sets of solutions to induce machine learning for any given problem",
					"Developed GA with enough abstraction to allow a multitude of learning problems to be addressed",
					"Designed and Developed Angular web app demonstrate the machine learning capabilities of the GA",
					"Designed architecture of the web app to deliver the bottom level GA software where necessary and handle the multiple learning problem implementations",
					"State based navigation, single page web app, OOP design",
					"Modular design, reusable code, heavy attention to organization and architecture",
					"For “cleaning robot” program, machine learning algorithm teaches the program to improve performance by 30x in only 1000 generations"
				]
			},
			{
				title:"Gravity",
				href:"gravity.methodswithclass.com",
				description:"Requires a device with an accelerometer, best viewed on an iPhone (updates for Android are in the works)",
				items:[
					"Developed algorithm to handle device accelerometer data and filter it into usable data (velocity, position) in real time",
					"Designed and developed Angular web app to demonstrate algorithm in use as a game to move a ball around on screen by moving and tilting the physical device around",
					"Developed checks for access by app to the device accelerometer and gives proper warnings if they fail, also give warnings when screen rotates so that it can only be played in portrait (web version)",
					"Developed platform to handle the development of different games that all use the same interaction principle based on original algorithm",
					"Developed games to keep track of score, time, and arcade style graphics",
					"Developed version for iPhone and Android web browsers with JavaScript Angular single page web app",
					"Developed version for iPhone iOS native app in Objective-C"
				]
			},
			{
				title:"Gentle Phrasing",
				href:"www.gentlephrasing.com",
				description:"Fully responsive, view on both desktop and mobile",
				items:[
					"Designed and Developed frontend blog site",
					"Developed Angular I/O module to read .txt files that sit on server that allow population of blog text for each page",
					"Developed technique using PHP to edit the index.php file meta data per request, this allows Facebook and other social media crawlers to automatically populate “share” objects just given a url, the result is the ability to share individual blog articles from a single page app with one index file and “one” set of meta data (found code, modified for my purposes)",
					"Responsive design, mobile recognition, changes which view is served depending on device",
					"AngularJS single page web app"
				]
			},
			{
				title:"Methods with Class",
				href:"www.methodswithclass.com",
				description:"Fully responsive, view on both desktop and mobile",
				items:[
					"Designed and Developed front end Angular app to be online business card",
					"Developed parallax scrolling component in Angular that is globally available and is used here",
					"Responsive design, mobile recognition, changes which view is served depending on device",
					"Angular single page web app"
				]
			},
			]
		}
	}

	return {
		blocks:blocks,
		contact:contact
	}

}]);
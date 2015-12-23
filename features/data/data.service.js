dataModule.factory("data.service", ['global', 'blog.service', function (g, blogs) {

	var published = {
		none:false,
		prison:true,
		scale_time:true,
		meaning_god:false
	}

	var home = {
		meta_data:{
			name:"home",
			title:"gentle phrasing",
			image:"img/landscape"
		},
		share:{
			description:"no worries, the sharp phrasing will be gentle"
		}
	}

	var allblogs = [
	{
		meta_data:{
			date:new Date(2015, 11, 22, 12, 0, 0),
			by:"Christopher Polito",
			name:"prison",
			image:'img/scream_below',
			published:published.prison
		},
		share:{
			title:encodeURIComponent('The Prison'),
			url:encodeURIComponent('http://www.gentlephrasing.com/#/?b=prison'),
			summary:encodeURIComponent('You are in a prison, here is the key.'),
			img:encodeURIComponent('http://www.gentlephrasing.com/img/scream_below.jpg')
		},
		button:{
			classname:"absolute center white font-25"
		},
		share:{
			description:"You're in a prison you can't see because you're distracted by all the writing on the wall."
		},
		content:{
			title:{
				text:"the prison",
				font_size:"font-50",
				justify:"text-center",
				margin:"margin-v-10"
			},
			body:{
				margin: {
					begin:"margin-top-100"
				},
				unpublish:[
				{
					subtitle:{
						text:"",
						font_size:"font-30",
						justify:"text-left",
						margin:"margin-v-20"
					},
					content:blogs.comingsoon
				}
				],
				sections:[
				{
					subtitle:{
						text:"",
						font_size:"font-30",
						justify:"text-left",
						margin:"margin-v-20"
					},
					content:blogs.prison
				}
				]
			}
		}

	},
	{
		meta_data:{
			date:new Date(2015, 11, 22, 12, 0, 0),
			by:"Christopher Polito",
			name:"scale_time",
			image:'img/space_sky',
			published:published.scale_time
		},
		share:{
			title:encodeURIComponent('Scale of Time'),
			url:encodeURIComponent('http://www.gentlephrasing.com/#/?b=scale_time'),
			summary:encodeURIComponent('Time has no scale, here is how Sci Fi has done us a disservice.'),
			img:encodeURIComponent('http://www.gentlephrasing.com/img/space_sky.jpg')
		},
		button:{
			classname:"absolute center white font-25"
		},
		share:{
			description:"Time has no scale, but the implications do"
		},
		content:{
			title:{
				text:"scale of time",
				font_size:"font-50",
				justify:"text-center",
				margin:"margin-v-50"
			},
			body:{
				margin: {
					begin:"margin-top-100"
				},
				unpublish:[
				{
					subtitle:{
						text:"",
						font_size:"font-30",
						justify:"text-left",
						margin:"margin-v-20"
					},
					content:blogs.comingsoon
				}
				],
				sections:[
				{
					subtitle:{
						text:"",
						font_size:"font-30",
						justify:"text-left"
					},
					content:blogs.scale_time
				}
				]
			}
		}

	},
	{
		meta_data:{
			date:new Date(2016, 0, 1, 12, 0, 0),
			by:"Christopher Polito",
			name:"meaning_god",
			image:'img/space',
			published:published.meaning_god
		},
		share:{
			title:encodeURIComponent('Meaning of God'),
			url:encodeURIComponent('http://www.gentlephrasing.com/#/?b=meaning_god'),
			summary:encodeURIComponent('Does god exist? No idea. But there might be a better question.'),
			img:encodeURIComponent('http://www.gentlephrasing.com/img/space.jpg')
		},
		button:{
			classname:"absolute center white font-25"
		},
		share:{
			description:"the existence of god is irrelevant, but the meaning isn\'t"
		},
		content:{
			title:{
				text:"meaning of god",
				font_size:"font-50",
				justify:"text-center",
				margin:"margin-v-50"
			},
			body:{
				margin: {
					begin:"margin-top-100"
				},
				unpublish:[
				{
					subtitle:{
						text:"",
						font_size:"font-30",
						justify:"text-left",
						margin:"margin-v-20"
					},
					content:blogs.comingsoon
				}
				],
				sections:[
				{
					subtitle:{
						text:"",
						font_size:"font-30",
						justify:"text-left"
					},
					content:blogs.meaning_god
				}
				]
			}
		}

	}
	];

	allblogs.sort(function (a,b) {

		return b.meta_data.date.getTime() - a.meta_data.date.getTime();
	});

	var blogs = allblogs.filter(function (blog, index, array) {

		var now = new Date();

		return (blog.meta_data.date.getTime() < now.getTime() && blog.meta_data.published && !published.none);

	});

	for (i in blogs) {

		blogs[i].meta_data.index = i;
	}


	var resolveHeight = function (blog) {

		var percent;

		if (g.isMobile()) {
			percent = 0.2;
		}
		else {
			percent = 0.6;
		}

		var windowWidth = 1600;
		var height = blog.meta_data.height;
		var factor = windowWidth/$(window).width()/percent;

		return factor*height;

	}


	var getBlogByIndex = function (index) {

		return blogs[index];
	}

	var getIndexByName = function (name) {

		for (i in blogs) {
			if (name == blogs[i].meta_data.name) {
				return i;
			}
		}

		return -1;
	}

	var resolveIndex = function (index) {

		if (index >= 0 && index < blogs.length) {
			return true;
		}
		return false;
	}

	var getBlogByName = function (name) {

		var index = getIndexByName(name);

		if (resolveIndex(index)) return getBlogByIndex(index);
		else console.log("invalid name");
	}

	var isBlog = function (name) {

		var index = getIndexByName(name);

		return resolveIndex(index);
	}

	var getButtonPosition = function (index) {

		var cols = blogs.length <= 3 ? 2 : 3;
		var rowsFrac = blogs.length/cols;
		var rows = rowsFrac % cols == 0 ? rowsFrac : rowsFrac + 1;

		return {x:index % cols, y:Math.floor(index/cols), cols:cols, rows:rows};

	}

	return {
		home:home,
		blogs:blogs,
		getBlogByName:getBlogByName,
		getBlogByIndex:getBlogByIndex,
		isBlog:isBlog,
		resolveIndex:resolveIndex,
		resolveHeight:resolveHeight,
		getButtonPosition:getButtonPosition
	}

}]);
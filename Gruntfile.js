module.exports = function(grunt) {


	grunt.initConfig({

		connect: {
			server: {
				options: {
				  livereload: true,
				  base: './',
				  port: 9000
				}
			}
		},

		// serve: {
		// 	files:"./index.html",
		// 	options: {
		// 		port: 9000
		// 	}
		// },
		watch: {
			options: {
				livereload: true
			},
			files: ['application/**/*.js', 'application/**/*.html'] // ** any directory; * any file
			// html:{
			// 	files:["application/**/*.html"],
			// 	options:{
			// 		livereload:true
			// 	}
			// }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask("serve", [
         'connect:server',
         "watch"
    ])

};
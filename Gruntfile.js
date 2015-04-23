module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			files: ['js/src/**/*.js'],
			tasks: ['concat', 'uglify']
		},

		concat: {
			options: {
				separator: ';'
			},

			main: {
				src: [
					"js/src/fullscreen_handler.js",
					"js/src/init.js",
				],
				dest: "js/dev/main.js"
			}
		},

		uglify: {
			main: {
				files: {
					"js/dist/main.min.js": ['js/dev/main.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['watch']);
};
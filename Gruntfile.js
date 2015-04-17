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
			src: ["js/src/init.js"],
			dest: "js/dev/main.js"
		},

		materialize: {
			src: ["js/vendor/materialize/**/*.js"],
			dest: "js/dev/materialize.js"
		}
	},

	uglify: {
		main: {
			files: {
				"js/dist/main.min.js": ['js/dev/main.js']
			}
		},
		materialize: {
			files: {
				"js/dist/materialize.min.js": ['js/dev/materialize.js']
			}
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['watch']);
};
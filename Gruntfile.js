module.exports = function(grunt) {

 var customFtgConfig = {
        app: 'Extension',
        dist: 'dist'
    };

// should i use load or require
    require('time-grunt')(grunt);
	grunt.loadNpmTasks('grunt-contrib-copy');
 	grunt.loadNpmTasks('grunt-contrib-clean');
 	grunt.loadNpmTasks('grunt-chrome-manifest');
 //todo
//add version
//add zip

	grunt.initConfig({
FtgConfig:customFtgConfig,
		clean: ["dist"],
		copy: {
		  main: {
		    files: [
		      {src: ['Extension/*'], dest: 'dist/', filter: 'isFile'}, // includes files in path
		      {src: ['Extension/**'], dest: 'dist/'}, // includes files in path and its subdirs
		      {expand: true, cwd: 'Extension/', src: ['**'], dest: 'dist/'}, // makes all src relative to cwd
		      {expand: true, flatten: true, src: ['Extension/**'], dest: 'dist/', filter: 'isFile'} // flattens results to a single level
		    ]
		  }
		},chromeManifest: {
  dist: {
    options: {
      buildnumber: true,
      background: {
        target: 'eventPage.js'
      }
    },
    src: 'Extension',
    dest: 'dist'
  }
}

 	});

 // A very basic default task.
  grunt.registerTask('logit', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

//grunt.registerTask('trial', ["chromeManifest:dist"]);

grunt.registerTask('default', ["logit","clean","copy","chromeManifest:dist"]);



};
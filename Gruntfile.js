module.exports = function(grunt) {

//  var yeomanConfig = {
 //       app: 'app',
  //      dist: 'dist'
  //  };

// should i use load or require
    require('time-grunt')(grunt);
	grunt.loadNpmTasks('grunt-contrib-copy');
 grunt.loadNpmTasks('grunt-contrib-clean');
 //todo
//add version
//add zip

	grunt.initConfig({

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
		}

 	});

 // A very basic default task.
  grunt.registerTask('logit', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });



grunt.registerTask('default', ["logit","clean","copy"]);



};
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-copy');
 
	grunt.initConfig({
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
  //grunt.registerTask('default', []);

 // A very basic default task.
  grunt.registerTask('logit', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...2').ok();
  });

grunt.registerTask('default', ["copy"]);

};
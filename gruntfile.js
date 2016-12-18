module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: '\n\n//-------------------------------\n',
        banner: '\n\n//-------------------------------\n',
      },
      dist: {
        src: [
          'client/scripts/buffer-loader.js',
          'client/scripts/audio.js',
          'client/scripts/speech.js'
        ],
        dest: 'client/js/script.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [
            {
                src: 'client/sass/main.scss',
                dest: 'client/css/style.css'
            }
        ]
      }
    },
    watch: {
      scripts: {
        files: ['client/**/*.scss'],
        tasks: ['sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'sass', 'watch']);
} // wrapper function

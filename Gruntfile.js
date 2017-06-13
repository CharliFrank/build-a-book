const grunt = require('grunt');

grunt.initConfig({
  clean: ['dist/**'],
  babel: {
    options: {
      sourceMap: true,
      presets: ['es2015'],
    },
    dist: {
      files: [{
        expand: true,
        cwd: 'Client',
        src: ['**/*.js'],
        dest: 'dist',
        ext: '.js',
      }],
    },
  },
  shell: {
    devServer: {
      command: 'npm run dev',
    },
    prodServer: {
      command: 'npm start',
    },
  },
  eslint: {
    options: {
      ignorePattern: 'src/client/bower_components/**/*.js',
    },
    src: ['src/server/**/*.js', 'src/Client/app/**/*.js', 'server.js'],
  },
});
grunt.loadNpmTasks('grunt-babel');
grunt.loadNpmTasks('gruntify-eslint');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', [
  'clean',
  'eslint',
  'babel',
  'shell:prodServer',
]);
grunt.registerTask('dev', [
  'clean',
  'eslint',
  'babel',
  'shell:devServer',
]);
grunt.registerTask('prod', [
  'clean',
  'eslint',
  'babel',
  'shell:prodServer',
]);

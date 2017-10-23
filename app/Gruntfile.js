var webpackConfig = require("./webpack.config");
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    eslint: {
      options: {
        configFile: "eslint.json"
      },
      target: ["Gruntfile.js", "*.js", "lib/**/*.js", "js/**/*.js?"]
    },
    sass: {
		  options: {
			  sourceMap: true
		  },
		  dist: {
			  files: {
				  "dist/styles.css": "css/styles.scss"
			  }
		  }
	  },
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      },
      prod: webpackConfig,
      dev: webpackConfig
    },
    watch: {
      sass: {
        files: ["css/**/*"],
        tasks: ["sass"]
      },
      scripts: {
        files: ["*.js", "**/*.js?"],
        tasks: ["eslint", "webpack"],
        options: {
          spawn: false,
        },
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-sass");  
  grunt.loadNpmTasks("grunt-webpack");
  
  grunt.registerTask("default", ["eslint", "sass", "webpack"]);
};

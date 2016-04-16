module.exports = function (wallaby) {
    return {
        files: [
            'testSetup.js',
            'src/*.js'
        ],

        tests: ['tests/*.js'],

        env: {
            type: 'node',
            runner: 'node'
        },

        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },

        testFramework: 'mocha',

        bootstrap: function bootstrap() {
            require('./testSetup')
        }

    }
}

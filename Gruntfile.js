module.exports = function (grunt) {

    grunt.initConfig({
        copy: {

        },
        shell: {
            win32_ia32: {
                command: `electron-forge make --arch=ia32 --platform=win32`,
                options: {
                    failOnError: false
                }
            },
            win32_x64: {
                command: `electron-forge make --arch=x64 --platform=win32`,
                options: {
                    failOnError: false
                }
            },
            darwin_ia32: {
                command: `electron-forge make --arch=ia32 --platform=darwin`,
                options: {
                    failOnError: false
                }
            },
            darwin_x64: {
                command: `electron-forge make --arch=x64 --platform=darwin`,
                options: {
                    failOnError: false
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask("default", [])
}
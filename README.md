# Challege App 'Founder's Map'

**UPDATE 29/09/16**  
This app has been done for a purpose of hiring process in limited time (some evenings after a job and one weekend). App is not completely done.

**Demo is seen here:**
http://foundersmapquest.surge.sh

A project uses bower and nodejs modules like gulp.

For a purpose of this project and to avoid inconsistencies between developers I have added following directories in repository: /src/vendor, /dist

/src/vendor contains some libraries that usually are maintained by bower. There is a bower.json file with dependencies to install them all ($ bower install).

/dist contains compiled version of app.

Project uses absolute paths, it is necessary to run it on server. I used Apache with vhost configuration that is attached to /dist directory.
You can also run project by npm module BrowserSync that creates localhost:3000 by default gulp task.


## Preparation of modules and dependency libraries

If you have not nodejs installed, follow [https://nodejs.org/en/].

`$ npm install -g bower` 

`$ bower install`

`$ npm install`

### Important gulp tasks for project and assets compilation

`$ gulp` - runs BrowserSync and watchers

`$ gulp build` - runs project and assets compilation on demand

`$ gulp deploy:build` - runs a deploy to http://foundersmapquest.surge.sh, it is necessary to have an account [https://surge.sh]

## Sample data for a 'Startup's Map' page ##
To see how app works, you can download this sample.cvs and paste it in textarea in Startup's Map page. App is ready to parse comma/tab/semicolon separated values in defined order.  
https://www.dropbox.com/s/qfn7dvw49fdnkgn/sample.csv?dl=1
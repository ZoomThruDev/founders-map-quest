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
You can paste this code (csv originated) to textarea in Startup's Map page to see how app is working. App is ready to parse comma/tab/semicolon separated values in defined order.    
`Id,Company Name,Founder,City,Country,Postal Code, Street,Photo,Home Page,Garage Latitude,Garage Longitude
1,Google,Larry Page & Sergey Brin,Mountain View,USA,CA 94043,1600 Amphitheatre Pkwy,http://i.dailymail.co.uk/i/pix/2009/04/24/article-1173326-0080141700000258-460_468x359.jpg,http://google.com,37.457674,-122.163452
2,Apple,Steve Jobs & Steve Wozniak,Cupertino,USA,CA 95014,1 Infinite Loop,http://i.dailymail.co.uk/i/pix/2013/02/08/article-2275512-172E13BB000005DC-732_634x505.jpg,http://apple.com,37.3403188,-122.0581469
3,Microsoft,Bill Gates,Redmond,USA,WA 98052-7329,One Microsoft Way,https://s-media-cache-ak0.pinimg.com/originals/00/ad/1a/00ad1a2659da786636b311a6f8beab8f.jpg,http://microsoft.com,37.472189,-122.190191`
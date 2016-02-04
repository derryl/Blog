![image](http://dev.drryl.com/img/d-logomark.png)

#Drryl's Blog

[Coffee](http://coffeescript.org/), [LESS](http://lesscss.org/), [Sublime Text](http://www.sublimetext.com/2), and plain ol' HTML construct it.

[Grunt](http://gruntjs.com/) watches it.

[Jekyll](http://jekyllrb.com/) assembles it.

[Amazon S3](http://aws.amazon.com/s3/) hosts it.

[People](http://en.wikipedia.org/wiki/Human) read it.

------------------

####To get started:

	git clone git@github.com:derryl/Blog.git
    npm install
    gem install jekyll
    grunt

All source files are in `/app`. They're compiled to `/public` whenever changes are made while `grunt` is running. For distribution, files are copied to `/dist` and further optimizations/compression are performed.


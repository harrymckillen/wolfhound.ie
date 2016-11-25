# www.wolfhound.ie

This is the README for the www.wolfhound.ie repo. 

## How I made it?

I use a good few of these technologies in work. I have previously always had a Wordpress-based site. I find myself just fighting with a theme to get it to do what I want. I also don't think I use Wordpress to it's fullest potentional. So I don't feel I need a CMS, as the content seldom changes. I rarely write blogs, despite several attempts at doing so. What this is, is a static site generator using:

* node.js
* gruntjs
* Sass
* Jade
* Javascript/AngularJS
* HTML... goes without saying really

## Why "open source it"?

i.e. Throw it up on github, and claim it is open source... I don't know. I'm effectively using github as a storage solution/CMS. I build and deploy from my local machine, but all the content is in git. 


## Page Level Variables

### pageClassName
Fancy passing in a page specific class name on the <body> tag? Like for example, you want a home page specific class. 

`
block variables
  - var pageClassName = 'home'
`

If you want multiple class names, just add them as a space separated list as you would within the start HTML class attribute.
`
block variables
  - var pageClassName = 'home class-1 class-2 class-3'
`

### footerHidden
Simple as, if true, doesn't output the footer.

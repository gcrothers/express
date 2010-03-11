
require.paths.unshift('lib')
require('express/import')

var kiwi = require('kiwi'),
    sys = require('sys')

configure(function(){
  kiwi.seed('haml')
  kiwi.seed('sass')
  use(MethodOverride)
  use(ContentLength)
  use(CommonLogger)
  use(Cookie)
  use(Session)
  use(Flash)
  set('root', __dirname)
})

get('/', function(){
  this.redirect('/upload')
})

get('/upload', function(){
  this.render('upload.haml.html', {
    locals: {
      flashes: this.flash('info')
    }  
  })
})

post('/upload', function(){  
  this.param('images').each(function(image){
    sys.puts(image.filename + ' -> ' + image.tempfile)
    this.flash('info', 'Uploaded ' + image.filename)
  }, this)
  this.redirect('/upload')
})

get('/public/*', function(file){
  this.sendfile(__dirname + '/public/' + file)
})

get('/*.css', function(file){
  this.render(file + '.sass.css', { layout: false })
})

run()
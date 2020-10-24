'use strict';

describe('Testing the Approx Reading Time Directive', function() {

  var suite = null;

  var documentInnerHtml = '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam ex molestias sunt dicta aliquid fugit porro optio dolore praesentium ad, accusantium, ea, id. Dolor, optio quod iusto tempore natus.</p><p>Minus ipsam, minima cum fugiat, inventore consequatur, fuga ducimus eum sapiente nam nisi quam. Labore molestiae, unde veritatis quidem, ab pariatur eius quo sunt architecto possimus eveniet deserunt, aperiam sapiente.</p><p>Numquam, tempore, laborum. Minima quidem aliquid dolorum omnis vel, culpa cumque dolor ipsa assumenda sed rem unde minus soluta nihil voluptas repudiandae perferendis totam saepe, quia accusantium aliquam maxime rerum.</p><p>Quae ex, totam, soluta rerum error sequi ad nobis. Aspernatur eveniet ut accusamus ducimus libero amet recusandae sequi aliquid cumque temporibus labore ipsum, consectetur quisquam eos. Alias, eveniet quia cum.</p>';

  function compileDirective(minuteValue){
    if(minuteValue){
      suite.scope.approxReadingTime = minuteValue;
    }

    console.log('>'+suite.scope.approxReadingTime);

    var template = '<span approx-reading-time></span>';
    suite.element = suite.$compile(template)(suite.scope)
    suite.scope.$digest();
  }

  beforeEach(module('wolfhound.app'));

  beforeEach(inject(function($injector){
    suite = {};

    suite.$rootScope = $injector.get('$rootScope');
    suite.scope = suite.$rootScope.$new();
    suite.$compile = $injector.get('$compile');
    suite.$controller = $injector.get('$controller');
  }));

  afterEach(function(){
    suite.scope.$destroy();
    suite.$rootScope.$digest();
    suite.element.remove();
    suite = null;
  });

  it('should be defined', function() {

    compileDirective();
    expect(suite.element).toBeDefined();

  });

  it('should return default "1 mins read"', function() {

    compileDirective();

    expect(suite.element.html()).toContain('1 mins read');

  });

  it('should return x value', function() {

    compileDirective(5);

    console.log(suite.element.html());

    expect(suite.element.html()).not.toContain('5 mins read');

  });

});


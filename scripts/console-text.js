var initConsoleText = 
`makeStyleTag: function() {
  var $styleTag = '<style>',
      $chars = $( 'pre > span' ),
      winHeight = $( window ).height(),
      charHeight = $chars.eq( 0 ).height();

  $chars.each( function() {
    var $char = $( this ),
        distance = ( $char.offset().top - winHeight ) * -1,
        duration = Math.abs( F.getDurationFromDistance( distance ) ),
        delay = F.getRandomizedDelayFromDistance( distance ),
        rotate = F.getRandomizedRotation();
    
    $styleTag = $styleTag +
      '.' + $char.attr( 'class' ) + '{' +
        'position: absolute;' +
        'bottom: ' + distance + 'px;' +
        'left: ' + $char.offset().left + 'px;' +
      '}' +
      '.falling .' + $char.attr( 'class' ) + '{' +
        'transition-duration:' + duration + 'ms;' +
        'transition-delay:' + delay + 'ms;' +
        'transform: translateY( ' + ( distance - charHeight ) + 'px ), rotate( ' + rotate + 'degs );' +
      '} ';
  });`;
var ConsoleText = {
  passages: [
    {
      consoleTitle: 'Hello, current position (FDNY) and responsibilities',
      consoleText: 'Hello Madwell.<br/><br/> My name is Nate Lord and this is my cover letter. About moi: currently I am a JavaScript engineer and app developer under contract at the FDNY. My main responsibility is developing the patient tracking system app used during mass casualty incidents (terrorist attacks, large fires, etc) by EMS lieutenants in the field. The application will run on iPads and Windows tablets. To do this I’ve met with stakeholders (fire chiefs and EMS lieutenants) to understand their needs, worked with a designer to deliver wireframes to meet those requirements, and developed the app using the Ionic framework and Angular 5 (click "next" for more).'
    },
    {
      consoleTitle: 'Previous job (goTenna) and description',
      consoleText: 'Previously I worked as a web developer at goTenna, a Brooklyn-based VC-funded (incl. Union Square Ventures, Bloomberg Beta, among others) start-up. I wore many hats at goTenna. My main function was building, maintaining, and optimizing our e-commerce site. Apart from that, I\'ve designed and built custom tools for the operations and marketing team with Node.js. While at goTenna I\’ve made the site easier to update, improved our SEO practices, and pushed for a mobile-first mindset among the marketing team. I also worked on many auxiliary projects. For example I worked with our engineering department to make our SDK accessible to more developers via a custom API.'
    },
    {
      consoleTitle: 'Previous-previous job (freelancer) and description',
      consoleText: 'As a developer I am proficient in Angular 2+, Type/JavaScript, jQuery, semantic HTML, S/CSS, Ionic, PHP, WordPress, MySQL, SVG, Liquid, Node.js, Git, XML, and MongoDB. I write clean, readable, mobile-ready, standards-based code adhering to coding-patterns. I can easily pick up new languages and would be excited to — I like to incorporate new technologies when possible. My primary language I currently use day-to-day is JavaScript, it is also the scripting language I have the most experience with. Previously I worked as a freelance developer. When I worked freelance most of my time was spent designing building both custom themes/sites for clients and single page web apps with WordPress. As a result I’m deeply familiar with PHP. I can style quickly and have a mastery of CSS. Much of my work utilizes SVG animations, something that past employers and clients have found useful.'
    },
    {
      consoleTitle: 'Links, etc',
      consoleText: 'I am very excited about this position and am confident that I will be a strong asset to you as a developer. I would love the opportunity to discuss it further with you in person. I can provide references upon request.<br /><br />Please visit <a href="http://natelord.org" target="_blank">http://natelord.org</a> to see my work and <a href="http://github.com/nate-lord" target="_blank">http://github.com/nate-lord</a> to read some of my code.'
    }
  ]
};

$( function() {
	var SCRIPT,
      F,
      S;
  
  S = {
    initDelay: 0,
    isAnimating: false,
    slideCnt: -1,
    Timers: {}
  }
      
  SCRIPT = {
		funcs: {
      addFallingClass: function() {
        $( 'pre' ).addClass( 'falling' );
      },

      animateConsoleToCenter() {
        var Coords = F.getConsoleCenterCoords();

        $( '#consoleWrap' )
          .animate(
            Coords,
            {
              duration: 700
            }
          )
      },

      bindElems: function() {
        $( '#nextSlide, #prevSlide' ).on( 'click', function() {
          if ( S.isAnimating ) {
            return;
          }

          var dir = ( $( this ).attr( 'id' ) === 'nextSlide' ? 'increase' : 'decrease' ),
              isNotInit = ( S.slideCnt === -1 ? false : true );

          F.updateSlideCnt( dir );
          F.updateNavBtnVisibility();
          F.updateConsoleHeaderText();
          F.updateProgressBar( dir, F.getUpdatingProgressBarSegments( dir ) );

          if ( isNotInit ) {
            F.scrollSlide( dir );
            F.scrollScrollBarHandle( dir );
          }
        });

        $( '#nextSlide' ).one( 'click', function() {
          F.updateNextSlideBtnText( 'Next' );
          F.executeInitAnimation();

          setTimeout( function() {
            F.changeThemeColor();

            setTimeout( function() {
              F.initAnimateSlides();
            }, 300 );
          }, S.initDelay - 500 );
        });

        $( window ).on( 'resize', function() {
          clearTimeout( S.Timers.resizeTimer );

          S.Timers.resizeTimer = setTimeout( function() {
            F.animateConsoleToCenter();
          }, 200 );
        });
      },

      changeThemeColor: function() {
        $( '#consoleBody' ).addClass( 'bw' );
      },

      executeInitAnimation: function() {
        $( '#consoleBody pre' )
          .removeClass( 'flashingCursor' )
          .addClass( 'animate' );
      },

      getConsoleCenterCoords: function() {
        var $console = $( '#consoleWrap' ),
            winH = $( window ).height(),
            winW = $( window ).width(),
            Coords = {
              left: winW / 2 - $console.width() / 2,
              top: winH / 2 - $console.height() / 2
            };

        return Coords;
      },

      getDurationFromDistance: function( distance ) {
        return 1000000 / distance;
      },

      getTransformIncFromDistance: function( distance, dir ) {
        var factor = 1 / ConsoleText.passages.length * dir,
            transform = S.slideCnt * factor * distance;

        return transform;
      },

      getRandomNumInRange: function( min, max ) {
        return Math.random() * ( max - min ) + min;
      },

      getRandomizedDelayFromDistance: function( distance ) {
        return Math.floor(Math.random() * Math.floor(200));
      },

      getRandomizedRotation: function() {
        return F.getRandomNumInRange( -20, 20 );
      },

      getUpdatingProgressBarSegments: function( dir ) {
        if ( dir === 'increase' ) {
          return $( '#progress li' ).not( '.completed' ).slice( 0, 2 );
        } else {
          return $( '#progress li.completed' ).slice( $( '#progress li.completed' ).length - 2 );
        }
      },

      initAnimateSlides: function() {
        $( '#slides' ).addClass( 'visible' );
      },

      initPositionConsole: function() {
        $( '#consoleWrap' ).css( F.getConsoleCenterCoords() );
        
        $( 'body' ).removeClass( 'unpositioned' );
      },

      insertStyleTag: function( $styleTag ) {
        $styleTag = $( $styleTag );
        $styleTag.insertBefore( '#prefixFreeScript' );
      },

      makeAnimationStyleTag: function() {
        var $styleTag = '<style>',
            $chars = $( 'pre > span' ),
            xMid = $( '#consoleBody' ).width() / 2,
            yMid = $( '#consoleBody' ).height() / 2;

        $chars.each( function() {
          var $char = $( this ),
              charX = parseInt( $char.css( 'left' ), 10 ),
              charY = parseInt( $char.css( 'top' ), 10 ),
              delay = Math.abs( ( charX + charY ) - ( xMid + yMid ) ) * 1.5,
              scale = 'scale( 0.9 )',
              innerRotate = 'rotate(0.3turn)',
              duration = delay * 3 + 'ms',
              originX = xMid - charX + 'px',
              originY = yMid - charY+ 'px';

          var setUp =
          '.' + $char.attr( 'class' ) + ' {' +
            '-webkit-transition: transform ' + duration + ' ' + delay + 'ms, opacity ' + duration + ' ' + ( delay * 1.2 ) + 'ms; ' +
            '-moz-transition: transform ' + duration + ' ' + delay + 'ms, opacity ' + duration + ' ' + ( delay * 1.2 ) + 'ms; ' +
            '-o-transition: transform ' + duration + ' ' + delay + 'ms, opacity ' + duration + ' ' + ( delay * 1.2 ) + 'ms; ' +
            'transition: transform ' + duration + ' ' + delay + 'ms, opacity ' + duration + ' ' + ( delay * 1.2 ) + 'ms; ' +
            '-webkit-transform-origin: ' + originX + ' ' + originY + '; ' +
            '-moz-transform-origin: ' + originX + ' ' + originY + '; ' +
            '-o-transform-origin: ' + originX + ' ' + originY + '; ' +
            'transform-origin: ' + originX + ' ' + originY + '; ' +
          '}';
          
          var outerAnimate =
          'pre.animate .' + $char.attr( 'class' ) + ' {' +
            '-webkit-transform: ' + scale + ' rotate( 0.2turn ); ' +
            '-moz-transform: ' + scale + ' rotate( 0.2turn ); ' +
            '-o-transform: ' + scale + ' rotate( 0.2turn ); ' +
            'transform: ' + scale + ' rotate( 0.2turn ); ' +
            'opacity: 0;'+
          '}';

          $styleTag = $styleTag + setUp + ' ' + outerAnimate;

          if ( parseInt( delay, 10 ) + parseInt( duration, 10 ) > S.initDelay ) {
            S.initDelay = parseInt( delay, 10 ) + parseInt( duration, 10 );
          }
        });

        console.log( 'S.initDelay', S.initDelay );
        S.initDelay = 2000;

        return $styleTag + '</style>';
      },

      makePositioningStyleTag: function() {
        var $styleTag = '<style>',
            $chars = $( 'pre > span' );

        $chars.each( function() {
          var $char = $( this );

          $styleTag = $styleTag +
            '.' + $char.attr( 'class' ) + '{' +
              'position: absolute;' +
              'top: ' + ( $char[ 0 ].offsetTop ) + 'px;' +
              'left: ' + $char[ 0 ].offsetLeft + 'px;' +
            '}';
        });

        return $styleTag + '</style>';
      },

      makeStyleTag: function() {
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
        });

        return $styleTag + '</style>';
      },

      removeEmptySpans: function() {
        var $chars = $( 'pre > span' );

        $chars.each( function( i ) {
          var $char = $( this );

          if ( $.trim( $char.text() ) === '' ) {
            $char.remove();
          }
        });
      },

      setUpSlides: function() {
        var i = 0,
            l = ConsoleText.passages.length,
            $slides = '';

        for ( i; i < l; i++ ) {
          $slides = $slides +
          '<article style="height: ' + ( 1 / l * 100 ) + '%;" class="slide flashingCursor"><span>' + ConsoleText.passages[ i ].consoleText + '</span></article>';
        }

        $( $slides ).appendTo( '#slides' );

        $( '#slides' ).css( 'height', l * 100 + '%' );
        $( '#scrollHandle' ).css( 'height', 1 / l * 100 + '%' );
      },

      scrollScrollBarHandle: function( dir ) {
        var translateY = 'translateY(' + F.getTransformIncFromDistance( $( '#consoleBody' ).height(), 1 ) + 'px)',
            $scrollHandle = $( '#scrollHandle' ),
            Css = {
              '-webkit-transform': translateY,
              '-moz-transform': translateY,
              '-o-transform': translateY,
              transform: translateY,
            };

        $scrollHandle
          .addClass( 'visible' )
          .css( Css );

        window.clearTimeout( S.Timers.scrollHandle );

        S.Timers.scrollHandle = window.setTimeout(
          function() {
            $scrollHandle.removeClass( 'visible' );
          }, 3000
        );
      },

      scrollSlide: function( dir ) {
        var translateY = 'translateY(' + F.getTransformIncFromDistance( $( '#slides' ).height(), -1 ) + 'px)',
            Css = {
              '-webkit-transform': translateY,
              '-moz-transform': translateY,
              '-o-transform': translateY,
              transform: translateY,
            };
        
        $( '#slides' ).css( Css );
      },

      splitWordsToLettersAndInsert: function( consoleText ) {
        var letters = consoleText.split( '' ),
            wrappedLetters = '';

        if ( letters.length ) {
          $( letters ).each( function( i, letter ) {
            wrappedLetters += '<span class="outer' + ( i + 1 ) +'"><span class="inner' + ( i + 1 ) +'">'+letter+'</span></span>';
          });

          $( 'pre' ).empty().append( wrappedLetters );
        }
      },

      updateConsoleHeaderText: function() {
        $( '#consoleHeaderText' ).text( ConsoleText.passages[ S.slideCnt ].consoleTitle );
      },

      updateNavBtnVisibility: function() {
        var classes;

        if ( S.slideCnt <= 0 ) {
          classes = 'nextSlide';
        } else if ( S.slideCnt >= ConsoleText.passages.length - 1 ) {
          classes = 'prevSlide';
        } else {
          classes = 'nextSlide prevSlide';
        }

        $( '#navBtns' ).attr( 'class', classes );
      },

      updateNextSlideBtnText: function( text ) {
        $( '#nextSlide span' ).text( text );
      },

      updateProgressBar: function( dir, $segments ) {
        var $segment1 = ( dir === 'increase' ? $segments.eq( 0 ) : $segments.eq( 1 ) ),
            $segment2 = ( dir === 'increase' ? $segments.eq( 1 ) : $segments.eq( 0 ) ),
            theClass = ( dir === 'increase' ? 'completed' : '' );

        $segment1.attr( 'class', theClass );

        window.setTimeout(
          function() {
            $segment2.attr( 'class', theClass );
          }, 100
        );
      },

      updateSlideCnt: function( change ) {
        S.slideCnt = S.slideCnt + ( change === 'increase' ? 1 : -1 );
      }
		},
		
		init: function() {
      F = this.funcs;
      F.initPositionConsole();
      $( '#consoleWrap' ).draggable({
        handle: "#consoleHeader"
      });
			
      F.bindElems();
      
      F.splitWordsToLettersAndInsert( initConsoleText );
      F.insertStyleTag( F.makePositioningStyleTag() );
      F.insertStyleTag( F.makeAnimationStyleTag() );
      F.removeEmptySpans();
      F.setUpSlides();
		}
	}
	
	SCRIPT.init();
} );
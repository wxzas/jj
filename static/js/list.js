$(function () {
  $.utils = {
    temp: {},
    ua: $.ua,
    // 是否为 手机
    is_phone: $.ua.device.type == 'mobile',
    // 是否为 平板
    is_tablet: $.ua.device.type == 'tablet',
    // 是否为 移动端
    is_mobile: typeof $.ua.device.type !== 'undefined',
    // 是否为 ios
    is_ios: $.ua.os.name == 'iOS',
    // 是否为 android
    is_android: $.ua.os.name == 'Android',
    // 是否为 个人微信
    is_wechat: $.ua.browser.name == 'WeChat',
    // 是否为 企业微信
    is_cochat: $.ua.ua.match(/WxWork/i) == 'wxwork',
    // 是否为 null
    is_null: function(a) {
      return (a === null);
    },
    // 是否为 undefined
    is_undefined: function(a) {
      return typeof a == 'undefined';
    },
    // 是否为空
    is_none: function(a) {
      return (this.is_null(a) || this.is_undefined(a) || a === '' || a === 'undefined');
    },
    // 是否为 true
    is_true: function(a) {
      return (a === true || a === 'true');
    },
    // 是否为 false
    is_false: function(a) {
      return (a === false || a === 'false');
    },
    // 是否为数组
    is_array: function(a) {
      return (a instanceof Array);
    },
    // 是否为数字
    is_number: function(a) {
      return ((a instanceof Number || typeof a == 'number') && !isNaN(a));
    },
    // 是否为百分数
    is_percentage: function(a) {
      return (this.is_string(a) && a.slice(-1) == '%');
    },
    // 是否为字符串
    is_string: function(a) {
      return ((a instanceof String || typeof a == 'string') && !this.is_none(a) && !this.is_true(a) && !this.is_false(a));
    },
    // 是否为函数
    is_function: function(a) {
      return (a instanceof Function || typeof a == 'function');
    },
    // 是否为布尔
    is_boolean: function(a) {
      return (a instanceof Boolean || typeof a == 'boolean' || this.is_true(a) || this.is_false(a));
    },
    // 是否为jq对象
    is_jquery: function(a) {
      return (a instanceof jQuery);
    },
  };
  
  $('.tracker-mod').each(function () {
    var $this = $(this),
      $box = $this.find('.tracker-box'),
      $track = $this.find('.tracker-track'),
      $item = $this.find('.tracker-item'),
      $prev = $this.find('.tracker-prev'),
      $next = $this.find('.tracker-next'),
      idx = $item.filter('.cur').length > 0 ? $item.filter('.cur').index() : 0,
      isPage = !$.utils.is_undefined($this.attr('page')),
      isRound = !$.utils.is_undefined($this.attr('round')),
      drager = null, dir = null,
      $in = null, $out = null, $over = null;

    init();

    $(window).on('resize', $.debounce(300, init));

    $item.on('click.tracker', function () {
      clickItem($(this));
    });

    $prev.on('click.tracker', function () {
      var dis = 0,
        page = $this.attr('page'),
        $turn = $item.eq(idx).prevAll(':visible').first();

      if (isPage) {
        if (!drager) {
          return;
        }

        $turn = $in.length > 0 ? $in.first().prevAll(':visible') : $over.first().prevAll(':visible');
        $turn = $turn.filter(function (i) {
          if (page > 0) {
            return i < page;
          } else {
            return i == 0;
          }
        });

        if ($turn.length == 0) {
          if (drager && isRound) {
            if (dir == 'x') { 
              gsap.to($track, { duration: 0.5, x: drager[0].minX, onComplete: viewItems });
            } else if (dir == 'y'){
              gsap.to($track, { duration: 0.5, y: drager[0].minY, onComplete: viewItems });              
            }
          }
          return;
        }

        if (!isRound) {
          $next.removeClass('disable');
          
          if (drager && $in.first().prevAll(':visible').length == 1) {
            $prev.addClass('disable');
          }
        }


        if (dir == 'x') {
          dis = page > 0 ? gsap.getProperty($track[0], 'x') + ($box.offset().left - $turn.offset().left) : gsap.getProperty($track[0], 'x') + (($box.offset().left + $box.width()) - ($turn.offset().left + $turn.outerWidth()));

          if (dis >= 0) {
            dis = 0;
  
            if (!isRound) {
              $prev.addClass('disable');
            }    
          }
          gsap.to($track, { duration: 0.5, x: dis, onComplete: viewItems });
        } else if (dir == 'y') {
          dis = page > 0 ? gsap.getProperty($track[0], 'y') + ($box.offset().top - $turn.offset().top) : gsap.getProperty($track[0], 'y') + (($box.offset().top + $box.height()) - ($turn.offset().top + $turn.outerHeight()));

          if (dis >= 0) {
            dis = 0;
  
            if (!isRound) {
              $prev.addClass('disable');
            }    
          }
          gsap.to($track, {duration: 0.5, y: dis, onComplete: viewItems});
        }
      } else {
        if ($turn.length == 0) {
          if (isRound) {
            // $item.last().triggerHandler('click');
            clickItem($item.last());
          }
        } else {
          // $turn.triggerHandler('click');
          clickItem($turn);
        }
      }
    });

    $next.on('click.tracker', function () {
      var dis = 0,
        page = $this.attr('page'),
        $turn = $item.eq(idx).nextAll(':visible').first();

      if (isPage) {
        if (!drager) {
          return;
        }

        $turn = $in.length > 0 ? $in.last().nextAll(':visible') : $over.last().nextAll(':visible');
        $turn = $turn.filter(function (i) {
          if (page > 0) {
            return i < page;
          } else {
            return i == 0;
          }
        });

        if ($turn.length == 0) {
          if (drager && isRound) {
            if (dir == 'x') { 
              gsap.to($track, { duration: 0.5, x: 0, onComplete: viewItems });
            } else if (dir == 'y'){
              gsap.to($track, { duration: 0.5, y: 0, onComplete: viewItems });              
            }
          }
          return;
        }

        if (!isRound) {
          $prev.removeClass('disable');
          
          if (drager && $in.last().nextAll(':visible').length == 1) {
            $next.addClass('disable');
          }
        }

        if (dir == 'x') {
          dis = page > 0 ? gsap.getProperty($track[0], 'x') - (($turn.offset().left + $turn.outerWidth()) - ($box.offset().left + $box.width())) : gsap.getProperty($track[0], 'x') - ($turn.offset().left - $box.offset().left);
          
          if (dis - drager[0].minX <= 0) {
            dis = drager[0].minX;
            if (!isRound) {
              $next.addClass('disable');
            }    
          }

          gsap.to($track, {duration: 0.5, x: dis, onComplete: viewItems});
        } else if (dir == 'y') {
          dis = page > 0 ? gsap.getProperty($track[0], 'y') - (($turn.offset().top + $turn.outerHeight()) - ($box.offset().top + $box.height())) : gsap.getProperty($track[0], 'y') - ($turn.offset().top - $box.offset().top);
          
          if (dis - drager[0].minY <= 0) {
            dis = drager[0].minY;
            if (!isRound) {
              $next.addClass('disable');
            }    
          }

          gsap.to($track, {duration: 0.5, y: dis, onComplete: viewItems});
        }
      } else {
        if ($turn.length == 0) {
          if (isRound) {
            // $item.first().triggerHandler('click');
            clickItem($item.first());
          }
        } else {
          // $turn.triggerHandler('click');
          clickItem($turn);
        }
      }
    });

    $this.on('refresh', function (e, i) {
      e.stopPropagation();
      if($.utils.is_undefined(i)){
        i = 0;
      }
      
      idx = i;
      init();
    });

    function init() {
      if ($track.outerWidth() > $box.width()) {
        dir = 'x';
      }else if ($track.outerHeight() > $box.height()) {
        dir = 'y';
      } else {
        dir = null;
      }

      if (drager && drager.length > 0 && drager[0].vars.type != dir) {
        drager[0].kill();
        drager = null;
        gsap.set($track, {x: 0, y: 0});
      }

      if (!drager) {
        $item.removeClass('in out over');
      }
      
      if ($.utils.is_string(dir)) {
        if (!drager) {
          drager = Draggable.create($track, {
            type: dir,
            bounds: $box,
            inertia: true,
            lockAxis: true,
            zIndexBoost: false,
            dragResistance: 0.3,
            edgeResistance: 0.9,
            dragClickables: true,
            allowContextMenu: true,
            onClick: function (self) {
              gsap.killTweensOf('.tracker-track');
            },
            onDragEnd: function () {
              viewItems();
            },
            onThrowComplete: function () {
              if (isPage && !isRound) {
                if (dir == 'x') {
                  if (this.x == 0) {
                    $prev.addClass('disable');
                    $next.removeClass('disable');
                  } else if (this.x == this.minX) {
                    $next.addClass('disable');
                    $prev.removeClass('disable');
                  } else {
                    $prev.removeClass('disable');
                    $next.removeClass('disable');
                  }
                } else if (dir == 'y') {
                  if (this.y == 0) {
                    $prev.addClass('disable');
                    $next.removeClass('disable');                    
                  } else if (this.y == this.minY) {
                    $next.addClass('disable');
                    $prev.removeClass('disable');
                  } else {
                    $prev.removeClass('disable');
                    $next.removeClass('disable');
                  }
                }
              }
            }
          });
        } else {
          drager[0].update(true);
        }

        $prev.removeClass('disdrag');
        $next.removeClass('disdrag');
      } else {
        $prev.addClass('disdrag');
        $next.addClass('disdrag');
      }
      
      clickItem($item.eq(idx), true);
    }

    function viewItems() {
      $in = null, $out = null, $over = null;

      $item.removeClass('in out over');

      $in = $item.filter(function () {
        if (dir == 'x') {
          return $(this).offset().left >= $box.offset().left && $(this).offset().left + $(this).outerWidth() <= $box.offset().left + $box.width();
        } else if (dir == 'y') {
          return $(this).offset().top >= $box.offset().top && $(this).offset().top + $(this).outerHeight() <= $box.offset().top + $box.height();
        }
      }).addClass('in');

      $out = $item.not($in).addClass('out');

      $over = $out.filter(function () {
        if (dir == 'x') {
          return ($(this).offset().left < $box.offset().left && $(this).offset().left + $(this).outerWidth() > $box.offset().left) || ($(this).offset().left < $box.offset().left + $box.width() && $(this).offset().left + $(this).outerWidth() > $box.offset().left + $box.width());
        } else if (dir == 'y') {
          return ($(this).offset().top < $box.offset().top && $(this).offset().top + $(this).outerHeight() > $box.offset().top) || ($(this).offset().top < $box.offset().top + $box.height() && $(this).offset().top + $(this).outerHeight() > $box.offset().top + $box.height());
        }
      }).addClass('over');
    }

    function clickItem(item, dur) {
      if (item.length == 0 || (!dur && item.index() == idx)) {
        return;
      }

      item.trigger('click.tab');
      
      idx = item.index();
      
      if (!isRound && !isPage) {
        if (idx == 0) {
          $prev.addClass('disable');
        } else {
          $prev.removeClass('disable');
        }

        if (idx == $item.length - 1) {
          $next.addClass('disable');
        } else {
          $next.removeClass('disable');
        }
      }

      if (!item.hasClass('cur')) {
        item.addClass('cur').siblings().removeClass('cur');
      }
      
      if (!drager) {
        return;
      }

      var npos, bpos, ipos, dmin, tween1, tween2, tween3, gs,
        duration = dur ? 0 : 0.5;
      
      if (dir == 'x') {
        npos = gsap.getProperty($track[0], 'x');
        bpos = $box.offset().left + $box.width() / 2;
        ipos = item.offset().left + item.outerWidth() / 2;
        dmin = drager[0].minX;
        tween1 = { duration: duration, x: dmin };
        tween2 = { duration: duration, x: drager[0].maxX };
        tween3 = { duration: duration, x: '+=' + (bpos - ipos) };
      } else if(dir == 'y'){
        npos = gsap.getProperty($track[0], 'y');
        bpos = $box.offset().top + $box.height() / 2;
        ipos = item.offset().top + item.outerHeight() / 2;
        dmin = drager[0].minY;
        tween1 = { duration: duration, y: dmin };
        tween2 = { duration: duration, y: drager[0].maxY };
        tween3 = { duration: duration, y: '+=' + (bpos - ipos) };
      }      
      
      // drager[0].update(true);

      if (ipos > bpos) {
        if (dmin - npos + ipos - bpos > 0) {
          gs = gsap.to($track, tween1);
        } else {
          gs = gsap.to($track, tween3);
        }
      } else {
        if (npos + bpos - ipos > 0) {
          gs = gsap.to($track, tween2);
        } else {
          gs = gsap.to($track, tween3);
        }
      }

      if (duration > 0) {
        gs.eventCallback('onComplete', viewItems);        
      } else {
        viewItems();
      }
    }    
  });

});
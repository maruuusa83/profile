/* Copyright (c) All Rights reserved. 2018 Daichi Teruya */

/* data are written in data.js */

$(function(){
  $("header").css("height", $(window).height());

  // load contents
  render_paper('#journals-container', data["journals"]);
  render_epaper('#iconf-container', data["international_conf"]);
  render_paper('#dconf-container', data["domestic_conf"]);
  render_titleandyear('#prizes-container', data["prizes"]);
  render_titleandyear('#contests-container', data["contests"]);
  render_titleandyear('#exhibitions-container', data["exhibitions"]);
  render_titleandyear('#activities-container', data["activities"]);
  render_media('#presentations-container', data["presentations"]);
  render_media('#media-container', data["media"]);

  // nav bar
  var nav = $("nav");
  var article_offset = $("article").offset().top;

  if($(window).scrollTop() == 0){
    nav.css("display", "none");
  }

  $(window).scroll(function(){
    if ($(window).scrollTop() > 0){
      nav.slideDown("fast");
    }
    else {
      nav.slideUp("fast");
    }
  });

  $('a[href^="#"]').click(function(){
    var href = $(this).attr("href");
    console.log(href);
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, 500, "swing");

    if ($(window).width() < 768){
      $("#menu").slideUp();
    }

    return false;
  });

  $("#toggle").click(function(){
    console.log("hi");
    $("#menu").slideToggle();
    return false;
  });

  if ($(window).width() < 768){
    $("nav").css("width", $(window).width());
    console.log("hi");
  }

  $(window).resize(function(){
    if ($(window).width() > 768){
      $("#menu").show();
      $("nav").css("width", "100%");
    }
    else {
      $("nav").css("width", $(window).width());
    }
  });
});

function render_record($template, record){
  var keys = Object.keys(record);
  for (var i = 0; i < keys.length; i++){
    if (keys[i] == "url"){
      $('.' + keys[i], $template).attr("href", record[keys[i]]["url"]);
      $template = append_data($template, '.' + keys[i], record[keys[i]]["name"]);
      continue;
    }

    $template = append_data($template, '.' + keys[i], record[keys[i]]);
  }

  return $template;
}

function render_media(place, records){
  for (var i = 0; i < records.length; i++){
    var $template = get_template('#media-template');
    $template = render_record($template, records[i]);
    $template = append_data($template, '.number', "[" + (i + 1) + "]");

    $(place).append($template);
  }
}

function render_epaper(place, records){
  for (var i = 0; i < records.length; i++){
    var $template = get_template('#eresearch-template');

    $template = render_record($template, records[i]);
    $template = append_data($template, '.number', "[" + (i + 1) + "]");
    $template = append_data($template, '.title', "\"" + records[i]["title"] + "\"");

    $(place).append($template);
  }
}

function render_paper(place, records){
  for (var i = 0; i < records.length; i++){
    var $template = get_template('#research-template');

    $template = render_record($template, records[i]);
    $template = append_data($template, '.number', "[" + (i + 1) + "]");
    $template = append_data($template, '.title', "\"" + records[i]["title"] + "\"");

    $(place).append($template);
  }
}

function render_titleandyear(place, records){
  for (var i = 0; i < records.length; i++){
    var $template = get_template('#titleandyear-template');

    $template = render_record($template, records[i]);
    $template = append_data($template, '.number', "[" + (i + 1) + "]");

    $(place).append($template);
  }
}

function get_template(name){
  var $template = $(name).clone();
  return $template.removeAttr('id');
}

function append_data($template, to, text){
  $(to, $template).text("");
  $(to, $template).append("<span>" + text + "</span>");
  return $template;
}


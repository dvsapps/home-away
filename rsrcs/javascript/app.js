new Card({
    form: document.querySelector('.ccform'),
    container: '.card-wrapper'
});
jQuery('#billing').geocomplete();
jQuery(".continue_1").click(function() {
  if(stepOne()) {
    jQuery("#stepOne").removeClass("is-expanded");
    jQuery("#stepOne").addClass("is-editable is-collapsed js-containerizedCollapsed");
    jQuery("#stepTwo").removeClass("is-collapsed");
    jQuery("#stepTwo").addClass("is-expanded");
    jQuery(".edit-one").css("display", "inline");
    scrollto('#stepTwo');
  }


});

jQuery(".edit-one").click(function() {
  jQuery("#stepOne").removeClass("is-editable is-collapsed js-containerizedCollapsed");
  jQuery("#stepOne").addClass("is-expanded");

  jQuery("#stepTwo").removeClass("is-expanded");
  jQuery("#stepTwo").addClass("is-collapsed");

  jQuery("#stepThree").removeClass("is-expanded");
  jQuery("#stepThree").addClass("is-collapsed");
  scrollto('#stepOne');

});

jQuery(".continue_2").click(function() {
  if(stepTwo()) {
    jQuery("#stepTwo").removeClass("is-expanded");
    jQuery("#stepTwo").addClass("is-editable is-collapsed js-containerizedCollapsed");
    jQuery("#stepThree").removeClass("is-collapsed");
    jQuery("#stepThree").addClass("is-expanded");
    jQuery(".edit-two").css("display", "inline");
    scrollto('#stepThree');
  }

});

jQuery(".edit-two").click(function() {
  jQuery("#stepOne").addClass("is-editable is-collapsed js-containerizedCollapsed");
  jQuery("#stepOne").removeClass("is-expanded");

  jQuery("#stepTwo").addClass("is-expanded");
  jQuery("#stepTwo").removeClass("is-collapsed");

  jQuery("#stepThree").removeClass("is-expanded");
  jQuery("#stepThree").addClass("is-collapsed");
  scrollto('#stepTwo');

});
function scrollto(to) {
  var to = jQuery(to).offset();
  jQuery('html, body').stop().animate({ scrollTop: to.top }, 500);
}

function stepOne() {
  var fname = jQuery("#fname"), lname = jQuery("#lname"), email = jQuery("#email"), message = jQuery("#message");
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
//  alert(filter.test(email.val()));
  if(fname.val() == "") {
    jQuery(".floating-label.fname").addClass("has-error");
    jQuery(".fnerr").html('<span style="" class="help-block js-helpBlock">'+first_name_is_required+'</span>');
    scrollto('#stepOne');
    return;
  } else {
    jQuery(".floating-label.fname").removeClass("has-error");
    jQuery(".fnerr").html('')
  }

  if(lname.val() == "") {
    jQuery(".floating-label.lname").addClass("has-error");
    jQuery(".lnerr").html('<span class="help-block js-helpBlock">'+last_name_is_required+'</span>');
    scrollto('#stepOne');
    return;
  } else {
    jQuery(".floating-label.lname").removeClass("has-error");
    jQuery(".lnerr").html('')
  }
  if ((filter.test(email.val())) === false) {
    jQuery(".floating-label.email").addClass("has-error");
    jQuery(".emlerr").html('<span style="" class="help-block js-helpBlock">'+valid_email_is_required+'</span>');
    scrollto('#stepOne');
    return;
  } else {
    jQuery(".floating-label.email").removeClass("has-error");
    jQuery(".emlerr").html('');
  }

  if(message.val() == "") {
    jQuery(".text-box.messsage").addClass("has-error");
    jQuery(".mserr").addClass("help-block js-helpBlock").css("display", "block").html(rquires_contact);
    scrollto('#stepOne');
    return;
  } else {
    jQuery(".text-box.messsage").removeClass("has-error");
    jQuery(".mserr").removeClass("help-block js-helpBlock").css("display", "none").html("");
  }

  return true;

}
function stepTwo() {
  var checkbox = jQuery("#checkbox");
  if(checkbox.is(':checked')) {
    jQuery(".rental-agreement-checkbox").removeClass("has-error");
    jQuery(".checkbox.checkbox-group").removeClass("has-error");
    jQuery(".cherr").html('');

  } else {
    jQuery(".rental-agreement-checkbox").addClass("has-error");
    jQuery(".checkbox.checkbox-group").addClass("has-error");
    jQuery(".cherr").html('<div class="js-helpBlock help-block" data-at-id="rules-and-policies-agreement-error">'+rental_agreement_must_be_checked+' <i class="icon-alert icon-white pull-right" aria-hidden="true"></i></div>');
    scrollto('#rules-and-policies');
    return;
  }
  return true;
}
(function ($) {
    $.fn.replaceClass = function (pFromClass, pToClass) {
        return this.removeClass(pFromClass).addClass(pToClass);
    };
}(jQuery));

jQuery(document).ready(function() {
  var button = jQuery(".link.js-detailsToggleLink, .HD");
    jQuery(button).click(function() {
      var text = jQuery.trim(jQuery(".replace").html());
      text = (text == str_view ? str_hide : str_view);
      jQuery(".replace").html(text);
    //  alert(text);
        if(text == str_hide) {
          addCLS()
        } else {
          removeCLS()
        }
    });
});

  jQuery(".price-quote-header-hide-details-container").click(function() {
    removeCLS()
  });


  function addCLS() {
    jQuery('.quote-sticky-header-parent-container').replaceClass('inactive','height-100 affix');
    jQuery('.quote-sticky-header').addClass('height-100');
    jQuery('.quote-sticky-header-details ').addClass('height-100').css('top','46px');
  }
  function removeCLS() {
    jQuery('.quote-sticky-header-details ').removeClass('height-100').css('top','-1000px');
    jQuery('.quote-sticky-header-parent-container').replaceClass('height-100 affix','inactive');
    jQuery('.quote-sticky-header').removeClass('height-100');

  }
  function isEmpty( el ){
      return !jQuery.trim(el)
  }

  jQuery("#submit-form-cc").click(function() {
    var ccdata = {
      name: jQuery("#name").val(),
      number: jQuery("#number").val(),
      expiry: jQuery("#expiry").val(),
      cvc: jQuery("#cvc").val(),
      cctype: jQuery("#cctype").val(),
      billing: jQuery("#billing").val(),
      ammount: ammount,
      uid: uid
    }
    var ii = 0;
    jQuery.each(ccdata, function(i, v ) {
      if (isEmpty(v)) {
        jQuery("#" + i).closest( "floating-label-input" ).addClass("has-error");

      } else { ii++;
          jQuery("#" + i).closest( "floating-label-input" ).removeClass("has-error");
        }
     });
      if(ii !== 8) {
        scrollto('#stepThree');
        jQuery("#ccempty").css("color", "#f33508");
        return false;
      } else {
        jQuery("#ccempty").css("color", "#70767a");
        //jQuery("#ccempty").html("Your card will not be charged until your booking request is accepted.");
        jQuery(this).attr("disabled" , true);
        jQuery(this).html('<span>'+loading+'.. </span>');

        jQuery.post(savecc, ccdata, function(data, status) {
          if(data == "success") {
            jQuery("#offlineErr").css("display", "block");
            jQuery("#submit-request-cc").css("display", "none");
            jQuery("#submit-request-booking").css("display", "block");
            jQuery("#submit-form").html('<span>'+book_offline+'</span>').css("display", "block");
            jQuery(".secure-payment-message-container").css("display", "none");
            jQuery(".form-container").css("display", "none");
            jQuery(".card-wrapper").css("display", "none");
            jQuery(".noccdiv").css("display", "none");
            scrollto('#stepThree');
          } else if(data == "crecaebine") {
            alert("crecaebine");
            scrollto('#stepThree');
          } else if(data == "duplicate") {
            jQuery("#ccempty").css("color", "#f33508").html(card_could_not_be_processed);
            jQuery("#submit-form-cc").attr("disabled" , false).html('<span>'+try_again+'</span>');
            scrollto('#stepThree');
          } else {
            jQuery("#ccempty").css("color", "#f33508").html(card_could_not_be_processed);
            jQuery("#submit-form-cc").attr("disabled" , false).html('<span>'+try_again+'</span>');
            scrollto('#stepThree');
          }


        });
      }
  });
  jQuery(".pointer.nocc").click(function() {
    scrollto('#stepThree');
    jQuery("#ccempty").html(you_will_not_be_charged).css("color", "#70767a");
    jQuery(".demo-container").hide('slow');
    jQuery("#submit-request-cc").css("display", "none");
    jQuery("#submit-request-booking").css("display", "block");
  });

  jQuery("#submit-form").click(function() {
    jQuery("#submit-form").html('<span>'+ str_booking +' ..</span>');
    var guest_name = jQuery(".js-fname").val() + ' ' + jQuery(".js-lname").val();
    var guest_email = jQuery(".js-email").val();
      jQuery.post(savebooking, {
        roomid: roomid,
        resid: resid,
        property: property,
        image: image,
        address: address,
        arrival: arrival,
        departure: departure,
        guests: guests,
        nights: nights,
        rate: rate,
        currency: currency,
        symbol: symbol,
        deposit: deposit,
        guest_name: guest_name,
        guest_email: guest_email,
        ammount: ammount,
        ipv4: ipv4,
        ipv4data: ipv4data,
        app: app,
        hid: hid,
        pid: pid,
        uid: uid,
        lang: lang
      }, function(data, status) {
        var confirmation = path + "confirmation/" + roomid + "/" + resid;
          if(data == "success") {
            jQuery(location).attr('href', confirmation);
          } else if(data == "crecaebine") {
            jQuery(location).attr('href', confirmation);
          } else if(data == "duplicate") {
            scrollto('#stepThree');
            jQuery("#offlineErr").hide();
            jQuery("#duplicateErr").show("slow");
            jQuery("#submit-form").hide();
          }
      });
  });

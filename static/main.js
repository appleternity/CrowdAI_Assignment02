$(document).ready(function() {
    /***************** Variables *************/
    var lock_time = 15;
    var time_lock;
    var task_id;
    var current_btn = "#next_step_btn";
    var temp;

    /***************** Function *************/
    var count_down = function() {
        time_lock --;
        if (time_lock != 0) {
            temp = $(current_btn).text() || $(current_btn).val();
            temp = temp.replace(/\(\d+\)/gi, "("+time_lock+")");
            $(current_btn).text(temp);
            $(current_btn).val(temp);
        } else {
            temp = $(current_btn).text() || $(current_btn).val();
            temp = temp.replace(/\(\d+\)/gi, "").trim();
            $(current_btn).text(temp);
            $(current_btn).val(temp);
            clearInterval(task_id);
            $(current_btn).attr("disabled", false);
            $(current_btn).removeClass("btn-secondary");
            $(current_btn).addClass("btn-info");
        }
    };

    var sentence_count = function() {
        var text = $("#story").val();
        $("#word_count").text(text.length);

        var sentences = text.split(/\.|\?|\!/);
        var count = 0;
        for (var i = 0; i < sentences.length; i++) {
            if (sentences[i].length > 15) {
                count ++;
            }
        }
        $("#sent_count").text(count);

        // check length
        if (text.length >= 80) {
            $("#word_count").removeClass("below");
            $("#word_count").addClass("above");
        } else {
            $("#word_count").removeClass("above");
            $("#word_count").addClass("below");
        }

        if (count >= 5) {
            $("#sent_count").removeClass("below");
            $("#sent_count").addClass("above");
        } else {
            $("#sent_count").removeClass("above");
            $("#sent_count").addClass("below");
        }
    };

    /***************** Function *************/
    $(".img_wrapper_func").click(function(evt) {
        var element = $(evt.target).parent();
        var im_id = element.attr("im_id");
        $(".img_wrapper_func").removeClass("img_wrapper_active");
        element.addClass("img_wrapper_active");
        $("#display_img").attr("src", im_id);
    }); 

    $("#go_btn").click(function() {
        $("#step1_panel").show(1000, function() {
            $(document).scrollTop($("#step1_panel").offset().top);
        });
        $("#go_btn").hide(200);
        time_lock = lock_time;
        $("#next_step_btn").text("Next Step ("+time_lock+")");
        task_id = setInterval(count_down, 1000);
    });

    $("#next_step_btn").click(function() {
        $("#instruction_2").show(1000, function() {
            $(document).scrollTop($("#instruction_2").offset().top);
        });
        $("#next_step_btn").hide(200);
    });

    $("#go_btn_2").click(function() {
        $("#step2_panel").show(1000, function() {
            $(document).scrollTop($("#step2_panel").offset().top);
        });
        $("#go_btn_2").hide(200);
        time_lock = lock_time;
        current_btn = "#submit_btn";
        $("#submit_btn").val("Submit ("+time_lock+")");
        task_id = setInterval(count_down, 1000);
        setInterval(sentence_count, 1000);
    })


    // is assigntmentId is a URL parameter
    if((aid = gup("assignment_id"))!="" && $(form_selector).length>0) {

        // If the HIT hasn't been accepted yet, disabled the form fields.
        if(aid == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            $('input,textarea,select').attr("DISABLED", "disabled");
        }

        // Add a new hidden input element with name="assignment_id" that
        // with assignment_id as its value.
        // var aid_input = $("<input type='hidden' name='assignment_id' value='" + aid + "'>").appendTo($(form_selector));
        $("#mturk-assignment_id").val(aid);

        // Make sure the submit form's method is POST
        $(form_selector).attr('method', 'POST');

        // Set the Action of the form to the provided "turkSubmitTo" field
        if((submit_url=gup("turkSubmitTo"))!="") {
            $(form_selector).attr('action', submit_url + '/mturk/externalSubmit');
        }
    }
});

// selector used by jquery to identify your form
var form_selector = "#mturk_form";

// function for getting URL parameters
function gup(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return "";
  else return unescape(results[1]);
}

function validateForm() {
    return true;
}

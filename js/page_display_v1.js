var show_worksheet = function(page_id){
    let obj = $("ul.nav#worksheets li.nav-item a.active");
    obj.removeAttr("aria-current");
    obj.removeClass("active");
    $("ul.nav#worksheets li.nav-item#"+page_id+" a").addClass("active");
    $("ul.nav#worksheets li.nav-item#"+page_id+" a").attr("aria-current","page");
    $("div.worksheet").hide();
    $("div.worksheet#"+page_id).show();
};

$(document).ready(function(){
    $("ul.nav#worksheets li.nav-item").click(function(){
        let page_id = $(this).attr("id");
        show_worksheet(page_id);
    });
});

var show_alert = function(msg){
    $("div#alert").html(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert" id="alert_msg">
        <strong>Warning!</strong> ${msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`);
}
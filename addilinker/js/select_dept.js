/**
 * Created by leojay on 16/8/15.
 */
$(document).ready(function () {

});

//初始化选择器
function initSelect(jsonUrl) {
    $.getJSON(jsonUrl, function (data) {
        //设置系别
        var sept = data.SEPT;
        for (item in sept) {
            var value = $("<option>").val(item).text(item);
            $("#select_step").append(value);
        }

        //设置专业
        function setSpe() {
            var specialty = $("#select_step").val();
            $("#select_specialty").empty();
            for (item in sept[specialty]) {
                var value = sept[specialty][item];
                var option = $("<option>").val(value).text(value);
                $("#select_specialty").append(option);
            }
        }
        setSpe();
        $("#select_step").change(setSpe);

        //设置部门类别
        var dep = new Array("编辑部","设计部","科技部");
        for(item in dep){
            value = $("<option>").val(dep[item]).text(dep[item]);
            $("#select_department").append(value);
        }

    });

}

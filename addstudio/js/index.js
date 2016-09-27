/**
 * Created by leojay on 16/9/27.
 */
$(document).ready(function () {
    initSelect("./res/init2.json");
    //submitData();
});

//初始化选择器
function initSelect(jsonUrl) {
    $.getJSON(jsonUrl, function (data) {
        //设置系别
        var sept = data.SEPT;
        var o1 = $("<option>").val(0).text("请选择");
        $("#select_step").append(o1);
        for (var item in sept) {
            var value = $("<option>").val(item).text(item);
            $("#select_step").append(value);
        }

        //设置专业
        function setSpe() {
            var specialty = $("#select_step").val();
            $("#select_specialty").empty();
            var o = $("<option>").val(0).text("请选择" + (specialty == 0 ? "系别" : "专业"));
            $("#select_specialty").append(o);
            if (specialty != 0) {
                for (item in sept[specialty]) {
                    var value = sept[specialty][item];
                    var option = $("<option>").val(value).text(value);
                    $("#select_specialty").append(option);
                }
            }
        }

        setSpe();
        $("#select_step").change(setSpe);

        //设置部门类别
        var dep = new Array("还没想好", "编辑部", "设计部", "科技部");
        for (item in dep) {
            value = $("<option>").val(dep[item]).text(dep[item]);
            $("#select_department").append(value);
        }

    });

}


//数据提交
function submitData() {
    var isTrue = isInput();
    if (isTrue) {
        $("#submit_state").css("display", "inline");
        var myname = $("#formName").val();
        var sex = $("#formsex").val();
        var place = $("#formPlace").val();
        var phone = $("#formPhone").val();
        var qq = $("#formQQ").val();
        var email = $("#formEmail").val();
        var speciality = $("#formSpeciality").val();

        var studentId = $("#tab_studyid").val();
        var build = $("#tab_live").val();
        var room = $("#tab_live_room").val();
        var step = $("#select_step").val();
        var spec = $("#select_specialty").val();
        var classroom = $("#tab_classroom").val();
        var coacher = $("#tab_coacher").val();
        var coacherPhone = $("#tab_coacher_phone").val();

        var selectDept = $("#select_department").val();

        Bmob.initialize("a6fb4902661714cada9d913d2e753691", "6cb99193237e5a9c7d2b01f4e7e17d36");
        var Person = Bmob.Object.extend("person");
        var p = new Person();
        p.set("name", myname);
        p.set("sex", sex);
        p.set("place", place);
        p.set("phone", phone);
        p.set("qq", qq);
        p.set("email", email);
        p.set("speciality", speciality);
        p.set("studentId", studentId);
        p.set("build", build);
        p.set("room", room);
        p.set("step", step);
        p.set("spec", spec);
        p.set("classroom", classroom);
        p.set("coacher", coacher);
        p.set("coacherPhone", coacherPhone);
        p.set("selectDept", selectDept);
        p.save(null, {
            success: function (object) {
                alert("你已成功提交你的信息!感谢你的合作");
                $("#submit_state").css("display", "none");
            },
            error: function (model, error) {
                alert("提交失败,在提交一遍好么? \n 错误信息:" + error);
                $("#submit_state").css("display", "none");
            }
        });
    }
}

//输入框判断
function isInput() {
    var isTrue = false;
    var myname = $("#formName");
    var sex = $("#formSex");
    var place = $("#formPlace");
    var phone = $("#formPhone");
    var qq = $("#formQQ");
    var email = $("#formEmail");
    var speciality = $("#formSpeciality");

    var studentId = $("#tab_studyid");
    var build = $("#tab_live");
    var room = $("#tab_live_room");
    var step = $("#select_step");
    var spec = $("#select_specialty");
    var classroom = $("#tab_classroom");
    var coacher = $("#tab_coacher");
    var coacherPhone = $("#tab_coacher_phone");

    var selectDept = $("#select_department");

    if (noEmptyTag(myname)) {
        if (noEmptyTag(sex) && sex.val() != "0") {
            if (noEmptyTag(phone) && noEmptyTag(qq) && noEmptyTag(studentId)) {
                if (step.val() != 0) {
                    if (spec.val() != 0) {
                        if (noEmptyTag(classroom) && noEmptyTag(coacher)) {
                            isTrue = true;
                        }
                    } else {
                        spec.focus();
                    }
                } else {
                    step.focus();
                }
            }
        } else {
            sex.focus();
        }
    }

    if (!isTrue) {
        alert("请补全必填项目!!");
    }

    return isTrue;
}
//非空判断
function noEmptyTag(tag) {
    if (tag.val() != null && tag.val() != "" && tag.val() != "undefined") {
        return true;
    } else {
        $(tag).focus();
        return false;
    }
}
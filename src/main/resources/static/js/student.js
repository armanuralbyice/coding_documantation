function submitStudentData() {
    var message = "";
    if (!validateInputField("name", "Name")) {
        return;
    }
    if (!validateInputField("email", "Email")) {
        return;
    }
    if (!validateInputField("mobile", "Mobile")) {
        return;
    }
    if (!validateInputField("address", "Address")) {
        return;
    }
    message += "<br>Name: " + $('#name').val() +
        "<br>Email: " + $('#email').val() + "<br>Mobile: " + $('#mobile').val() + "<br>Address: " + $('#address').val();
    $.confirm({
        title: 'Please Confirm the following Data!',
        content: message,
        buttons: {
            confirm: {
                btnClass: 'btn-success',
                keys: ['enter'],
                action: function () {
                    startLoading();
                    $.ajax({
                        type: "POST",
                        url: rootPath + "/student/save",
                        data: $('form[name=formSubmit]').serialize(),
                        success: function (response) {
                            hideLoading()
                            if (response != null) {
                                if (response.statusCode < 400) {
                                    showRecordCreationSuccess();
                                    setTimeout(function () {
                                        reloadPage();
                                    }, 5000);
                                } else {
                                    showError(response.message);

                                }
                            } else {
                                showError('Unknown Error');
                            }
                        }
                    })
                }
            },
            cancel: {
                btnClass: 'btn-warning',
                action: function () {
                    showInformation('Operation cancelled!');
                }
            }
        }
    })
}

function loadStudentDataList() {
    var url = rootPath + '/student/all';
    startLoading();
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            if (response !== null && response.statusCode < 400 && response.content !== null && response.content.length > 0) {
                $('#myTable_wrapper').attr("hidden", "hidden");
                var tableHead = "<thead id='theadUser'></thead>" +
                    "<tbody id='tbodyUser'></tbody>"
                $('#myTable').html(tableHead);
                $('#myTable_wrapper').removeAttr("hidden", "hidden");
                destroyTable('myTable');
                var headArr = ['#', 'Name', 'Email', 'Mobile', 'Address', 'Action'];
                createHeader('theadUser', headArr);
                prepareStudentDataGrid(response.content, "tbodyUser");
                createWithButton('myTable', [0, 1, 2, 3, 4], "Student List", [5, 10, 15, 20, 'All'])
            }
            hideLoading();
        }
    });
}

function prepareStudentDataGrid(response, tbodyUser) {
    var count = 0;
    var len = response.length;
    for (var i = 0; i < len; i++) {
        count++;
        var trTableBody = $('<tr class="text-center"></tr>').appendTo($('#' + tbodyUser));
        $('<td>' + count + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].name) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].email) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].mobile) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].address) + '</td>').appendTo(trTableBody);
        $('<td><button class="btn btn-info" type="button" name="edit" value="'
            + response[i].id + '" onclick="setupStudentData(' + response[i].id + ');" ><b><i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
            'Edit</b></button>&nbsp;<button class="btn btn-danger" type="button" name="UpazillaInfo" value="' + response[i].id +
            '" onclick="deleteStudentData(' + response[i].id + ');" ><b><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</b></button></td>').appendTo(trTableBody);
    }
}

function setupStudentData(id){
    startLoading();
    $.ajax({
        type: "GET",
        url: rootPath+"/student/" + id,
        success: function (response) {
            hideLoading();
            if (response !== null && response.content !== null) {
                $('#id').val(response.content.id);
                $('#name').val(response.content.name);
                $('#email').val(response.content.email);
                $('#mobile').val(response.content.mobile);
                $('#address').val(response.content.address);
            }
        }
    });
}

function deleteStudentData(id){
    $.confirm({
        animationBounce: 2.5,
        title: 'CAUTION',
        content: '<div class="confirmIconDiv"><label><i class="fa fa-exclamation-triangle fa-5x faExclamatinTriangle" aria-hidden="true"></i></label> ' +
            '</div><div class="confirmTextDiv"><label class="confirm-text">Are you sure to delete it?</label></div>',
        buttons: {
            ok: {
                btnClass: 'btn-primary actionAccept',
                keys: ['enter'],
                action: function () {
                    startLoading();
                    $.ajax({
                        type: "DELETE",
                        url: rootPath+"/student/" + id,
                        success: function (response) {
                            hideLoading();
                            if (response != null) {
                                if (response.statusCode === 200) {
                                    showSuccess('Record deleted successfully');
                                    loadStudentDataList();
                                } else {
                                    showError(response.message);
                                }
                            } else {
                                showError('Record Not found');
                            }
                        }
                    });
                }
            },
            close: {
                btnClass: 'btn-danger actionReject',
                action: function () {
                    showError('Your Action Canceled');
                }
            }
        }
    });
}
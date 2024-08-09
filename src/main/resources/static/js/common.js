var rootPath = window.location.protocol + "//" + window.location.host;

/*
function loadThanaList(id) {
    var distId = $('#' + id).val();
    var url = rootPath + '/center/loadThanaByDistrict?distId=' + distId;
    $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {
            var html = '<option value="">--Select Upazila--</option>';
            var len = data.length;
            for (var i = 0; i < len; i++) {
                html += '<option value="' + data[i].id + '">'
                    + data[i].thanaName + ' (' + data[i].thanaBang + ') </option>';
            }
            html += '</option>';
            $('#thana').html(html);
        },
        error: function (e) {
            // alert('Error:' + e);
        }
    });
}

function loadCenterList(replaceId) {
    var thana = null;
    if ($('#thana').length > 0) {
        thana = $('#thana').val();
    } else {
        thana = $('#thana1').val();
    }
    if (thana === null || thana === '') {
        return;
    }
    var url = rootPath + '/center/loadCenterByThana?thanaId=' + thana;
    if ($('#district').length > 0) {
        url += '&distId=' + $('#district').val();
    }
    $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {
            var html = '<option value="">--Select Center--</option>';
            var len = data.length;
            for (var i = 0; i < len; i++) {
                html += '<option value="' + data[i].id + '">'
                    + data[i].name + ' (' + data[i].address + ') </option>';
            }
            html += '</option>';
            $('#' + replaceId + '').html(html);
        },
        error: function (e) {
            // alert('Error:' + e);
        }
    });
}

function loadCenterDtos(isAll) {
    var thanaId = null;
    if ($('#thana').length > 0) {
        thanaId = document.getElementById('thana').value;
    } else {
        thanaId = document.getElementById('thana1').value;
    }
    var districtId = null;
    if ($('#district').length > 0) {
        districtId = document.getElementById('district').value;
    }
    if (!isAll && (thanaId === '' || thanaId == null)) {
        return;
    }
    var url = rootPath + '/center/loadCenterDtoListByThana?thanaId=' + thanaId;
    if (districtId !== null) {
        url += '&distId=' + districtId
    }
    if (isAll) {
        url = rootPath + '/center/loadCenterDataAll';
    }
    startLoading();
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            $('#myTable_wrapper').attr("hidden", "hidden");
            var tableHead = "<thead id='theadUser'></thead>" +
                "<tbody id='tbodyUser'></tbody>"
            $('#myTable').html(tableHead);
            if (response != null && response.length > 0) {
                $('#myTable_wrapper').removeAttr("hidden", "hidden");
                destroyTable('myTable');
                var headArr = ['#', 'Name', 'Address', 'Upazilla/Thana', 'No. of Seats', 'Action'];
                createHeader('theadUser', headArr);
                prepareCenterDataGrid(response, "tbodyUser");
                if(isAll){
                    createWithButton('myTable', [0, 1, 2, 3, 4], "Center List of " + response[0].district.distName + '(Phase: ' + response[0].examPhase.phase +')', [5, 10, 15, 20, 'All']);
                }else {
                    createWithButton('myTable', [0, 1, 2, 3, 4], "Center List of " + response[0].thana.thanaName + '(Phase: ' + response[0].examPhase.phase +')', [5, 10, 15, 20, 'All']);
                }

            }
            hideLoading();
        }
    });
}

function loadCenterPersonnelList() {
    var district = null;
    if ($('#district').length > 0) {
        district = $('#district').val();
    }
    var url = rootPath + '/centerPersonnel/all';
    if(district !== null && district !== ''){
        url += '?distId=' + district;
    }
    startLoading();
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            $('#myTable_wrapper').attr("hidden", "hidden");
            var tableHead = "<thead id='theadUser'></thead>" +
                "<tbody id='tbodyUser'></tbody>"
            $('#myTable').html(tableHead);
            if (response != null && response.length > 0) {
                $('#myTable_wrapper').removeAttr("hidden", "hidden");
                destroyTable('myTable');
                var headArr = ['#', 'Center', 'Chief', 'Teacher 1',  'Teacher 2', 'Upazilla/Thana'];
                createHeader('theadUser', headArr);
                prepareCenterPersonnelDataGrid(response, "tbodyUser");
                createWithButton('myTable', [0, 1, 2, 3, 4, 5], "Center Personnel List", [5, 10, 15, 20, 'All'])
            }
            hideLoading();
        }
    });
}

function prepareCenterPersonnelDataGrid(response, tbodyUser) {
    var count = 0;
    var len = response.length;
    for (var i = 0; i < len; i++) {
        count++;
        var trTableBody = $('<tr class="text-center"></tr>').appendTo($('#' + tbodyUser));
        $('<td>' + count + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].center.name) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].centerChiefName) + '<br>' +checkValue(response[i].centerChiefDesignation)+ '<br>'+checkValue(response[i].centerChiefMobile) + '<br>' +checkValue(response[i].centerChiefEmail)+ '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].seniorTeacher1Name) + '<br>' +checkValue(response[i].seniorTeacher1Designation)+ '<br>'+checkValue(response[i].seniorTeacher1Mobile)+ '<br>'+checkValue(response[i].seniorTeacher1Email) + ' </td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].seniorTeacher2Name) + '<br> ' +checkValue(response[i].seniorTeacher2Designation)+ '<br>' + checkValue(response[i].seniorTeacher2Mobile) + '<br>' + checkValue(response[i].seniorTeacher2Email) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].center.thana.thanaName) + '</td>').appendTo(trTableBody);
    }
}
function prepareCenterDataGrid(response, tbodyUser) {
    var count = 0;
    var len = response.length;
    for (var i = 0; i < len; i++) {
        count++;
        var trTableBody = $('<tr class="text-center"></tr>').appendTo($('#' + tbodyUser));
        $('<td>' + count + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].name) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].address) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].thana.thanaName) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].noOfSeats) + '</td>').appendTo(trTableBody);
        $('<td><button class="btn btn-info" type="button" name="location" value="' + response[i].id + '" onclick="setupCenterData(' + response[i].id + ');" ><b><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</b></button>&nbsp;<button class="btn btn-danger" type="button" name="UpazillaInfo" value="' + response[i].id + '" onclick="deleteCenterData(' + response[i].id + ');" ><b><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</b></button></td>').appendTo(trTableBody);
    }
}

function loadBuildingDropdown(replaceId){
    var center = document.getElementById('center').value;
    if (center === '' || center == null) {
        return;
    }
    var url = rootPath + '/building/allByCenter?centerId=' + center;
    startLoading();
    $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {
            var html = '<option value="">--Select Building--</option>';
            var len = data.length;
            for (var i = 0; i < len; i++) {
                html += '<option value="' + data[i].id + '">'
                    + data[i].buildingNo + ' (' + data[i].buildingName + ') </option>';
            }
            html += '</option>';
            $('#' + replaceId + '').html(html);
            hideLoading();
        }
    });
}

function loadBuildingDtos(isAll) {
    var center = document.getElementById('center').value;
    if (!isAll && (center === '' || center == null)) {
        return;
    }
    var url = rootPath + '/building/allByCenter?centerId=' + center;
    if (isAll) {
        url = rootPath + '/building/allByCenter';
    }
    startLoading();
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            $('#myTable_wrapper').attr("hidden", "hidden");
            var tableHead = "<thead id='theadUser'></thead>" +
                "<tbody id='tbodyUser'></tbody>"
            $('#myTable').html(tableHead);
            if (response != null && response.length > 0) {
                $('#myTable_wrapper').removeAttr("hidden", "hidden");
                destroyTable('myTable');
                var headArr = ['#', 'Building No', 'Building Name', 'Center Name', 'Upazilla/Thana', 'Action'];
                createHeader('theadUser', headArr);
                prepareBuildingDataGrid(response, "tbodyUser");
                createWithButton('myTable', [0, 1, 2, 3, 4], "Building info List", [5, 10, 15, 20, 'All'])
            }
            hideLoading();
        }
    });
}

function prepareRoomDataGrid(response, tbodyUser) {
    var count = 0;
    var len = response.length;
    for (var i = 0; i < len; i++) {
        count++;
        var trTableBody = $('<tr class="text-center"></tr>').appendTo($('#' + tbodyUser));
        $('<td>' + count + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].centerName) + ' (' +  checkValue(response[i].centerAddress) + ')</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].buildingNo) + ' (' +  checkValue(response[i].buildingName) + ')</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].floorNo) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].roomNo) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].totalNoOfSeats) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].thanaName) + '</td>').appendTo(trTableBody);
        $('<td><button class="btn btn-info" type="button" name="location" value="' + response[i].id + '" onclick="setupRoomData(' + response[i].id + ');" ><b><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</b></button>&nbsp;<button class="btn btn-danger" type="button" name="UpazillaInfo" value="' + response[i].id + '" onclick="deleteRoomData(' + response[i].id + ');" ><b><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</b></button></td>').appendTo(trTableBody);
    }
}

function prepareBuildingDataGrid(response, tbodyUser) {
    var count = 0;
    var len = response.length;
    for (var i = 0; i < len; i++) {
        count++;
        var trTableBody = $('<tr class="text-center"></tr>').appendTo($('#' + tbodyUser));
        $('<td>' + count + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].buildingNo) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].buildingName) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].centerName) + '</td>').appendTo(trTableBody);
        $('<td>' + checkValue(response[i].thanaName) + '</td>').appendTo(trTableBody);
        $('<td><button class="btn btn-info" type="button" name="location" value="' + response[i].id + '" onclick="setupBuildingData(' + response[i].id + ');" ><b><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</b></button>&nbsp;<button class="btn btn-danger" type="button" name="UpazillaInfo" value="' + response[i].id + '" onclick="deleteBuildingData(' + response[i].id + ');" ><b><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</b></button></td>').appendTo(trTableBody);
    }
}

function loadRoomList(isAll) {
    var url;
    if(isAll){
        url = rootPath + '/room/getAllByCenter';
    }else {
        var center = $('#center').val();
        if (center === null || center === '') {
            return;
        }
        url = rootPath + '/room/getAllByCenter?centerId=' + center;
    }
    startLoading();
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            $('#myTable_wrapper').attr("hidden", "hidden");
            var tableHead = "<thead id='theadUser'></thead>" +
                "<tbody id='tbodyUser'></tbody>"
            $('#myTable').html(tableHead);
            if (response != null && response.length > 0) {
                $('#myTable_wrapper').removeAttr("hidden", "hidden");
                destroyTable('myTable');
                var headArr = ['#', 'Center Name', 'Building No.', 'Floor No.', 'Room No./Name', 'No. of Seats', 'Upazilla/Thana', 'Action'];
                createHeader('theadUser', headArr);
                prepareRoomDataGrid(response, "tbodyUser");
                createWithButton('myTable', [0, 1, 2, 3, 4, 5, 6], "Room List", [5, 10, 15, 20, 'All'])
            }
            hideLoading();
        }
    });
}


function loadThana(id) {
    if ($('#district').length > 0 && $('#district').val() !== "") {
            loadThanaList(id);
    }
}

function showCenter() {
    if($('#center').val() !== ''){
        $('#centerDisplayDiv').show();
        $('#centerGet').text($("#center option:selected").text());
        $('#centerGet').fadeIn();
    }else {
        $('#centerDisplayDiv').hide();
    }
}

function showBuilding() {
    if($('#building').val() !== ''){
        $('#buildingDisplayDiv').show();
        $('#buildingGet').text($("#building option:selected").text());
        $('#buildingGet').fadeIn();
    }else {
        $('#buildingDisplayDiv').hide();
    }
}

function showSuggestion() {
    var userName = document.getElementById('userName').value;
    var userId = null;
    if (document.getElementById('id') !== null) {
        userId = document.getElementById('id').value;
    } else {
        userId = 0;
    }
    var roleName = document.getElementById('roleName').value;
    if (userName != null && userName != "") {
        var url = rootPath + '/admin/getUserNameSuggestion?userName=' + userName + '&userId=' + userId + '&roleName=' + roleName;
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                $('#userNameSug').text(data);
                $('#userNameSug').fadeIn();
            },
            error: function (e) {
                // alert('Error:' + e);
            }
        });
    }
}

function disableActions(element) {
    var id = element.id
    var url = rootPath + '/actions/disable';
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            if (data.toString() == "disable now") {
                document.getElementById(id).setAttribute("disabled", "disabled");
                if (document.getElementById(id).hasAttribute("href")) {
                    document.getElementById(id).removeAttribute("href");
                }
                if (document.getElementById(id).hasAttribute("onclick")) {
                    document.getElementById(id).removeAttribute("onclick");
                }
            }
        },
        error: function (e) {
            // alert('Error:' + e);
        }
    });
}


function checkDuplicateCenterPersonnelEntry() {
    var centerId = document.getElementById('center').value;
    if (centerId != null && centerId != "") {
        var url = rootPath + '/centerPersonnel/isExist?centerId=' + centerId;
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                if (data != null) {
                    $('#id').val(data.id);
                    $('#centerChiefName').val(data.centerChiefName);
                    $('#centerChiefMobile').val(data.centerChiefMobile);
                    $('#centerChiefDesignation').val(data.centerChiefDesignation);
                    $('#centerChiefEmail').val(data.centerChiefEmail);
                    $('#seniorTeacher1Name').val(data.seniorTeacher1Name);
                    $('#seniorTeacher1Mobile').val(data.seniorTeacher1Mobile);
                    $('#seniorTeacher1Designation').val(data.seniorTeacher1Designation);
                    $('#seniorTeacher1Email').val(data.seniorTeacher1Email);
                    $('#seniorTeacher2Name').val(data.seniorTeacher2Name);
                    $('#seniorTeacher2Mobile').val(data.seniorTeacher2Mobile);
                    $('#seniorTeacher2Designation').val(data.seniorTeacher2Designation);
                    $('#seniorTeacher2Email').val(data.seniorTeacher2Email);
                }else {
                    $('#id').val("");
                    $('#centerChiefName').val("");
                    $('#centerChiefMobile').val("");
                    $('#centerChiefDesignation').val("");
                    $('#centerChiefEmail').val("");
                    $('#seniorTeacher1Name').val("");
                    $('#seniorTeacher1Mobile').val("");
                    $('#seniorTeacher1Designation').val("");
                    $('#seniorTeacher1Email').val("");
                    $('#seniorTeacher2Name').val("");
                    $('#seniorTeacher2Mobile').val("");
                    $('#seniorTeacher2Designation').val("");
                    $('#seniorTeacher2Email').val("");
                }
            },
            error: function (e) {
                // alert('Error:' + e);
            }
        });
    }else {
        $('#id').val("");
        $('#centerChiefName').val("");
        $('#centerChiefMobile').val("");
        $('#centerChiefDesignation').val("");
        $('#centerChiefEmail').val("");
        $('#seniorTeacher1Name').val("");
        $('#seniorTeacher1Mobile').val("");
        $('#seniorTeacher1Designation').val("");
        $('#seniorTeacher1Email').val("");
        $('#seniorTeacher2Name').val("");
        $('#seniorTeacher2Mobile').val("");
        $('#seniorTeacher2Designation').val("");
        $('#seniorTeacher2Email').val("");
    }
}


function passwordMinimumCharacterValidation() {
    if (document.getElementById("pwdNew") !== null) {
        var newPass = document.getElementById("pwdNew").value
        if (newPass.length < 8) {
            $('#passwordNewAlert').text("Password contains minimum 8 characters");
        } else {
            $('#passwordNewAlert').text("Password accepted");
        }
    }
}

function confirmPasswordMessage() {
    if (document.getElementById("pwdNew") !== null && document.getElementById("pwdConfirm") !== null) {
        if (document.getElementById("pwdNew").value === document.getElementById("pwdConfirm").value) {
            $('#passwordConformationAlert').text("Password Confirmed");
        } else {
            $('#passwordConformationAlert').text("Password Not Confirmed");
        }
    }
}

function enableChangePasswordSubmitButton() {
    if (document.getElementById("passwordConformationAlert") !== null && document.getElementById("passwordAlert") !== null) {
        if (document.getElementById("passwordNewAlert").innerHTML === "Password accepted" && document.getElementById("passwordAlert").innerHTML === "Password Matched" && document.getElementById("passwordConformationAlert").innerHTML === "Password Confirmed") {
            document.getElementById("changePasswordSubmit").removeAttribute("disabled");
        } else {
            document.getElementById("changePasswordSubmit").setAttribute("disabled", "disabled");
        }
    }
}

function showPasswordNotMatchedMessage() {
    var password = document.getElementById('pwd').value;
    if (password != "") {
        var url = rootPath + '/isMatchedPassword/message?password=' + password;
        $.ajax({
            type: "POST",
            url: url,
            success: function (data) {
                $('#passwordAlert').text(data);
                $('#passwordAlert').fadeIn();
            },
            error: function (e) {
                // alert('Error:' + e);
            }
        });
    }
}

function disableDownload(element) {
    var id = element.id;
    var url = rootPath + '/file/isExist?fileName=' + id;
    $.ajax({
        type: "POST",
        url: url,
        success: function (data) {
            if (data.toString() == "File exist") {
                document.getElementById(id).removeAttribute("disabled");
            } else {
                document.getElementById(id).removeAttribute("href");
            }
        },
        error: function (e) {
            // alert('Error:' + e);
        }
    });
}

function printContent() {
    var restorePage = document.body.innerHTML;
    $('.action').hide();
    var printContent = document.getElementById('print').innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = restorePage;
    $('.action').show();
}

function submitCenterData() {
    var message = "";
    if ($('#adminUI').length > 0) {
        if (!validateInputField('district', 'District')) {
            return;
        }
        if (!validateInputField('thana', 'Upazilla/Thana')) {
            return;
        }
        message += "District: " + $("#district option:selected").text() + '<br>' + "Upazilla/Thana: " + $("#thana option:selected").text();
    } else {
        if (!validateInputField('thana1', 'Upazilla/Thana')) {
            return;
        }
        message += "Upazilla/Thana: " + $("#thana1 option:selected").text();
    }
    if (!validateInputField('name', 'Center Name')) {
        return;
    }
    if (!validateInputField('address', 'Center Address')) {
        return;
    }
    message += "<br>Center Name: " + $('#name').val() + '<br>Address:' + $('#address').val();
    $.confirm({
        title: 'Please Confirm the following Data!',
        content: message,
        buttons: {
            confirm: function () {
                startLoading();
                $.ajax({
                    type: "POST",
                    url: rootPath + "/center/save",
                    data: $('form[name=formSubmit]').serialize(),
                    success: function (response) {
                        if (response != null) {
                            hideLoading();
                            if (response === 'SuccessFullySaved') {
                                showSuccess('<b>Success!</b><br> Record is successfully created');
                                $('#name').val('');
                                $('#address').val('');
                                loadCenterDtos(false);
                            } else if (response === 'SuccessFullyUpdated') {
                                showSuccess('<b>Success!</b><br> Record is successfully updated');
                                $('#name').val('');
                                $('#address').val('');
                                $('#id').val('');
                                loadCenterDtos(false);
                            } else {
                                showError(response);
                            }
                        } else {
                            hideLoading();
                            showError('Unknown Error');
                        }
                    }
                });
            },
            cancel: function () {
                showSuccess('Operation cancelled!')
            }
        }
    });
}

function submitCenterPersonnelData() {
    var message = "";
    if ($('#adminUI').length > 0) {
        if (!validateInputField('district', 'District')) {
            return;
        }
        if (!validateInputField('thana', 'Upazilla/Thana')) {
            return;
        }
        message += "District: " + $("#district option:selected").text() + '<br>' + "Upazilla/Thana: " + $("#thana option:selected").text();
    } else {
        if (!validateInputField('thana1', 'Upazilla/Thana')) {
            return;
        }
        message += "Upazilla/Thana: " + $("#thana1 option:selected").text();
    }
    if (!validateInputField('center', 'Center')) {
        return;
    }
    if (!validateInputField('centerChiefName', 'Center Chief Name')) {
        return;
    }
    if (!validateInputField('centerChiefDesignation', 'Center Chief Designation')) {
        return;
    }
    if (!validateMobileNo('centerChiefMobile', 'Center Chief Mobile')) {
        return;
    }
    if (!validateEmailField('centerChiefEmail', 'Center Chief Email')) {
        return;
    }
    if (!validateInputField('seniorTeacher1Name', 'Teacher 1 Name')) {
        return;
    }
    if (!validateInputField('seniorTeacher1Designation', 'Teacher 1 Designation')) {
        return;
    }
    if (!validateMobileNo('seniorTeacher1Mobile', 'Teacher 1 Mobile')) {
        return;
    }
    if (!validateEmailField('seniorTeacher1Email', 'Teacher 1 Email')) {
        return;
    }
    if (!validateInputField('seniorTeacher2Name', 'Teacher 2 Name')) {
        return;
    }
    if (!validateInputField('seniorTeacher2Designation', 'Teacher 2 Designation')) {
        return;
    }
    if (!validateMobileNo('seniorTeacher2Mobile', 'Teacher 2 Mobile')) {
        return;
    }
    if (!validateEmailField('seniorTeacher2Email', 'Teacher 2 Email')) {
        return;
    }
    message += "<br>Center : " + $('#center option:selected').text() + '<br>Center Chief Name: ' + $('#centerChiefName').val() + '<br>Center Chief Designation: '  + $('#centerChiefDesignation').val()+ '<br>Center Chief Mobile No: '  + $('#centerChiefMobile').val() + '<br>Center Chief Email: '  + $('#centerChiefEmail').val() + '<br>Teacher 1 Name: '  + $('#seniorTeacher1Name').val()  + '<br>Teacher 1 Designation: '  + $('#seniorTeacher1Designation').val()+ '<br>Teacher 1 Mobile No. : '  + $('#seniorTeacher1Mobile').val()+ '<br>Teacher 1 Email : '  + $('#seniorTeacher1Email').val() + '<br>Teacher 2 Name: '  + $('#seniorTeacher2Name').val()  + '<br>Teacher 2 Designation: '  + $('#seniorTeacher2Designation').val()+ '<br>Teacher 2 Mobile No. : '  + $('#seniorTeacher2Mobile').val()+ '<br>Teacher 2 Email : '  + $('#seniorTeacher2Email').val() ;
    $.confirm({
        title: 'Please Confirm the following Data!',
        content: message,
        buttons: {
            confirm: function () {
                startLoading();
                $.ajax({
                    type: "POST",
                    url: rootPath + "/centerPersonnel/save",
                    data: $('form[name=formSubmit]').serialize(),
                    success: function (response) {
                        if (response != null) {
                            hideLoading();
                            if (response === 'SuccessFullySaved') {
                                showSuccess('<b>Success!</b><br> Record is successfully created');
                                $('#center').val('').trigger('change');
                                loadCenterPersonnelList();
                            } else if (response === 'SuccessFullyUpdated') {
                                showSuccess('<b>Success!</b><br> Record is successfully updated');
                                $('#center').val('').trigger('change');
                                $('#id').val('');
                                loadCenterPersonnelList();
                            } else {
                                showError(response);
                            }
                        } else {
                            hideLoading();
                            showError('Unknown Error');
                        }
                    }
                });
            },
            cancel: function () {
                showSuccess('Operation cancelled!')
            }
        }
    });
}


function submitBuildingData() {
    var message = "";
    if ($('#adminUI').length > 0) {
        if (!validateInputField('district', 'District')) {
            return;
        }
        if (!validateInputField('thana', 'Upazilla/Thana')) {
            return;
        }
        message += "District: " + $("#district option:selected").text() + '<br>' + "Upazilla/Thana: " + $("#thana option:selected").text();
    } else {
        if (!validateInputField('thana1', 'Upazilla/Thana')) {
            return;
        }
        message += "Upazilla/Thana: " + $("#thana1 option:selected").text();
    }
    if (!validateInputField('center', 'Center')) {
        return;
    }
    if (!validateInputField('buildingNo', 'Building No')) {
        return;
    }
    if (!validateInputField('buildingName', 'Building Name')) {
        return;
    }
    message += "<br>Center Name: " + $('#center option:selected').text() + '<br>Building No:' + $('#buildingNo').val() + '<br>Building Name:' + $('#buildingName').val();
    $.confirm({
        title: 'Please Confirm the following Data!',
        content: message,
        buttons: {
            confirm: function () {
                startLoading();
                $.ajax({
                    type: "POST",
                    url: rootPath + "/building/save",
                    data: $('form[name=formSubmit]').serialize(),
                    success: function (response) {
                        if (response != null) {
                            hideLoading();
                            if (response === 'SuccessFullySaved') {
                                showSuccess('<b>Success!</b><br> Record is successfully created');
                                $('#buildingNo').val('').trigger('click');
                                $('#buildingName').val('');
                                loadBuildingDtos(false);
                            } else if (response === 'SuccessFullyUpdated') {
                                showSuccess('<b>Success!</b><br> Record is successfully updated');
                                $('#buildingNo').val('').trigger('click');
                                $('#buildingName').val('');
                                $('#id').val('');
                                loadBuildingDtos(false);
                            } else {
                                showError(response);
                            }
                        } else {
                            hideLoading();
                            showError('Unknown Error');
                        }
                    }
                });
            },
            cancel: function () {
                showSuccess('Operation cancelled!')
            }
        }
    });
}

function submitExamPhaseData() {
    var message = "";
    if (!validateInputField('phase', 'Phase')) {
        return;
    }
    if (!validateInputField('phaseBn', 'Phase (Bangla)')) {
        return;
    }
    message += "<br>Phase: " + $('#phase').val() + '<br>Phase (Bangla): ' + $('#phaseBn').val();
    $.confirm({
        title: 'Please Confirm the following Data!',
        content: message,
        buttons: {
            confirm: function () {
                startLoading();
                $.ajax({
                    type: "POST",
                    url: rootPath + "/exam-phase/save",
                    data: $('form[name=formSubmit]').serialize(),
                    success: function (response) {
                        if (response != null) {
                            hideLoading();
                            if (response === 'SuccessFullySaved') {
                                showSuccess('<b>Success!</b><br> Record is successfully created');
                                $('#buildingNo').val('').trigger('click');
                                $('#buildingName').val('');
                                loadBuildingDtos(false);
                            } else if (response === 'SuccessFullyUpdated') {
                                showSuccess('<b>Success!</b><br> Record is successfully updated');
                                $('#buildingNo').val('').trigger('click');
                                $('#buildingName').val('');
                                $('#id').val('');
                                loadBuildingDtos(false);
                            } else {
                                showError(response);
                            }
                        } else {
                            hideLoading();
                            showError('Unknown Error');
                        }
                    }
                });
            },
            cancel: function () {
                showSuccess('Operation cancelled!')
            }
        }
    });
}

function submitAssignExamPhases() {
    if (!validateInputField('district', 'District')) {
        return;
    }
    if (!validateInputField('phaseId', 'Phase(s)')) {
        return;
    }
    $.confirm({
        title: 'Conformation!',
        content: 'Are you sure to execute it?',
        buttons: {
            confirm: function () {
                startLoading();
                $.ajax({
                    type: "POST",
                    url: rootPath + "/exam-phase/assign",
                    data: $('form[name=formSubmit]').serialize(),
                    success: function (response) {
                        if (response != null) {
                            hideLoading();
                            if (response === 'SuccessFullySaved') {
                                showSuccess('<b>Success!</b><br> Record is successfully created');
                                $('#buildingNo').val('').trigger('click');
                                $('#buildingName').val('');
                                loadBuildingDtos(false);
                            } else if (response === 'SuccessFullyUpdated') {
                                showSuccess('<b>Success!</b><br> Record is successfully updated');
                                $('#buildingNo').val('').trigger('click');
                                $('#buildingName').val('');
                                $('#id').val('');
                                loadBuildingDtos(false);
                            } else {
                                showError(response);
                            }
                        } else {
                            hideLoading();
                            showError('Unknown Error');
                        }
                    }
                });
            },
            cancel: function () {
                showSuccess('Operation cancelled!')
            }
        }
    });
}

function submitRoomData() {
    var message = "";
    if ($('#adminUI').length > 0) {
        if (!validateInputField('district', 'District')) {
            return;
        }
        if (!validateInputField('thana', 'Upazilla/Thana')) {
            return;
        }
        message += "District: " + $("#district option:selected").text() + '<br>' + "Upazilla/Thana: " + $("#thana option:selected").text();
    } else {
        if (!validateInputField('thana1', 'Upazilla/Thana')) {
            return;
        }
        message += "Upazilla/Thana: " + $("#thana1 option:selected").text();
    }
    if (!validateInputField('center', 'Center')) {
        return;
    }
    if (!validateInputField('building', 'Building')) {
        return;
    }
    if (!validateInputField('floorNo', 'Floor No')) {
        return;
    }
    if (!validateInputField('roomNo', 'Room No/Name')) {
        return;
    }
    if (!validateNumberField('totalNoOfSeats', 'Total  No. of Seats')) {
        return;
    }
    message += "<br>Center Name: " + $('#center option:selected').text() + '<br>Building:' + $('#building option:selected').text() + '<br>Floor No:' + $('#floorNo option:selected').text() + '<br>Room No/Name:' + $('#roomNo').val() + '<br>Total No. of Seats:' + $('#totalNoOfSeats').val();
    $.confirm({
        title: 'Please Confirm the following Data!',
        content: message,
        buttons: {
            confirm: function () {
                startLoading();
                $.ajax({
                    type: "POST",
                    url: rootPath + "/room/save",
                    data: $('form[name=formSubmit]').serialize(),
                    success: function (response) {
                        if (response != null) {
                            hideLoading();
                            if (response === 'SuccessFullySaved') {
                                showSuccess('<b>Success!</b><br> Record is successfully created');
                                $('#roomNo').val('');
                                $('#totalNoOfSeats').val('');
                                loadRoomList(false);
                            } else if (response === 'SuccessFullyUpdated') {
                                showSuccess('<b>Success!</b><br> Record is successfully updated');
                                $('#roomNo').val('');
                                $('#totalNoOfSeats').val('');
                                $('#id').val('');
                                loadRoomList(false);
                            } else {
                                showError(response);
                            }
                        } else {
                            hideLoading();
                            showError('Unknown Error');
                        }
                    }
                });
            },
            cancel: function () {
                showSuccess('Operation cancelled!')
            }
        }
    });
}

function deleteCenterData(id) {
    $.confirm({
        animationBounce: 2.5,
        title: 'CAUTION',
        content: '<div class="confirmIconDiv"><label><i class="fa fa-exclamation-triangle fa-5x faExclamatinTriangle" aria-hidden="true"></i></label> </div><div class="confirmTextDiv"><label class="confirm-text">Are you sure to delete it?</label></div>',
        buttons: {
            ok: {
                btnClass: 'btn-primary actionAccept',
                action: function () {
                    startLoading();
                    $.ajax({
                        type: "DELETE",
                        url: rootPath + "/center/delete/" + id,
                        success: function (response) {
                            hideLoading();
                            if (response != null) {
                                if (response === "SuccessfullyDeleted") {
                                    showSuccess('Record deleted successfully');
                                    loadCenterDtos(true);
                                } else if (response === "failedToDelete") {
                                    showError('Error! <br>Record Not found');
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
function deleteBuildingData(id) {
    $.confirm({
        animationBounce: 2.5,
        title: 'CAUTION',
        content: '<div class="confirmIconDiv"><label><i class="fa fa-exclamation-triangle fa-5x faExclamatinTriangle" aria-hidden="true"></i></label> </div><div class="confirmTextDiv"><label class="confirm-text">Are you sure to delete it?</label></div>',
        buttons: {
            ok: {
                btnClass: 'btn-primary actionAccept',
                action: function () {
                    startLoading();
                    $.ajax({
                        type: "DELETE",
                        url: rootPath + "/building/" + id,
                        success: function (response) {
                            hideLoading();
                            if (response != null) {
                                if (response === "SuccessfullyDeleted") {
                                    showSuccess('Record deleted successfully');
                                    loadBuildingDtos(true);
                                } else if (response === "failedToDelete") {
                                    showError('Error! <br>Record Not found');
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

function deleteRoomData(id) {
    $.confirm({
        animationBounce: 2.5,
        title: 'CAUTION',
        content: '<div class="confirmIconDiv"><label><i class="fa fa-exclamation-triangle fa-5x faExclamatinTriangle" aria-hidden="true"></i></label> </div><div class="confirmTextDiv"><label class="confirm-text">Are you sure to delete it?</label></div>',
        buttons: {
            ok: {
                btnClass: 'btn-primary actionAccept',
                action: function () {
                    startLoading();
                    $.ajax({
                        type: "DELETE",
                        url: rootPath + "/room/" + id,
                        success: function (response) {
                            hideLoading();
                            if (response != null) {
                                if (response === "SuccessfullyDeleted") {
                                    showSuccess('Record deleted successfully');
                                    loadRoomList(true);
                                } else if (response === "failedToDelete") {
                                    showError('Error! <br>Record Not found');
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

function setupCenterData(id) {
    startLoading();
    $.ajax({
        type: "GET",
        url: rootPath + "/center/loadName?centerId=" + id,
        success: function (response) {
            if (response != null) {
                startLoading();
                $('#id').val(response.id);
                if ($('#district').length > 0) {
                    $('#district').val(response.distId).trigger('click');
                    loadThana('district');
                    $('#thana').val(response.thana.id).trigger('click');
                } else {
                    $('#thana1').val(response.thana.id).trigger('click');
                }
                $('#name').val(response.name);
                $('#address').val(response.address);
                hideLoading();
            } else {
                showError('Record Not found');
            }
            hideLoading();
        }
    });
}

function setupBuildingData(id) {
    startLoading();
    $.ajax({
        type: "GET",
        url: rootPath + "/building/" + id,
        success: function (response) {
            if (response != null) {
                startLoading();
                $('#id').val(response.id);
                if ($('#district').length > 0) {
                    $('#district').val(response.center.distId).trigger('click');
                    loadThana('district');
                    $('#thana').val(response.center.thana.id).trigger('click');
                } else {
                    $('#thana1').val(response.center.thana.id).trigger('click');
                }
                loadCenterList('center');
                $('#center').val(response.center.id).trigger('change');
                $('#buildingNo').val(response.buildingNo).trigger('click');
                $('#buildingName').val(response.buildingName);
                hideLoading();
            } else {
                showError('Record Not found');
            }
            hideLoading();
        }
    });
}
function setupRoomData(id) {
    startLoading();
    $.ajax({
        type: "GET",
        url: rootPath + "/room/" + id,
        success: function (response) {
            if (response != null) {
                startLoading();
                $('#id').val(response.id);
                if ($('#district').length > 0) {
                    $('#district').val(response.center.distId).trigger('click');
                    loadThana('district');
                    $('#thana').val(response.center.thana.id).trigger('click');
                } else {
                    $('#thana1').val(response.center.thana.id).trigger('click');
                }
                loadCenterList('center');
                $('#center').val(response.center.id).trigger('change');
                $('#building').val(response.buildingInfo.id).trigger('change');
                $('#floorNo').val(response.floorNo).trigger('click');
                $('#roomNo').val(response.roomNo);
                $('#totalNoOfSeats').val(response.totalNoOfSeats);
                hideLoading();
            } else {
                showError('Record Not found');
            }
            hideLoading();
        }
    });
}
*/

function showSuccess(message) {
    $.toast({
        heading: 'Success',
        text: message,
        showHideTransition: 'slide',
        position: 'bottom-right',
        icon: 'success'
    })
}

function showRecordCreationSuccess(){
    showSuccess('Record created successfully');
}

function showError(message) {
    $.toast({
        heading: 'Error',
        text: message,
        showHideTransition: 'fade',
        position: 'bottom-right',
        icon: 'error'
    })
}

function showWarning(message) {
    $.toast({
        heading: 'Warning',
        text: message,
        showHideTransition: 'fade',
        position: 'bottom-right',
        icon: 'warning'
    })
}

function showInformation(message) {
    $.toast({
        heading: 'Information',
        text: message,
        showHideTransition: 'fade',
        position: 'bottom-right',
        icon: 'info'
    })
}

function validateInputField(id, name) {
    if ($('#' + id + '').val() === null || $('#' + id + '').val() === '') {
        showError(name + ' can not be empty.');
        return false;
    }
    return true;
}

function startLoading() {
    $('#loadingContent').prepend('<div id="loading"><img id="loading-image" class="loading-image" src="/images/loader/Ripple-1s-128px.gif" alt="Processing..." /></div>');
    $('#home-container').fadeTo(300, 0.3);
    $('#home-container').children().attr('disabled', 'disabled');
}

function hideLoading() {
    $('#loading').remove();
    $('#home-container').fadeTo(300, 1);
    $('#home-container').children().removeAttr('disabled', 'disabled');
}

function createWithButton(tableId, outputColumnArray, title, lengthMenuArray) {
    var actualLengthMenuArray = [];
    if (lengthMenuArray.length > 0) {
        for (var k = 0; k < lengthMenuArray.length; k++) {
            if (lengthMenuArray[k] !== 'All') {
                actualLengthMenuArray.push(lengthMenuArray[k]);
            } else {
                actualLengthMenuArray.push(-1);
            }
        }
    }
    var table = $('#' + tableId).DataTable({
        "iCookieDuration": 60,
        "bStateSave": false,
        "bAutoWidth": false,
        "bScrollAutoCss": true,
        "bProcessing": true,
        "bRetrieve": true,
        "bJQueryUI": true,
        "sScrollX": "100%",
        "bScrollCollapse": true,
        "searchHighlight": true,
        "lengthMenu": [actualLengthMenuArray, lengthMenuArray],
        "order": [[0, "asc"]],
        dom: 'Blfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Excel',
                className: 'btn btn-primary',
                exportOptions: {
                    columns: outputColumnArray
                },
                alignment: 'center',
                orientation: 'landscape',
                title: title

            },
            {
                extend: 'pdfHtml5',
                text: 'PDF',
                className: 'btn btn-primary',
                exportOptions: {
                    columns: outputColumnArray
                },
                alignment: 'center',
                orientation: 'landscape',
                title: title
                // customize: function(doc) {
                //  doc.defaultStyle={font : 'Kalpurush'};
                //  }
            },
            {
                extend: 'print',
                text: 'Print',
                className: 'btn btn-primary',
                exportOptions: {
                    columns: outputColumnArray
                },
                alignment: 'center',
                orientation: 'landscape',
                title: title
            }
        ]
    });

    return table;
}

function createHeader(headID, headArr) {
    $('#' + headID).empty();
    var trHead = $('<tr class="text-center"></tr>').appendTo($('#' + headID));

    for (var i = 0; i < headArr.length; i++) {
        $('<td><b><span class="trn">' + headArr[i] + '</span></b></td>').appendTo(trHead);
    }
}

function destroyTable(tableId) {
    if ($.fn.DataTable.isDataTable('#' + tableId)) {
        $('#' + tableId).DataTable().destroy();
    }
}

function checkValue(val) {
    if (val === '' || val === undefined || val === 'undefined' || val === null || val === 'null') {
        val = '-';
    }
    return val;
}

function validateNumberField(id, name, limit) {
    if (!validateInputField(id, name)) {
        return false;
    }
    var valueOfField = $('#' + id).val();
    if (!$.isNumeric(valueOfField)) {
        showError('<b>ERROR!</b><br> ' + name + ' is not a valid number.');
        return false;
    }
    if (valueOfField < limit) {
        showError('<b>ERROR!</b><br> ' + name + ' can not be less than ' + limit + '.');
        return false;
    }
    return true;
}

function validateNumber(numberId) {
    var number = $('#' + numberId).val();
    if(number !== null && number !== ""){
        if (!$.isNumeric(number)) {
            $('#' + numberId).val(number.slice(0,-1));
        }
    }
}

function reloadPage() {
    location.reload();
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email)
}

function validateEmailField(id, name) {
    if (!validateInputField(id, name)) {
        return false;
    }
    var valueOfField = $('#' + id).val();
    if (!IsEmail(valueOfField)) {
        showError('<b>ERROR!</b><br> ' + name + ' is invalid email address.');
        return false;
    }
    return true
}

function validateMobileNo(id, name) {
    if (!validateNumberField(id, name, 1)) {
        return false;
    }
    var valueOfField = $('#' + id).val();
    var valueLength = valueOfField.length;
    if (valueLength !== 11) {
        showError('<b>ERROR!</b><br> ' + name + ' must be 11 digits mobile no.');
        return false;
    }
    var firstTwoDigit = valueOfField.slice(0, 2);
    if (firstTwoDigit !== '01') {
        showError('<b>ERROR!</b><br> ' + name + ' must be starts with 01 as mobile no.');
        return false;
    }
    return true
}

function isValidNumber(mobileNo) {
    if(mobileNo !== null && mobileNo !== ""){
        if (!$.isNumeric(mobileNo)) {
            // showError('<b>ERROR!</b><br> ' + mobileNo + ' is not a valid number.');
            return false;
        }
        return true;
    }
}


function isValidMobileNo(mobileNo) {
    if (!isValidNumber(mobileNo)) {
        return false;
    }
    var valueOfField = mobileNo;
    var valueLength = valueOfField.length;
    if (valueLength !== 11) {
        return false;
    }
    var firstTwoDigit = valueOfField.slice(0, 2);
    if (firstTwoDigit !== '01') {
        return false;
    }
    return true
}

function getDatePicker(eId) {
    $('#' + eId).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false,
        minYear: 1980,

        maxYear: parseInt(moment().format('YYYY'), 10) + 10,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $('#' + eId).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY'));
    });

    $('#' + eId).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
}

function formatDate(date){
    return formatDateFromat(date, 'DD-MMM-YYYY')
}

function formatDateFromat(date, format){
    return moment(date).format(format);
}
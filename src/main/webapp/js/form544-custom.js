var totalRowCount = 0;

$(function() {
	$("#dateOfOnset").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#dateOfOnsetFrom").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#dateOfOnsetTo").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#dateOfAdmission").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#dateOfAdmissionFrom").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#dateOfAdmissionTo").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#notifyByUnitDate").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#notifyToMohDate").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#notifyByUnitFromDate").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#notifyByUnitToDate").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#notifyToMohFromDate").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#notifyToMohToDate").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#smpleCollectionDate").datepicker({
		dateFormat : 'yy-mm-dd'
	});
});

$(function() {
	$("#footer").load("/communicable-disease/page/footer");
});

$(function() {
	$("#banner").load("/communicable-disease/page/banner");
});

$(function() {
	$("#navigation").load("/communicable-disease/page/navigation");
});

function doSearch(pageGenerationOn) {
	var offset = 0;
	var limit = parseInt($("#limit").val());

	if ($("#pageNo").val() != undefined && parseInt($("#pageNo").val()) != 1) {
		offset = parseInt($("#pageNo").val()) * limit
				- parseInt($("#limit").val());
	}
	$
			.ajax({
				url : "/communicable-disease/Form544/filterBy/",
				method : "post",
				data : {
					"serialNo" : $("#serialNo").val(),
					"institute" : $("#institute").val(),
					"disease" : $("#disease").val(),
					"patientName" : $("#patientName").val(),
					"bhtNo" : $("#bhtNo").val(),
					"ward" : $("#ward").val(),
					"sex" : $("#sex").val(),
					"notifierName" : $("#notifierName").val(),
					"dateOfOnsetFrom" : $("#dateOfOnsetFrom").val(),
					"dateOfOnsetTo" : $("#dateOfOnsetTo").val(),
					"dateOfAdmissionFrom" : $("#dateOfAdmissionFrom").val(),
					"dateOfAdmissionTo" : $("#dateOfAdmissionTo").val(),
					"ageFrom" : $("#ageFrom").val(),
					"ageTo" : $("#ageTo").val(),
					"mohArea" : $("#mohArea").val(),
					"notifyByUnitFromDate" : $("#notifyByUnitFromDate").val(),
					"notifyByUnitToDate" : $("#notifyByUnitToDate").val(),
					"notifyToMohFromDate" : $("#notifyToMohFromDate").val(),
					"notifyToMohToDate" : $("#notifyToMohToDate").val(),
					"offset" : offset,
					"limit" : limit,
				},
				success : function(result) {
					$("#form544FilterTblBody").empty();
					for (i = 0; i < result.form544List.length; i++) {
						$("#form544FilterTblBody")
								.append(
										'<tr>' + '<td>'
												+ result.form544List[i].id
												+ '</td>'
												+ '<td>'
												+ result.form544List[i].serialNo
												+ '</td>'
												+ '<td>'
												+ result.form544List[i].patientName
												+ '</td>'
												+ '<td>'
												+ result.form544List[i].patientsHomePhoneNo
												+ '</td>'
												+ '<td>'
												+ result.form544List[i].bhtNo
												+ '</td>'
												+ '<td>'
												+ result.form544List[i].ward
												+ '</td>'
												+ '<td>'
												+ result.form544List[i].disease.diseaseName
												+ '</td>'
												+ '<td>'
												+ result.form544List[i].dateOfAdmission
												+ '</td>'
												+ '<td>'
												+ result.form544List[i].institute
												+ '</td>'
												+ '<td>'
												+ '<a href="'
												+ generateView544Url(result.form544List[i].id)
												+ '">View 544</a> | <a href="'
												+ generateUpdate544Url(result.form544List[i].id)
												+ '">Update 544</a> | '
												+ generateForm411Link(result.form544List[i])
												+ '</td>' + '</tr>');
					}

					var totalRows = result.totalRowCount;
					generateTblSummaryStatement(limit, offset, totalRows);

					if (pageGenerationOn == true) {
						$("#pages").empty();
						generatePages(totalRows);
					}

				}
			});

}

function generateTblSummaryStatement(limit, offset, totalRows) {
	var tblSummaryStatement = "Showing " + limit + " records (" + (offset + 1)
			+ "-" + (offset + limit) + ") from total " + totalRows
			+ " records."
	document.getElementById("tblSummary").innerHTML = tblSummaryStatement;
}

function generatePages(totalRowCount) {
	var pageCount = Math.ceil(totalRowCount / parseInt($("#limit").val()));
	var sel = $(
			'<select id="pageNo" onchange="doSearch(false)" class="form-control">')
			.appendTo('#pages');

	for (i = 0; i < pageCount; i++) {
		sel.append($("<option>").attr('value', i + 1).text(i + 1));
	}
}

function setPageName(pageName) {
	document.getElementById('pageName').innerHTML = pageName;
}

function generateView544Url(form544Id) {
	return "/communicable-disease/Form544/view?form544Id=" + form544Id;
}

function generateUpdate544Url(form544Id) {
	return "/communicable-disease/Form544/update_view?id=" + form544Id;
}

function generateForm411Link(form544) {
	if (form544.workflow != null) {
		if (form544.workflow.form411 == null) {
			return '<a href="/communicable-disease/Form411/create?form544Id='
					+ form544.id + '">Create 411</a>';
		} else {
			return '<a href="/communicable-disease/Form411/view?form411Id='
					+ form544.workflow.form411.id + '">View 411</a>';
		}
	}
}

function getMohAreaByDistrictId(districtId) {
	$.ajax({
		url : "/communicable-disease/Form544/moh_area?district_id="
				+ districtId,
		method : "get",
		success : function(result) {
			$("#mohArea").empty();
			result.forEach(function(item, i) {
				var option = "<option value = " + item.id + ">"
						+ item.mohAreaName + "</option>";
				$("#mohArea").append(option);
			});
		}
	});
}

function composeAge() {
	var age = $("#ageYear").val() * 365 + $("#ageMonth").val() * 30
			+ $("#ageDay").val() * 1;

	$("#age").val(age);

	if ($("#age").val() == 0) {
		$("#age").val("");
	}

}

function initMap() {
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : defaultZoom,
		center : new google.maps.LatLng(defaultLat, defaultLng),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var diseaseLocation = new google.maps.Marker({
		position : new google.maps.LatLng(defaultLat, defaultLng),
		draggable : true
	});

	google.maps.event.addListener(diseaseLocation, 'dragend', function(evt) {
		document.getElementById('latitude').innerHTML = evt.latLng.lat()
				.toFixed(6);
		document.getElementById('longitude').innerHTML = evt.latLng.lng()
				.toFixed(6);

		document.getElementById('latitudeTxt').value = evt.latLng.lat()
				.toFixed(6);
		document.getElementById('longitudeTxt').value = evt.latLng.lng()
				.toFixed(6);
	});

	google.maps.event.addListener(diseaseLocation, 'dragstart', function(evt) {

	});

	google.maps.event.addListener(map, 'click', function(evt) {
		document.getElementById('latitude').innerHTML = evt.latLng.lat()
				.toFixed(6);
		document.getElementById('longitude').innerHTML = evt.latLng.lng()
				.toFixed(6);

		document.getElementById('latitudeTxt').value = evt.latLng.lat()
				.toFixed(6);
		document.getElementById('longitudeTxt').value = evt.latLng.lng()
				.toFixed(6);

		diseaseLocation.setPosition(evt.latLng);
	});

	map.setCenter(diseaseLocation.position);
	diseaseLocation.setMap(map);
}

var isCorrdinationMapLoaded = false;
var defaultLng = 0;
var defaultLat = 0;
var defaultZoom = 0;

function popupCoordinateMap(inDefaultLat, inDefaultLng, inDefaultZoom) {
	defaultZoom = inDefaultZoom;

	if (inDefaultLat != "" && inDefaultLng != "") {
		defaultLng = inDefaultLng;
		defaultLat = inDefaultLat;
	} else {
		defaultLng = parseFloat(document.getElementById("longitudeTxt").value);
		defaultLat = parseFloat(document.getElementById("latitudeTxt").value);
	}

	if (!isCorrdinationMapLoaded) {
		$
				.getScript(
						'https://maps.googleapis.com/maps/api/js?key=AIzaSyDN2cxxcRtxmmIu_9uwYJ7gjD5r7djFtGk&callback=initMap',
						function(data, textStatus, jqxhr) {

						});

		isCorrdinationMapLoaded = true;
	}
}

$(document).ready(function() {

	// Following default set should be removed or changed according to target
	// release setup.
	$("#district").val("16");
	getMohAreaByDistrictId($("#district").val());

	$("#district").change(function() {
		getMohAreaByDistrictId($("#district").val());
	});
});
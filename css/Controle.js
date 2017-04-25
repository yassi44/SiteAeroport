/*Controle formulaire*/
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
$('#email1').bind("change blur",function () {
    Controle($(this), emailRegex);
    ControleSubmit(1);
});
$('#email2').bind("change blur",function () {
    Controle($(this), emailRegex);
    ControleSubmit(2);
});
$('#tel1').bind("change blur",function () {
    Controle($(this), /[0-9]{10}/);
    ControleSubmit(1);
});
$('#tel2').bind("change blur",function () {
    Controle($(this), /[0-9]{10}/);
    ControleSubmit(2);
});

$("#email1").click(ControleSubmit(1));
$("#email2").click(ControleSubmit(2));
$("#tel1").click(ControleSubmit(1));
$("#tel2").click(ControleSubmit(2));  

/*Nettoyage en cas de clique et si il y'a rien dans l'input*/
$("input").each(function(){
	$(this).click(function(){
        Nettoyage($(this));
	});

	$(this).blur(function(){
		if(!($(this).val().length))
			Nettoyage($(this));
	});
});

/*Contrôle Recherche vol*/
$("#Provenance").blur(function () {
    ControleAeroport($(this));
});

$("#Destination").blur(function(){
	ControleAeroport($(this));
});

/*Contrôle pour la météo*/
$(".choixIles").change(function(){
	var selected = $(".choixIles option:selected");
	$(".météoWrapper div").each(function(){
		if(($(this).attr('id') == selected.val()) && (selected.val() != "Iles")){
			$(this).show(100);
			$(this).addClass('activeIle');
		}
		else{
			if($(this).hasClass('activeIle')){
				$(this).removeClass('activeIle');
				$(this).hide(0);
			}
		}
	});
});

/*Controle bouton*/
$(".RadioButton button").each(function () {
    $(this).click(function () {
        if ($(this).hasClass("KO")) {
            $(this).siblings().removeClass("OK");
            $(this).siblings().addClass("KO");
            $(this).addClass("OK");
            $(this).removeClass("KO");
        }

        var test = $(this).hasClass("OK");

        if ($(this).attr("id") == "oui" && test) {
            $(".SuiviBagages-EmailTel").show(200);
            $("#submit").css("padding-top", "0px");
        }

        if ($(this).attr("id") == "non" && test) {
            $(".SuiviBagages-EmailTel").hide(200);
            $("#submit").css("padding-top", "20px");
        }
    });
});

/*Contrôle submit*/
function ControleSubmit(numero) {
    var email = $("#email" + numero);
    var tel = $("#tel" + numero);
    var submitButton = $("#submit" + numero);
    if (email.val() && tel.val()) {
        var classToAdd = (email.parent().hasClass("success") && tel.parent().hasClass("success")) ? "EnvoiOK" : "EnvoiNonOK";
        var classToRemove = (classToAdd == "EnvoiOK") ? "EnvoiNonOK" : "EnvoiOK";

        if (classToAdd == "EnvoiOK")
            submitButton.removeAttr("disabled");

        if (submitButton.hasClass(classToRemove))
            submitButton.removeClass(classToRemove);
        submitButton.addClass(classToAdd);
    }
    else {
        submitButton.attr("disabled", true);
        if (submitButton.hasClass("EnvoiOK"))
            submitButton.removeClass("EnvoiOK");

        if (submitButton.hasClass("EnvoiNonOK"))
            submitButton.removeClass("EnvoiNonOK");
    }
}

/*Contrôle fenetre modal*/
$(".AlertArrivee").each(function () {
    var EnvoiOk = $(".EnvoiOkArrive");
    $(this).change(function () {
        CheckButtonCheckBox(EnvoiOk, $(this));
        ControleCheckBox(EnvoiOk, true);
    });
});

$(".AlertDepart").each(function () {
    var EnvoiOk = $(".EnvoiOkDepart");
    $(this).change(function () {
        CheckButtonCheckBox(EnvoiOk, $(this));
        ControleCheckBox(EnvoiOk, false);
    });
});

/*Fonction de controle --> checkBok = ok*/
function CheckButtonCheckBox(envoinButtonJQuery,checkButtonJQuery) {
    if (checkButtonJQuery.is(':checked') && envoinButtonJQuery.hasClass("noDisplay")) {
        envoinButtonJQuery.show(70);
        envoinButtonJQuery.removeClass("noDisplay");
    }
}

/*Fonction de controle --> Si aucun bouton n'est checké*/
function ControleCheckBox(envoiButtonJQuery,ArriveDepart) {
    if (typeof ArriveDepart === "boolean") {
        var selector = (ArriveDepart) ? "Arrivee" : "Depart";
        var checkedInput = $(".Alert" + selector);
        var flag = true;
        checkedInput.each(function () {
            if ($(this).is(":checked"))
                flag = false;
        });
        if (!envoiButtonJQuery.hasClass("noDisplay") && flag) {
            envoiButtonJQuery.hide(70);
            envoiButtonJQuery.addClass("noDisplay");
        }
    }
}

/*Fonction de controle --> regex*/
function Controle(elementJQuery,regex){
	var result = elementJQuery.val().match(regex);
	if(elementJQuery.val().length)
		AjoutResult(elementJQuery,(result != null),false);
	else
		ToggleClassControle(elementJQuery);
}

/*Fonction de controle --> Non regex*/
function ControleAeroport(elementJQuery){
	var aeroports = ['anjouan','mohéli','moroni','mayotte'];
    if (elementJQuery.val().length) {
        var value = elementJQuery.val().toLowerCase();
        AjoutResult(elementJQuery, (aeroports.indexOf(value) !== -1), true);
    }
	else
		ToggleClassControle(elementJQuery);
}

/*Fontion d'ajout du résultat de contrôle*/
function AjoutResult(elementJQuery,result,failType){
	if(typeof(result) == "boolean"){
		if(result){
			elementJQuery.parent().addClass('success');
			if(elementJQuery.hasClass('fail'))
				elementJQuery.removeClass('fail');
		}
		else{
			if(!failType){
				elementJQuery.addClass('fail');
			}
			else{
				elementJQuery.parent().addClass('fail2');	
			}

			if(elementJQuery.hasClass('success'))
				elementJQuery.removeClass('success');
		}
	}
	else{
		console.log("Erreur script");
	}
}

/*Fonction ToggleClassControle*/
function ToggleClassControle(elementJQuery){
	if(elementJQuery.hasClass('fail') || elementJQuery.parent().hasClass('success'))
		elementJQuery.removeClass('fail');
	else
		elementJQuery.parent().removeClass('success');
}

/*Fonction de nettoyage*/
function Nettoyage(elementJQuery){
	if(elementJQuery.hasClass('fail'))
		elementJQuery.removeClass('fail');

	if(elementJQuery.parent().hasClass('fail2'))
		elementJQuery.parent().removeClass('fail2');

	if(elementJQuery.parent().hasClass('success'))
		elementJQuery.parent().removeClass('success');
}









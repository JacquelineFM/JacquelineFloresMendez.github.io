'use strict'

var kata = angular.module('kata01', []);

kata.controller('shortlinkCtrl', ["$scope", "$http", shortlink])

function shortlink($scope, $http) {
    var obj = $scope;
    obj.link = { url: "" };
    obj.sortlinks = JSON.parse(localStorage.getItem("links")) == null ? [] : JSON.parse(localStorage.getItem("links"));
    obj.flag = false; // verificamos si la caja de texto se deja vacia

    obj.btnShortenlink = () => {
        if (obj.link.url != "") {
            obj.flag = false;
            $http({
                method: 'POST',
                url: "https://rel.ink/api/links/",
                data: obj.link
            }).then(function successCallback(res) {
                    res.data.copy = false;
                    obj.sortlinks.push(res.data)
                    obj.link.url = "";
                    /* Agregamos el localStorage */
                    localStorage.setItem("links", JSON.stringify(obj.sortlinks));
                },
                function errorCallback(res) {

                    alert(res.data.url[0]);
                });
        } else {
            obj.flag = true;
        }
    }


    obj.btnCopiar = (objeto) => {
        var url = "https://rel.ink/" + objeto.hashid;
        objeto.copy = true;
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = url;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        localStorage.setItem("links", JSON.stringify(obj.sortlinks));
    }

    obj.btneraseCopiar = (objeto) => {
        objeto.copy = false;
        localStorage.setItem("links", JSON.stringify(obj.sortlinks));
    }

    angular.element(document).ready(function() {
        $('#movilmenu').click(function() {

            if ($('#movilmenu i').attr('class') == 'fa fa-bars') {
                $('#movilmenu i').removeClass('fa fa-bars').addClass('fa fa-times');
                $('#container-menu').css({ 'left': '30px' });
            } else {
                $('#movilmenu i').removeClass('fa fa-times').addClass('fa fa-bars');
                $('#container-menu').css({ 'left': '-100%' });
            }
        });

    });

}
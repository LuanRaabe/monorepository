$(document).ready(function () {
    const apiUrl = 'http://localhost:3000/';

    const zeroFill = n => {
        return (n < 10) ? ('00' + n)
            : (n < 100) ? ('0' + n)
                : n;
    }

    const yesOrNo = n => {
        return (n == "Sim") ? true
            : (n == "Não") ? false
                : null
    }

    $("#add-request").click(function () {
        let notDefined = 0;
        let data = {
            "id": 1,
            "game": $("#name").val(),
            "year": $("#year").val().split("-").reverse().join("/"),
            "genre": $("#genre").val(),
            "multiplayer": yesOrNo($("#multiplayer").val()),
            "offline": yesOrNo($("#offline").val()),
            "crossplataform": yesOrNo($("#crossplataform").val())
        }
        Object.keys(data).forEach((item) => {
            if (data[item] == undefined) {
                notDefined++;
            } else {
                console.log(item)
            }
        });
        if (notDefined > 0) {
            alert("Falta definir algumas informações");
            return 1;
        }
        $.ajax({
            method: "POST",
            url: apiUrl + "games",
            data: data
        })
            .done(function (response) {
                console.log(response);
            });
        $("#main").trigger("reset");
    })

    $("#consult-all").click(function () {
        $.ajax({
            method: "GET",
            url: apiUrl + "games/all"
        })
            .done(function (response) {
                $("#main").css("display", "none");
                $("section").css("display", "flex");
                $("#all-games").append(`<tr>
                                        <td>Id</td>
                                        <td>Nome</td>
                                        <td>Ano</td>
                                        <td>Gênero</td>
                                        <td>Multiplayer</td>
                                        <td>Offline</td>
                                        <td>Crosspl.</td>
                                    </tr>`);
                response.forEach((item) => {
                    $("#all-games").append(`<tr>
                                            <td>${zeroFill(item.id)}</td>
                                            <td>${item.game}</td>
                                            <td>${item.year}</td>
                                            <td>${item.genre}</td>
                                            <td>${(item.multiplayer) ? "Sim" : "Não"}</td>
                                            <td>${(item.offline) ? "Sim" : "Não"}</td>
                                            <td>${(item.crossplataform) ? "Sim" : "Não"}</td>
                                        </tr>`);
                });
            });
    });

    $("#add-game").on("click", function () {
        console.log("Opa");
        $("#main").css("display", "flex");
        $("section").css("display", "none");
        $("#all-games").html("");
    });
});
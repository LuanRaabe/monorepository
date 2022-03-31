$(document).ready(function () {
    const apiUrl = "http://localhost:3000/";
    $("#request-promise").click(function () {
        // let random = Math.floor(Math.random() * 5000) + 1;
        let confirm = false;
        const promise = new Promise((resolve, reject) => {
            $.get(apiUrl + `promise`)
            .done(function (response) {
                console.log(response);
                $("#response-time").html(response);
                confirm = true;
            });
            setTimeout(() => {
                if(confirm) {
                    resolve("REQUISIÇÃO ATENDIDA");
                } else {
                    reject("REQUISIÇÃO NÃO ATENDIDA POR TIMEOUT");
                }
            }, 3000);
        });
        promise
            .then((s) => {
                console.log(s);
                $("#response").html(s);
            })
            .catch((e) => {
                console.log(e);
                $("#response").html(e);
            });
    });
});

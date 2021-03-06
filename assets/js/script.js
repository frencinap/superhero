$( () => {

    //captura dato del input
    $('form').submit( e => {
        e.preventDefault()

        let superHero = $("input").val()

        //label de error en id
        let error = parseInt(superHero)
        if( error < 1 || error > 732){
            $(".error").html(`El número ingresado está fuera de rango, intenta con otro`)
        }else{
            $(".error").html(``)
        }

        //Petición
        $.ajax({
            url: `https://superheroapi.com/api.php/10227239002900026/${superHero}`,
            success: (data) => {
                //console.log(data);

                //datos de la heroCard
                let name = data.name
                let publisher = data.biography.publisher
                let occupation = data.work.occupation
                let img = data.image.url
                let height = data.appearance.height.join(' - ')
                let weight = data.appearance.weight.join(' - ')
                let conex = Object.values(data.connections)
                let connections = conex[0]
                let bio = Object.values(data.biography)
                let firstApp = bio[4]
                let alias = bio[2].join(', ')

                //cuerpo de la heroCard
                $("#heroCard").html(`
                <h4 class="text-center">SuperHero Encontrado</h4>
                <div class="card" >
                    <div class="row g-0">
                        <div class="col">
                            <img src="${img}" class="img-fluid rounded-start alt="${name}">
                        </div>
                        <div class="col">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">Conexiones: ${connections} </p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <span class="fst-italic">Publicado por</span> : ${publisher}
                                    </li>
                                    <li class="list-group-item">
                                        <span class="fst-italic">Ocupación</span> : ${occupation}
                                    </li>
                                    <li class="list-group-item">
                                        <span class="fst-italic">Primera Aparición</span> : ${firstApp}
                                    </li>
                                    <li class="list-group-item">
                                        <span class="fst-italic">Altura</span> : ${height}
                                    </li>
                                    <li class="list-group-item">
                                        <span class="fst-italic">Peso</span> : ${weight}
                                    </li>
                                    <li class="list-group-item">
                                        <span class="fst-italic">Alias</span> : ${alias}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                `)

                //datos para el gráfico
                let powerstats = data.powerstats
                //console.log(powerstats);
                let combat = parseInt(powerstats.combat)
                let power = parseInt(powerstats.power)
                let durability = parseInt(powerstats.durability)
                let intelligence = parseInt(powerstats.intelligence)
                let strength = parseInt(powerstats.strength)
                let speed = parseInt(powerstats.speed)

                let chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de poder para ${name}`  
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y} ",
                        dataPoints: [
                            { y: intelligence, label: "Inteligencia" },
                            { y: speed, label: "Velocidad" },
                            { y: strength, label: "Fuerza" },
                            { y: durability, label: "Resistencia" },
                            { y: power, label: "Poder" },
                            { y: combat , label: "Combate" },
                        ]
                    }]
                });
                chart.render();
              
            },
            error: (error) => {
                console.log(error);
            }
        })

    })
    
})



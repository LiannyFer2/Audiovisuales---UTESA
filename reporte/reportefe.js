 fetch(`${import.meta.env.VITE_API_URL}/reservation/`)
 .then(function(resp){
    return resp.json();
 })
 .then(function(data){
    console.log(data);
    let placeholder = document.querySelector("#tableBody");
    let out = "";
    for (let reservation of `${import.meta.env.VITE_API_URL}/reservation/`){
        out += ` 
        <tr>
        <td>${reservation.fechaDeUso}</td>
        <td>${reservation.curso}</td>
        <td>${reservation.rol}</td>
        <td>${reservation.horaInicio}</td>
        <td>${reservation.horaFinal}</td>
        <td>${reservation.Equipo}</td>
        <td>${reservation.Auxiliar}</td>
        </tr>
        `;
    }
    placeholder.innerHTML = out;
 })
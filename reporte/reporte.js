function createTable(objectArray, fields, fieldTitles) {
  let body = document.getElementsByTagName('body')[0]
  let tbl = document.createElement('table')
  let thead = document.createElement('thead')
  let thr = document.createElement('tr')

  for (p in objectArray[0]) {
    let th = document.createElement('th')
    th.appendChild(document.createTextNode(p))
    thr.appendChild(th)
  }

  thead.appendChild(thr)
  tbl.appendChild(thead)

  let tbdy = document.createElement('tbody')
  let tr = document.createElement('tr')
  objectArray.forEach((object) => {
    let n = 0
    let tr = document.createElement('tr')
    for (p in objectArray[0]) {
      var td = document.createElement('td')
      td.setAttribute('style', 'border: 1px solid gray')
      td.appendChild(document.createTextNode(object[p]))
      tr.appendChild(td)
      n++
    }
    tbdy.appendChild(tr)
  })
  tbl.appendChild(tbdy)
  body.appendChild(tbl)
  return tbl
}

function generate() {
  fetch('http://localhost:8080/api/reservations')
    .then((res) => res.json())
    .then((res) => {
      const data = res.reservation.map((item) => {

        const equipos = item.equipos?.map(item => item?.nombre).join(", ") || "Sin Asignar"

        return {
          Fecha: new Intl.DateTimeFormat('en-US').format(
            new Date(item.idForm.fechaDeUso)
          ),
          Aula: item.idForm.curso,
          Solicitante: item.idForm?.idEstudiante?.nombre || 'Sin Asignar',
          Rol: item.idForm.rol,
          Inicio: item.idForm.horaInicio.split('T')[1],
          Fin: item.idForm.horaFinal.split('T')[1],
          Equipo: equipos,
          Auxiliar: item?.idAuxiliar?.nombre || 'Sin Asignar',
        }
      })

      console.log(data)

      createTable(data)
    })
}

generate()

function createTable(objectArray, fields, fieldTitles) {
    let body = document.getElementsByTagName('body')[0];
    let tbl = document.createElement('table');
    let thead = document.createElement('thead');
    let thr = document.createElement('tr');

    for (p in objectArray[0]){
      let th = document.createElement('th');
      th.appendChild(document.createTextNode(p));
      thr.appendChild(th);

    }

    thead.appendChild(thr);
    tbl.appendChild(thead);

    let tbdy = document.createElement('tbody');
    let tr = document.createElement('tr');
    objectArray.forEach((object) => {
      let n = 0;
      let tr = document.createElement('tr');
      for (p in objectArray[0]){
        var td = document.createElement('td');
        td.setAttribute("style","border: 1px solid gray");
        td.appendChild(document.createTextNode(object[p]));
        tr.appendChild(td);
        n++;
      };
      tbdy.appendChild(tr);
    });
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
    return tbl;
  }

  createTable([
    { Fecha:"28/11/2022", Aula: "B404", Solicitante: "Juan Pere", Rol: "Docente", Inicio: "08:50 am", Fin: "10:50 am", Equipo: "Laptop", Auxiliar: "Marck icon"},
    { Fecha:"28/11/2022", Aula: "B404", Solicitante: "Juan Pere", Rol: "Docente", Inicio: "08:50 am", Fin: "10:50 am", Equipo: "Laptop", Auxiliar: "Marck icon"},
    { Fecha:"28/11/2022", Aula: "B404", Solicitante: "Juan Pere", Rol: "Docente", Inicio: "08:50 am", Fin: "10:50 am", Equipo: "Laptop", Auxiliar: "Marck icon"},
    { Fecha:"28/11/2022", Aula: "B404", Solicitante: "Juan Pere", Rol: "Docente", Inicio: "08:50 am", Fin: "10:50 am", Equipo: "Laptop", Auxiliar: "Marck icon"},
  ]
)
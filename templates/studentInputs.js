const studentInputs = ({ nombre, codigo, correo, telefono }) => {
  return `
    <div class="form-control">
        <label for="asignatura">Asignatura</label>
        <input type="text" name="asignatura" placeholder="Inserte asignatura..." id="asignatura" required />
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
    </div>

    <div class="form-control">
        <label for="aula">Aula</label>
        <input type="text" name="curso" id="aula" placeholder="Ej: C424..." required />
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
    </div>

    <h3>Datos del estudiante: *</h3>

    <div class="form-control">
        <label for="nombre">Nombre</label>
        <input type="text" name="nombreEstudiante" id="nombre_est" value="${nombre}" disabled/>
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
    </div>

    <div class="form-control">
        <label for="matricula">Matrícula</label>
        <input type="text" name="matricula" id="matricula" value="${codigo}" disabled/>
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
    </div>

    <div class="form-control">
        <label for="email">Correo institucional</label>
        <input type="email" name="correoEstudiante" value="${correo}" id="email" disabled />
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
    </div>

    <div class="form-control">
        <label for="telefono">Teléfono/Celular</label>
        <input type="tel" name="telefono" value="${telefono}" id="telefono" disabled />
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
    </div>

    <h3>Datos del docente: *</h3>
        <div class="form-control">
        <label for="nombre_doc">Nombre del docente</label>
        <input type="text" name="nombreDocente" id="nombre_doc" placeholder="Nombre del docente..." required />
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
    </div>

    <div class="form-control">
        <label for="codigo_doc">Codigo del docente</label>
        <input type="text" name="codigoDocente" placeholder="Insertar el codigo del docente..." id="codigo_doc" required />
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
    </div>

    <p id="message"></p>

    <button type="submit">Enviar Solicitud</button>
`;
};

export default studentInputs;

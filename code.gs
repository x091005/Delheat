// Función para cargar la página principal
function index() {
    return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Inicio')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // Función para manejar la solicitud GET y mostrar la página principal
  function doGet() {
    return index();
  }
  
  // Función para manejar la solicitud POST desde el formulario de registro
  function register(form) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
    var data = [form.nombre, form.email, form.password];
    sheet.appendRow(data);
    
    // Cargar la página de éxito "success.html" y pasar el nombre del usuario como parámetro
    var successPage = HtmlService.createTemplateFromFile('success');
    successPage.nombre = form.nombre;
    return successPage.evaluate()
      .setTitle('Registro exitoso')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // Función para validar el formato de un correo electrónico
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Función para mostrar la página de inicio de sesión
  function login() {
    return HtmlService.createHtmlOutputFromFile('login')
      .setTitle('Iniciar sesión')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // Función para validar las credenciales de inicio de sesión
  function validateLogin(email, password) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
    var data = sheet.getDataRange().getValues();
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] === email && data[i][2] === password) {
        return true;
      }
    }
    return false;
  }
  
  // Función para cargar la página de dashboard
  function dashboard() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
    var email = Session.getActiveUser().getEmail();
    var data = sheet.getDataRange().getValues();
    var puntos = '';
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] === email) {
        puntos = data[i][3];
        break;
      }
    }
    return HtmlService.createTemplateFromFile('dashboard')
      .evaluate()
      .setTitle('Panel de control')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // Función para cargar la página de tareas pendientes
  function tareas() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tareas');
    var data = sheet.getDataRange().getValues();
    var html = '<h1>Tareas pendientes</h1>';
   
  // Función para cargar la página de inicio de sesión si no hay un usuario activo, o la página de panel de control si hay un usuario activo
function loadPage() {
    var user = Session.getActiveUser();
    if (user) {
    // Cargar la página de panel de control y pasar el nombre de usuario como parámetro
    var dashboardPage = HtmlService.createTemplateFromFile('dashboard');
    dashboardPage.nombre = user.getEmail();
    dashboardPage.tareas = getTasks();
    return dashboardPage.evaluate()
    .setTitle('Panel de control')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
    } else {
    // Mostrar la página de inicio de sesión
    return login();
    }
    }
    
    // Función para obtener las tareas pendientes del usuario activo
    function getTasks() {
    var user = Session.getActiveUser();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tareas');
    var data = sheet.getDataRange().getValues();
    var tasks = [];
    for (var i = 1; i < data.length; i++) {
    if (data[i][0] === user.getEmail()) {
    tasks.push({
    tarea: data[i][1],
    puntos: data[i][2],
    completado: data[i][3] === 'Sí' ? true : false
    });
    }
    }
    return tasks;
    }
    
    // Función para marcar una tarea como completada o no completada
    function markTaskCompleted(tarea, completado) {
    var user = Session.getActiveUser();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tareas');
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
    if (data[i][0] === user.getEmail() && data[i][1] === tarea) {
    data[i][3] = completado ? 'Sí' : 'No';
    sheet.getRange(i + 1, 4).setValue(data[i][3]);
    return true;
    }
    }
    return false;
    } }
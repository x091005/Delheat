function myFunction() {
  function loginUser(email, password) {
  var ss = SpreadsheetApp.openById("1K9oh6ryqtnH7FZzuVoixF5UmYC1pzvmwRVQMfTFq2Gs");
  var sheet = ss.getSheetByName("gg");
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][1] == email && data[i][2] == password) {
      return true;
    }
  }
  return false;
}

}

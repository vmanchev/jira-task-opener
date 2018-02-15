/**
 * Append new row to the projects table
 */
function addRow() {

  var baseRow = $('tbody > tr:first').clone();

  $(baseRow).find('input').each(function (i, el) {
    $(el).val('');
  });

  $('tbody').append(baseRow);

}

/**
 * Remove the selected row from projects table
 * @param {Event} event
 */
function removeRow(event) {

  var idx = $('.remove').index(event.target);

  if (idx === 0) {
    $('tbody > tr:first').find('input').each(function (i, el) {
      $(el).val('');
    });

    return;
  }

  $('tbody > tr').eq(idx).remove();

}

function isEmptyProject(project) {
  return project.name === '' && project.code === '' && project.url === '';
}

function saveOptions() {

  var projects = [];

  var rows = $('tbody > tr');

  for (var r = 0; r < rows.length; r++) {

    var project = {};

    $(rows[r]).find('input').each(function (i, el) {
      project[el.name] = el.value.trim();
    });

    if (isEmptyProject(project)) {
      continue;
    }

    projects.push(project);
  }

  chrome.storage.sync.set({jiraProjects: projects}, function () {

    $('.success-message').show();

    setTimeout(function () {
      $('.success-message').hide();
    }, 1000);
  });

}

$(function () {
  $('.add').on('click', addRow);
  $('.save').on('click', saveOptions);
  $('table').on('click', '.remove', removeRow);


  chrome.storage.sync.get('jiraProjects', function (data) {
    console.log(data)
    if (typeof data.jiraProjects === 'undefined') {
      return;
    }

    $(data.jiraProjects).each(function (idx, project) {

      //first row is always there, add each other row
      if (idx !== 0) {
        addRow();
      }

      //select the row
      var currentRow = $('tbody > tr').eq(idx);

      $(currentRow).find('input[name="name"]').val(project.name);
      $(currentRow).find('input[name="code"]').val(project.code);
      $(currentRow).find('input[name="url"]').val(project.url);
    });

  });

});


function processForm(e) {

  e.preventDefault();

  var selectedProject = JSON.parse($('#projectKey').val());

  var taskId = $('.task-id').val();

  var url = selectedProject.url + selectedProject.code + '-' + taskId;

  chrome.tabs.create({url: url});
}

function getJiraProjects() {

}

$(function () {

  setTimeout(function () {
    $('.task-id').focus();
  }, 200);

  $('.jira-opener__form').on('submit', processForm);


  chrome.storage.sync.get('jiraProjects', function (data) {

    var projectsDropdown = $('#projectKey');

    if (data.jiraProjects.length === 0) {
      return;
    }

    $(data.jiraProjects).each(function (idx, project) {

      var option = $('<option>', {
        value: JSON.stringify(project),
        text: project.name + ' - ' + project.code
      });

      projectsDropdown.append(option);
    });

  });

  $('#options-trigger').click(function () {
    chrome.runtime.openOptionsPage()
  });

});
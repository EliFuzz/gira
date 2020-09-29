import { getHtml } from '../utils/fs';
import { getProjects } from '../git/storage';
import { generateBranchFrom, generateBranchTo } from '../git/api';

const JIRA = {
  sidebar: '#viewissuesidebar',
  issues: '#stalker .issue-link',
  issueType: '#type-val',
  title: '#summary-val',
  ticket: '#key-val',
};

const INTRENAL_SELCTORS = {
  menu: '#gira-activate',
  modal: '#gira-modal',
  header: '.mod-header',
  projects: '#git_projects',
  branchFrom: '#git_branchFrom',
  branchTo: '#git_branchTo',
  submit: '#git-submit',
};

export const createMenu = async () => {
  if (document.querySelectorAll(INTRENAL_SELCTORS.modal).length) {
    return;
  }
  const menu = document.createElement('div');
  menu.id = INTRENAL_SELCTORS.menu.slice(1);
  menu.className = 'module toggle-wrap collapsed';
  menu.innerHTML = await getHtml('container');
  menu.querySelector(INTRENAL_SELCTORS.header).addEventListener('click', () => {
    if (
      !document
        .querySelector(INTRENAL_SELCTORS.menu)
        .classList.contains('collapsed')
    ) {
      document.querySelector(INTRENAL_SELCTORS.modal).innerHTML = '';
      return;
    }
    createOptions();
  });

  document.querySelector(JIRA.sidebar).append(menu);
};

const populateSelect = (select, data) => {
  select.options.length = 0;
  Object.keys(data).forEach((id) => {
    select.options[select.options.length] = new Option(data[id], id);
  });
};

const createOptions = async () => {
  const issueType = document.querySelector(JIRA.issueType).innerText.trim();
  const issues = document.querySelectorAll(JIRA.issues);

  const issueTo = issues[0].getAttribute('data-issue-key').trim();
  const issueFrom = issues[issues.length - 1]
    .getAttribute('data-issue-key')
    .trim();

  const modal = document.createElement('form');
  modal.className = 'aui';
  modal.innerHTML = await getHtml('menu');

  populateSelect(
    modal.querySelector(INTRENAL_SELCTORS.projects),
    await getProjects()
  );

  modal.querySelector(
    INTRENAL_SELCTORS.branchFrom
  ).value = await generateBranchFrom(issueType, issueFrom);
  modal.querySelector(
    INTRENAL_SELCTORS.branchTo
  ).value = await generateBranchTo(issueType, issueTo);

  modal
    .querySelector(INTRENAL_SELCTORS.submit)
    .addEventListener('click', (e) => {
      e.preventDefault();

      const projects = modal.querySelector(INTRENAL_SELCTORS.projects);
      const projectId = projects.options[projects.selectedIndex].value;

      const branchFrom = modal
        .querySelector(INTRENAL_SELCTORS.branchFrom)
        .value.trim();
      const branchTo = modal
        .querySelector(INTRENAL_SELCTORS.branchTo)
        .value.trim();
      const title = document.querySelector(JIRA.title).innerText.trim();
      const ticket = document
        .querySelector(JIRA.ticket)
        .getAttribute('data-issue-key');

      chrome.runtime.sendMessage({
        type: 'MESSAGE',
        ...{
          projectId,
          ticket,
          branchFrom,
          branchTo,
          title,
        },
      });
    });

  document.querySelector(INTRENAL_SELCTORS.modal).appendChild(modal);
};

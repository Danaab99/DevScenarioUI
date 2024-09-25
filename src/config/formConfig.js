// Config for Application Form
export const applicationFormConfig = [
    { label: 'App Status', name: 'appStatus', type: 'text', placeholder: 'Enter app status', required: true },
    { label: 'Project Reference', name: 'projectRef', type: 'text', placeholder: 'Enter project reference', required: true },
    { label: 'Project Name', name: 'projectName', type: 'text', placeholder: 'Enter project name', required: true },
    { label: 'Project Location', name: 'projectLocation', type: 'text', placeholder: 'Enter project location', required: true },
    { label: 'Open Date', name: 'openDt', type: 'date', placeholder: '', required: false },
    { label: 'Start Date', name: 'startDt', type: 'date', placeholder: '', required: false },
    { label: 'Completed Date', name: 'completedDt', type: 'date', placeholder: '', required: false },
    { label: 'Project Value', name: 'projectValue', type: 'number', placeholder: 'Enter project value', required: false },
    { label: 'Status ID', name: 'statusId', type: 'number', placeholder: 'Enter status ID', required: true },
    { label: 'Notes', name: 'notes', isTextArea: true, placeholder: 'Enter notes', required: false },
  ];
  
  // Config for Status Level Form
  export const statusLevelFormConfig = [
    { label: 'Status Name', name: 'statusName', type: 'text', placeholder: 'Enter status name', required: true },
  ];
  
  // Config for Inquiry Form
  export const inquiryFormConfig = [
    { label: 'Send To Person', name: 'sendToPerson', type: 'text', placeholder: 'Enter person name', required: true },
    { label: 'Send To Role', name: 'sendToRole', type: 'text', placeholder: 'Enter role', required: true },
    { label: 'Subject', name: 'subject', type: 'text', placeholder: 'Enter subject', required: true },
    { label: 'Inquiry', name: 'inquiry', isTextArea: true, placeholder: 'Enter inquiry', required: true },
    { label: 'Response', name: 'response', isTextArea: true, placeholder: 'Enter response', required: false },
    { label: 'Asked Date', name: 'askedDt', type: 'date', placeholder: '', required: false },
    { label: 'Completed Date', name: 'completedDt', type: 'date', placeholder: '', required: false },
  ];
  
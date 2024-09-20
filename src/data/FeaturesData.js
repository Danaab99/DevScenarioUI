import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaBackspace, FaEdit } from 'react-icons/fa';
import { MdOutlinePageview } from 'react-icons/md';

// Exporting the correct features array
export const FeaturesData = [
  {
    title: "Delete",
    icon: <FaBackspace />,
    iconBg: "black", // Black background for "Delete"
    points: [
      "Delete an existing application from the database.",
      "Provides a confirmation step before deletion to prevent accidental data loss.",
      "Interacts with the API to remove the record from the MS SQL database.",
    ],
  },
  {
    title: "Edit",
    icon: <FaEdit />,
    iconBg: "black", // Black background for "Edit"
    points: [
      "Edit the details of an existing application.",
      "Displays the remaining fields of the application on the edit page.",
      "Allows for adding inquiries related to the application.",
      "Interacts with the API to update the database record.",
    ],
  },
  {
    title: "View",
    icon: <MdOutlinePageview />,
    iconBg: "black", // Black background for "View"
    points: [
      "View the list of all applications in the system.",
      "Displays key information in a summary grid.",
      "Provides the ability to view individual application details.",
      "Fetches data from the MS SQL database via the API.",
    ],
  },
  {
    title: "Add",
    icon: <IoMdAddCircleOutline />,
    iconBg: "black", // Black background for "Add"
    points: [
      "Create a new application and add it to the system.",
      "Allows users to input all required fields for the new application.",
      "Interacts with the API to add the new record to the MS SQL database.",
    ],
  },
];

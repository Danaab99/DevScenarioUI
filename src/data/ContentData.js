import { FaDatabase } from 'react-icons/fa';
import { BsClipboard2DataFill } from 'react-icons/bs';
import { SiLevelsdotfyi } from 'react-icons/si';

export const ContentData = [
  {
    title: "Applications table",
    icon: <FaDatabase />, // Icon from react-icons (FaDatabase)
    path: "/applications",
  },
  {
    title: "Inquiries table",
    icon: <BsClipboard2DataFill />,
    path: "/inquiries", // Icon from react-icons (BsClipboard2DataFill)
  },
  {
    title: "Status levels table",
    icon: <SiLevelsdotfyi />,
    path: "/status-levels", // Icon from react-icons (SiLevelsdotfyi)
  },
];

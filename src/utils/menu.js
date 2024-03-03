import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Completed",
    icon: check,
    link: "/completed",
  },
  {
    id: 3,
    title: "Pending",
    icon: todo,
    link: "/incomplete",
  },
];

export default menu;
import backgroundsImage from "@/components/assets/backgrounds.jpg";
import classesImage from "@/components/assets/classes.jpg";
import createCharImage from "@/components/assets/createChar.jpg";
import equipImage from "@/components/assets/equip.jpg";
import myCharImage from "@/components/assets/myChar.jpg";
import racesImage from "@/components/assets/races.jpg";
import spellsImage from "@/components/assets/spells.jpg";

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  gradient: string;
  roles: ("player" | "master")[];
  inDevelopment: boolean;
  image?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "character-wizard",
    title: "Создание персонажа",
    description: "Пошаговый мастер создания персонажа по правилам PHB 2024",
    gradient: "from-primary to-accent",
    roles: ["player", "master"],
    inDevelopment: false,
    image: createCharImage,
  },
  {
    id: "my-characters",
    title: "Мои персонажи",
    description: "Сохранённые персонажи в облаке",
    gradient: "from-emerald-500 to-teal-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: myCharImage,
  },
  {
    id: "races",
    title: "Расы",
    description: "Все расы из Книги игрока 2024 года",
    gradient: "from-rose-500 to-pink-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: racesImage,
  },
  {
    id: "classes",
    title: "Классы",
    description: "Все классы из Книги игрока 2024 года",
    gradient: "from-cyan-500 to-blue-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: classesImage,
  },
  {
    id: "backgrounds",
    title: "Предыстории",
    description: "Все предыстории из Книги игрока 2024 года",
    gradient: "from-purple-500 to-indigo-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: backgroundsImage,
  },
  {
    id: "spells",
    title: "Заклинания",
    description: "Все заклинания из Книги игрока 2024 года",
    gradient: "from-violet-500 to-purple-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: spellsImage,
  },
  {
    id: "equipment",
    title: "Снаряжение",
    description: "Оружие, доспехи, инструменты и другое снаряжение",
    gradient: "from-orange-500 to-amber-500",
    roles: ["player", "master"],
    inDevelopment: false,
    image: equipImage,
  },
  {
    id: "glossary",
    title: "Глоссарий",
    description: "Справочник терминов, правил и условий",
    gradient: "from-emerald-500 to-green-600",
    roles: ["player", "master"],
    inDevelopment: false,
    image: undefined,
  },
  {
    id: "feats",
    title: "Черты",
    description: "Бонусы и особенности персонажа",
    gradient: "from-amber-500 to-orange-600",
    roles: ["player", "master"],
    inDevelopment: false,
    image: undefined,
  },
  {
    id: "bestiary",
    title: "Бестиарий",
    description: "Монстры и существа",
    gradient: "from-red-500 to-rose-600",
    roles: ["player", "master"],
    inDevelopment: false,
    image: undefined,
  },
];

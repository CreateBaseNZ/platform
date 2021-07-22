import AtomOneDark from "../themes/atom-one-dark.json";
import AtomOneLight from "../themes/atom-one-light.json";
import AyuDark from "../themes/ayu-dark.json";
import AyuLight from "../themes/ayu-light.json";
import AyuMirage from "../themes/ayu-mirage.json";
import Cobalt2 from "../themes/cobalt2.json";
import Dracula from "../themes/dracula.json";
import GitHubDark from "../themes/github-dark.json";
import GitHubLight from "../themes/github-light.json";
import Gloom from "../themes/gloom.json";
import HighContrast from "../themes/high-contrast.json";
import LightOwl from "../themes/light-owl.json";
import Monokai from "../themes/monokai.json";
import MonokaiPro from "../themes/monokai-pro.json";
import NightOwl from "../themes/night-owl.json";
import Palenight from "../themes/palenight.json";
import QuietLight from "../themes/quiet-light.json";
import Red from "../themes/red.json";
import ShadesOfPurple from "../themes/shades-of-purple.json";
import SolarizedDark from "../themes/solarized-dark.json";
import SolarizedLight from "../themes/solarized-light.json";
import SynthWave84 from "../themes/synthwave-'84.json";
import VSDarkPlus from "../themes/vs-dark+.json";
import VSLight from "../themes/vs-light.json";
import TomorrowNightBlue from "../themes/tomorrow-night-blue.json";
import WinterIsComingDarkBlue from "../themes/winter-is-coming-dark-blue.json";
import WinterIsComingLight from "../themes/winter-is-coming-light.json";

// strip `+` `'` and spaces

const themes = {
  "Light Themes": [
    "Atom One Light",
    "Ayu Light",
    "GitHub Light",
    "VS Light",
    "Light Owl",
    "Quiet Light",
    "Solarized Light",
    "Winter is Coming Light",
  ],
  "Dark Themes": [
    "Atom One Dark",
    "Ayu Dark",
    "Ayu Mirage",
    "Cobalt2",
    "VS Dark+",
    "Dracula",
    "GitHub Dark",
    "Gloom",
    "Monokai",
    "Monokai Pro",
    "Night Owl",
    "Palenight",
    "Synthwave '84",
    "Tomorrow Night Blue",
    "Winter is Coming Dark Blue",
  ],
  "Funky Themes": [
    "High Contrast",
    "Red",
    "Shades of Purple",
    "Solarized Dark",
  ],
};

export default themes;

export const themeFiles = {
  AtomOneDark: AtomOneDark,
  AyuDark: AyuDark,
  AyuMirage: AyuMirage,
  Cobalt2: Cobalt2,
  VSDark: VSDarkPlus,
  Dracula: Dracula,
  GitHubDark: GitHubDark,
  Gloom: Gloom,
  Monokai: Monokai,
  MonokaiPro: MonokaiPro,
  NightOwl: NightOwl,
  Palenight: Palenight,
  Synthwave84: SynthWave84,
  TomorrowNightBlue: TomorrowNightBlue,
  WinterisComingDarkBlue: WinterIsComingDarkBlue,
  AtomOneLight: AtomOneLight,
  AyuLight: AyuLight,
  GitHubLight: GitHubLight,
  VSLight: VSLight,
  LightOwl: LightOwl,
  QuietLight: QuietLight,
  SolarizedLight: SolarizedLight,
  WinterisComingLight: WinterIsComingLight,
  HighContrast: HighContrast,
  Red: Red,
  ShadesofPurple: ShadesOfPurple,
  SolarizedDark: SolarizedDark,
};

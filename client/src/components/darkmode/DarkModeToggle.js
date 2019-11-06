import React from "react";

import Toggle from "./Toggle";
import useDarkMode from "use-dark-mode";
import global from "../../styles/global.module.css";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  if (!darkMode.value) {
    return (
      <>
        <img
          src="/assets/img/project_title.png"
          className={global.logo}
          width="200"
          alt="Devine Notes"
        />
        <div className="dark-mode-toggle">
          <button
            type="button"
            className="button_symbol"
            onClick={darkMode.disable}
          >
            &#9728;
          </button>
          <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
          <button
            type="button"
            className="button_symbol"
            onClick={darkMode.enable}
          >
            &#9790;
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <img
          src="/assets/img/project_title_light.png"
          className={global.logo}
          width="200"
          alt="Devine Notes"
        />
        <div className="dark-mode-toggle">
          <button
            type="button"
            className="button_symbol"
            onClick={darkMode.disable}
          >
            ☀
          </button>
          <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
          <button
            type="button"
            className="button_symbol"
            onClick={darkMode.enable}
          >
            ☾
          </button>
        </div>
      </>
    );
  }
};

export default DarkModeToggle;

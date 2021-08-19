import Image from "next/image";
import classes from "./ModuleContainer.module.scss";

const getIcon = (type) => {
  switch (type) {
    case "video":
      return "play_circle";
    case "pdf":
      return "attach_file";
    case "tut":
      return "emoji_objects";
  }
};

const ModuleContainer = ({
  active,
  modules,
  clickHandler,
  query,
  caption,
  images = false,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.captionContainer}>
        {caption &&
          caption.map((c, i) => (
            <p key={i} className={classes.caption}>
              {c}
            </p>
          ))}
      </div>
      {modules.map((item, i) => (
        <button
          key={i}
          className={`${classes.card} ${
            active === i ? classes.activeCard : ""
          }`}
          onClick={clickHandler.bind(this, i)}
        >
          <div className={`${classes.cardImgWrapper} ${classes[item.type]}`}>
            {images ? (
              <Image
                src={`/${query}/img/${item.id}-0.png`}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <span className={`material-icons-outlined ${classes.shapes}`}>
                {getIcon(item.type)}
              </span>
            )}
          </div>
          <p>{item.title}</p>
        </button>
      ))}
    </div>
  );
};

export default ModuleContainer;

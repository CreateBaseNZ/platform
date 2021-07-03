import { entities } from "../../utils/flowConfig";

export const EntityDropdown = ({ data, selectName, dataName }) => {
  const changeHandler = (event) => {
    data.callBack({ ...data.values, [dataName]: event.target.value });
  };

  const dragHandler = (event) => {
    event.preventDefault();
  };

  return (
    <select
      name={`${data.id}_${selectName}`}
      id={`${data.id}_${selectName}`}
      onChange={changeHandler}
      onDragStart={dragHandler}
      value={data.values.entity}
    >
      {entities.map((entity) => (
        <option value={entity.toLowerCase()} key={entity}>
          {entity}
        </option>
      ))}
    </select>
  );
};

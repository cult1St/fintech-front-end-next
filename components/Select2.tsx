import { useEffect, useRef } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";

const Select2 = ({ options, onChange, value }) => {
  const selectRef = useRef(null);

  useEffect(() => {
    const $select = $(selectRef.current);
    $select.select2();

    if (value) {
      $select.val(value).trigger("change");
    }

    $select.on("select2:select", (event) => {
      onChange(event.target.value);
    });

    // Cleanup on component unmount
    return () => {
      $select.select2("destroy");
    };
  }, [value, onChange]);

  return (
    <select ref={selectRef} style={{ width: "100%" }}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select2;

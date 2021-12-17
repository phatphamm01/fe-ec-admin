import React, { useState } from "react";
import { Input, AutoComplete } from "antd";
import { SelectProps } from "antd/es/select";

function getRandomInt(max: number, min: number = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

export const NavSearch: React.FC = (props) => {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  return (
    <AutoComplete
      dropdownClassName="nav-search-dropdown"
      options={options}
      onSearch={handleSearch}
      // value={value}
      // filterOption={(inputValue, option) =>
      //   option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      // }
    >
      <Input.Search placeholder="Search..." enterButton />
    </AutoComplete>
  );
};

export default NavSearch;

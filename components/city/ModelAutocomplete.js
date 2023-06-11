import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import { StyledInput } from "@/components/ui/Input";
import { API_PATH } from "@/constants";
import { Field } from "@/modules/forms/Blocks";
import api from "@/utils/api";

export default function ModelAutocomplete() {
  const [searchData, updateSearchData] = useState([]);

  const [searchResults, updateSearchResults] = useState([]);

  useEffect(() => {
    async function loadData() {
      const models = await api.get(`${API_PATH.ALL_MODELS}/`);
      updateSearchData(models);
    }

    loadData();
  }, []);

  const models = useMemo(() => {
    return searchData.reduce((acc, model) => {
      const item = {
        ...model,
        label: `${model.brand_name} ${model.model_name}`,
        value: `${model.device_id}~${model.brand_id}~${model.model_id}`,
      };

      const foundDevice = acc.find((device) => device.id === model.device_id);
      const device = foundDevice || {
        id: model.device_id,
        name: model.device_name,
      };
      if (!device.options) {
        device.options = [];
      }
      const existingOption = device.options.find(
        (option) => option.model_id === model.model_id
      );

      if (!existingOption) {
        device.options.push(item);
      }

      device.label = model.device_name;
      device.value = `${model.device_id}`;

      if (!foundDevice) {
        acc.push({
          ...device,
          device_name: model.device_name,
          options: [
            { label: `All ${model.device_name}`, value: `${model.device_id}` },
            ...device.options,
          ],
        });
      }

      return acc;
    }, []);
  }, [searchData]);

  function handleSearch(value) {
    const searchResults = models.reduce((acc, device) => {
      const matchingValues = device.options.filter((option) => {
        const modelWords = [...option.label.split(" "), device.device_name];

        return value
          .split(" ")
          .every((word) =>
            modelWords.some((modelWord) =>
              modelWord.toLowerCase().startsWith(word.toLowerCase())
            )
          );
      });
      if (!matchingValues.length) {
        return acc;
      }

      return [
        ...acc,
        {
          ...device,
          options: matchingValues,
        },
      ];
    }, []);
    updateSearchResults(searchResults);
  }

  const searchOptions = useMemo(() => {
    return searchResults.map((result) => (
      <AutoComplete.OptGroup key={result.label} label={result.label}>
        {result.options.map((option) => (
          <AutoComplete.Option key={option.value} value={option.value}>
            {option.label}
          </AutoComplete.Option>
        ))}
      </AutoComplete.OptGroup>
    ));
  }, [searchResults]);

  return (
    <Field
      as={AutoComplete}
      dataSource={searchOptions}
      onSearch={handleSearch}
      size="large"
      placeholder={
        <>
          <FontAwesomeIcon icon={faSearch} /> Apparaat
        </>
      }
      dropdownStyle={{ minWidth: "320px" }}
      name="model"
    >
      <StyledInput aria-label="Apparaat" />
    </Field>
  );
}
